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
                self.getDataToRemoveLP()
                self.getLpBal()
                self.getSlippage()
                self.validationAmountOfLq()
                self.reloadData()
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

            transactionPoolclick.change(function() {
                let pool = $(this).val();
                if (pool == "usdtusdc") {
                    token.html("USDT")
                    img_token.attr("src", "../assets/images/usdt_logo.png");
                }
                if (pool == "daiusdc") {
                    token.html("DAI")
                    img_token.attr("src", "../assets/images/dai_logo.png");
                }
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
                let _amountOfLiquidity = parseFloat($('input[name=amount_of_liquidity]').val()) / 100;
                if (_amountOfLiquidity < 0) {
                    $('input[name=amount_of_liquidity]').val("")
                }

                if (isNaN(_amountOfLiquidity) == true || _amountOfLiquidity == 0) {
                    self.resetPageInput();
                    return false;
                }
                let slippage = self.getSlippage();
                if (isNaN(slippage) == true) {
                    return false;
                }
                let _amount = 0;
                if (_amountOfLiquidity > 1) {
                    //			_amount = ALLOW_LIMIT_AMT;
                    //			_getData(_amount);
                    _amountOfLiquidity = 1;
                }
                self.getLpBal()
                    .then(_lpBal => {
                        if (_lpBal <= 0) {
                            return false;
                        }
                        _amount = _lpBal * _amountOfLiquidity;
                        _amount = coreHelper.toBN(_amount, _lp["lbDecimal"]);
                        _getData(_amount);
                    });

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
                    $('input[name=token_output]').val(self.parseFloatNumber(tokenOutputAmount, 6));
                    $('input[name=base_output]').val(self.parseFloatNumber(baseOutputAmount, 6));
                }
            } catch (e) {
                console.log("getDataToRemoveLP", e);
            }
            setTimeout(() => {
                self.getDataToRemoveLP()
            }, 7000)
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
                        let lpBal = parseInt(_result) / (10 ** lp["lbDecimal"]);
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
                let _amountOfLiquidity = parseFloat($('input[name=amount_of_liquidity]').val()) / 100;
                if (isNaN(_amountOfLiquidity) == true || _amountOfLiquidity == 0) {
                    return false;
                }
                let _contract = this._getGarbiSwapMainContract(_contractAddr)
                let _amount = 0;
                if (_amountOfLiquidity >= 1) {
                    _amount = ALLOW_LIMIT_AMT;
                    _remove(_amount);
                } else {
                    self.getLpBal()
                        .then(_lpBal => {
                            if (_lpBal <= 0) {
                                return false;
                            }
                            _amount = _lpBal * _amountOfLiquidity;
                            _amount = coreHelper.toBN(_amount, lp["lbDecimal"]);
                            _remove(_amount);
                        });
                }

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
            // body...
            $('input[name=amount_of_liquidity]').val("");
            $('input[name=token_output]').val("");
            $('input[name=base_output]').val("");
        },
    }
}(jQuery))