const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
var userLPBalance = 0;

$.GARBI_SWAP_REMOVE = function() {}
$.GARBI_SWAP_REMOVE.prototype = (function() {
    var setting = {
        chainId: 42161,
        pool: "default"
    };
    var transactions = {};
    let removeLPDealine = 60 * 5;

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        parseFloatNumber(value, decimals) {
            return parseFloat(value.toFixed(decimals));
        },

        loadData() {
            let self = this
            try {
                //self.getDataToRemoveLP()
                self.getLpBal().then(_lpBal => {
                    $('#user-liquidity-balance').text(coreHelper.numberWithCommas(_lpBal, 2));
                });
                self.getSlippage()
                self.reloadData();
                
            } catch (e) {
                self.reloadData()
            }
        },

        reloadData() {
            let self = this
            setTimeout(() => {
                self.loadData()
            }, 7000)
        },
        
        async onchangeLiquidityInput() {
            let self = this;
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 3 second for example
            var $input =  $('#lp-input-field');

            //on keyup, start the countdown
            $input.on('keyup', function () {
              clearTimeout(typingTimer);
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown 
            $input.on('keydown', function () {
              clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function doneTyping () {
                self.getDataToRemoveLP();
            }
        },
        
        async onMaxButtonClik() {
            let self = this;
            $('#max-liquidity-button').on("click", () => {
                $('#lp-input-field').val(userLPBalance.toFixed(2));
                self.getDataToRemoveLP();
            })
        },

        onChangeSlippage() {
            let self = this;
            $('input[name=slippage]').on('input', function(e) {
                e.preventDefault();
                self.getDataToRemoveLP()
            });
        },

        autoSlippage() {
            let self = this;
            $('.btn-auto-slippage').click(e => {
                e.preventDefault();
                $('input[name=slippage]').val(0.5);
                self.getDataToRemoveLP()
            });
        },

        validationAmountOfLq() {
            let percent = $('input[name=amount_of_liquidity]')

            if (percent.val() > 100) {
                percent.val("100")
            }
        },

        async onchangePool() {
            let transactionPoolclick = $("#selectPool")
            let token = $(".token")
            let img_token = $(".img-token")
            let base = $(".base")
            let img_base = $(".img-base")
            let self = this;
            transactionPoolclick.change(function() {
                let pool = $(this).val();
                self.resetPageInput();
                if (pool == "grbweth") {
                    token.html("GRB")
                    img_token.attr("src", "../assets/images/grb_token.png");
                    base.html("WETH")
                    img_base.attr("src", "../assets/images/eth_logo.png");
                }
                if (pool == "usdtusdc") {
                    token.html("USDT")
                    img_token.attr("src", "../assets/images/usdt_logo.png");
                    base.html("USDC")
                    img_base.attr("src", "../assets/images/usdc_logo.png");
                }
                if (pool == "daiusdc") {
                    token.html("DAI")
                    img_token.attr("src", "../assets/images/dai_logo.png");
                    base.html("USDC")
                    img_base.attr("src", "../assets/images/usdc_logo.png");
                }
                $('#user-liquidity-balance').text("0.0");
                self.getLpBal().then(_lpBal => {
                    $('#user-liquidity-balance').text(coreHelper.numberWithCommas(_lpBal, 2));
                });
            })
        },

        getDataToRemoveLP() {
            let self = this
            try {
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);
                if (!_token || !_base) {
                    return false;
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let contractName;

                let _lp = this._getLp(_pairs, _token, _base);
                
                if (!_lp) {
                    return false;
                }
                contractName = _lp.contract;

                let callContract = this._getGarbiSwapContractToReedData(contractName)
                if (!callContract) {
                    return false;
                }
                let userAddr = coreHelper.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }
                let slippage = self.getSlippage();
                if (isNaN(slippage) == true) {
                    return false;
                }
                let _lpAmtToRemove = $('input[name=amount_of_liquidity]').val();
                if(_lpAmtToRemove > userLPBalance) {
                    _lpAmtToRemove = userLPBalance;
                    $('input[name=amount_of_liquidity]').val(coreHelper.numberWithCommas(userLPBalance, 2));
                }
                _getData(coreHelper.toBN(_lpAmtToRemove, _lp["lbDecimal"]));
                function _getData(lpAmtToRemove) {
                    callContract
                        .methods
                        .getDataToRemoveLP(lpAmtToRemove)
                        .call()
                        .then(_result => _setData(_result));

                }

                function _setData(_result) {
                    let baseOutputAmount = parseInt(_result[0]) / (10 ** _baseDecimal);
                    let tokenOutputAmount = parseInt(_result[1]) / (10 ** _tokenDecimal);
                    baseOutputAmount -= baseOutputAmount * slippage;
                    tokenOutputAmount -= tokenOutputAmount * slippage;
                    $('input[name=token_output]').val(self.parseFloatNumber(tokenOutputAmount, 2));
                    $('input[name=base_output]').val(self.parseFloatNumber(baseOutputAmount, 2));
                }
            } catch (e) {
                console.log("getDataToRemoveLP", e);
            }
        },

        getLpBal() {
            return new Promise((resovel, reject) => {
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);
                // console.log("pool getLpBal: ", _pool);
                if (!_token || !_base) {
                    return resovel(0);
                }
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;

                let lp = this._getLp(_pairs, _token, _base);

                let callContract = this._getGarbiSwapContractToReedData(lp.contract)

                if (!callContract) {
                    return resovel(0);
                }
                let userAddr = coreHelper.getCurrentAddress();
                if (!userAddr) {
                    return resovel(0);
                }
                callContract
                    .methods
                    .balanceOf(userAddr)
                    .call()
                    .then(_result => {
                        console.log(_result);
                        let lpBal = parseInt(_result) / (10 ** lp["lbDecimal"]);
                        userLPBalance = lpBal;
                        return resovel(lpBal);
                    })
                    .catch(e => reject(e));
            });
        },

        removeLp() {
            let self = this
            $('#remove-liquidity').click((e) => {
                e.preventDefault();
                let userAddr = coreHelper.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);
                if (!_token || !_base) {
                    return false;
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;

                let lp = this._getLp(_pairs, _token, _base);
                let _contractAddr = lp.contract
                if (!_contractAddr) {
                    return false;
                }
                let _contract = this._getGarbiSwapMainContract(_contractAddr)
                let _lpAmtToRemove = $('input[name=amount_of_liquidity]').val();
                _remove(coreHelper.toBN(_lpAmtToRemove, lp["lbDecimal"]));

                function _remove(lpAmtToRemove) {
                    let minTokenOutput = $('input[name=token_output]').val();
                    let minBaseTokenOutput = $('input[name=base_output]').val();
                    if (minTokenOutput <= 0 || minBaseTokenOutput <= 0) {
                        return false;
                    }
                    let now = parseInt(Date.now() / 1000);
                    let deadline = now + removeLPDealine;
                    let _transactionHistory = {};
                    _contract
                        .methods
                        .removeLP(lpAmtToRemove, coreHelper.toBN(minBaseTokenOutput, _baseDecimal), coreHelper.toBN(minTokenOutput, _tokenDecimal), deadline)
                        .send({ from: userAddr })
                        .on('transactionHash', function(hash) {
                            coreHelper.showPopup('confirm-popup');
                        })
                        .on('transactionHash', (hash) => {
                            coreHelper.showPopup('confirm-popup');
                        })
                        .on('confirmation', (confirmationNumber, receipt) => {
                            self._showSuccessPopup(receipt);
                            $('input[name=amount_of_liquidity]').val("")
                            $('input[name=token_output]').val("")
                            $('input[name=base_output]').val("")

                        })
                        .on('receipt', (receipt) => {
                            self._showSuccessPopup(receipt);
                        })
                        .on('error', (err, receipt) => {
                            console.log(err);
                        });
                }
            });
        },

        getSlippage() {
            let _slippage = $('input[name=slippage]').val();
            if (!_slippage || _slippage == '') {
                _slippage = 0;
            }
            _slippage = parseFloat(_slippage);
            if (isNaN(_slippage) == true) {
                _slippage = 0;
            }
            return _slippage / 100;
        },

        _showSuccessPopup(receipt) {
            if (receipt.status == true && !transactions[receipt.transactionHash]) {
                transactions[receipt.transactionHash] = true;
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            }
        },

        _getTokenMainContract(_token) {
            let _abi = abiHelper.getTokenABI();
            return contractBaseHelper.getMainContract(_token, _abi);
        },

        _getTokenReadContracr(_token) {
            let _abi = abiHelper.getTokenABI()
            return contractBaseHelper.getReadContract(_token, _abi)
        },

        _getGarbiSwapContractToReedData(_contract) {
            let _abi = abiHelper.getGarbiSwapABI();
            return contractBaseHelper.getReadContract(_contract, _abi);
        },

        _getGarbiSwapMainContract(_contract) {
            let _abi = abiHelper.getGarbiSwapABI();
            return contractBaseHelper.getMainContract(_contract, _abi);
        },

        _getLp(_lps, _from, _to) {
            let _lp;
            for (let idx = 0; idx < _lps.length; idx++) {
                if (
                    (
                        _lps[idx].base == _from &&
                        _lps[idx].token == _to
                    ) ||
                    (
                        _lps[idx].token == _from &&
                        _lps[idx].base == _to
                    )
                ) {
                    _lp = _lps[idx];
                    break;
                }
            }
            return _lp;
        },

        resetPageInput() {
            $('input[name=amount_of_liquidity]').val("");
            $('input[name=token_output]').val("");
            $('input[name=base_output]').val("");
        },
    }
}(jQuery))