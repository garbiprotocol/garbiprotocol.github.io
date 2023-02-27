$.GARBI_SWAP_ADDLP = function() {};
$.GARBI_SWAP_ADDLP.prototype = (function() {
    var setting = {
        chainId: 42161,
        pool: "default"
    };
    let typeOfInputAmt = 0;
    let addLPDealine = 60 * 5
    let mintLp = 0
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        displayBTN() {
            let self = this
            let _acc = coreHelper.getCurrentAddress();
            let _pool = $('select[name=lp_token]').val();
            if (!_acc || _acc == "") {
                $(`.btn-connect-wallet`).show()
            } else {
                $(`.btn-connect-wallet`).hide()
            }
            setTimeout(() => {
                self.displayBTN()
            }, 7000)
        },

        async displayBalance() {
            let self = this;
            await self._setTokenBalance();
            setTimeout(function() {
                self.displayBalance();
                self._setBaseBalance();
            }, 3000);
        },

        async checkAllowce(BTN_token_Approve, BTN_base_Approve, BTNDeposit) {
            let _self = this;
            let _pool = $('select[name=lp_token]').val();
            let _token = _pool.slice(0, _pool.length - 4);
            let _base = _pool.slice(_pool.length - 4);
            
            if (!_token || !_base) {
                return false
            }
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
            let pool = this._getLp(_pairs, _token, _base);
            
            let _user = coreHelper.getUserAccount();
            let _tokenAddr = configHelper.getTokenByTokenName(setting.chainId, _token)
            let _baseAddr = configHelper.getTokenByTokenName(setting.chainId, _base)
            
            let _tokenContract = _self._getTokenContract(_tokenAddr);
            let _baseContract = _self._getTokenContract(_baseAddr);

            if (!_tokenContract || !_baseContract) {
                return false;
            }
            if (!_user) {
                return false;

            }

            _tokenContract.methods.allowance(_user, pool.contract).call().then(r => {
                let allowanceToken;
                if (r != 0) {
                    allowanceToken = true
                } else {
                    allowanceToken = false;
                }
                checkBase(allowanceToken)
            })

            function checkBase(allowanceToken) {
                let allowanceBase
                _baseContract.methods.allowance(_user, pool.contract).call().then(r => {
                    if (r != 0) {
                        allowanceBase = true;
                    } else {
                        allowanceBase = false;
                    }
                    process(allowanceToken, allowanceBase)
                })
            }

            function process(allowanceToken, allowanceBase) {
                if (!allowanceToken && !allowanceBase) {
                    $(`.${BTN_token_Approve}`).show();
                    $(`.${BTN_base_Approve}`).hide();
                    $(`.${BTNDeposit}`).hide();
                }
                if (allowanceToken && !allowanceBase) {
                    $(`.${BTN_token_Approve}`).hide();
                    $(`.${BTN_base_Approve}`).show();
                    $(`.${BTNDeposit}`).hide();
                }
                if (!allowanceToken && allowanceBase) {
                    $(`.${BTN_token_Approve}`).show();
                    $(`.${BTN_base_Approve}`).hide();
                    $(`.${BTNDeposit}`).hide();
                }
                if (allowanceToken && allowanceBase) {
                    $(`.${BTN_token_Approve}`).hide();
                    $(`.${BTN_base_Approve}`).hide();
                    $(`.${BTNDeposit}`).show();
                }
            }

            setTimeout(() => {
                _self.checkAllowce(BTN_token_Approve, BTN_base_Approve, BTNDeposit);
            }, 3000);
        },

        async loadData() {
            let self = this;
            try {
                if (typeOfInputAmt == 1) {
                    await self.getBaseInputFromTokenInput()
                } else if (typeOfInputAmt == 2) {
                    await self.getTokenInputFromBaseInput()
                }
                return self.reloadData();
            } catch (e) {
                return self.reloadData();
            }
        },

        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.loadData();
            }, 15000);
        },

        approveToken() {
            let self = this;
            $('.btn-approve-token').click(e => {
                e.preventDefault();
                let _user = coreHelper.getCurrentAddress();
                if (!_user) {
                    return false;
                }
                self._approveToken(_user);
            });
        },

        async approveBase() {
            let self = this;
            $('.btn-approve-base').click(e => {
                e.preventDefault();
                let _user = coreHelper.getCurrentAddress();
                if (!_user) {
                    return false;
                }
                self._approveBase(_user);
            });
        },

        onChangeSlippage() {
            let self = this;
            $('input[name=slippage]').on('input', function(e) {
                e.preventDefault();
                self.getTokenInputFromBaseInput()
                self.getBaseInputFromTokenInput()
            });
        },

        autoSlippage() {
            let self = this;
            $('.btn-auto-slippage').click(e => {
                e.preventDefault();
                $('input[name=slippage]').val(0.5);
                self.getTokenInputFromBaseInput()
                self.getBaseInputFromTokenInput()
            });
        },

        async onChangeMaxTokenFromInput() {
            let self = this;
            $(`.max-token-input`).on("click", () => {
                $(`input[name=token_input]`).val(coreHelper.roundDownFloat(self.getTokenMax(), 18).toFixed(10))
                self._setTokenBalance()
                typeOfInputAmt = 1
                this.getBaseInputFromTokenInput()
            })
        },

        async onChangeMaxBaseFromInput() {
            let self = this;
            $(`.max-base-input`).on("click", () => {
                $(`input[name=base_input]`).val(coreHelper.roundDownFloat(self.getBaseMax(), 18).toFixed(10))
                self._setBaseBalance();
                typeOfInputAmt = 2
                this.getTokenInputFromBaseInput()
            })
        },

        async onchangeTokenInput() {
            let self = this;
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 3 second for example
            var $input =  $('input[name=token_input]');

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
                typeOfInputAmt == 1
                self.getBaseInputFromTokenInput();
                if ($('input[name=token_input]').val() == "") {
                    $('input[name=base_input]').val("")
                }
            }
        },

        async onchangeBaseInput() {
            let self = this;
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 3 second for example
            var $input =  $('input[name=base_input]');

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
                typeOfInputAmt == 2
                self.getTokenInputFromBaseInput();
                if ($('input[name=base_input]').val() == "") {
                    $('input[name=token_input]').val("")
                }
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
                self.resetPageInput();
            })
        },

        getBaseInputFromTokenInput() {
            try {
                if($(`input[name=base_input]`).val() === 0 || $(`input[name=base_input]`).val() === "") {
                    $(`input[name=base_input]`).val("Garbi is calculating");
                }
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);
                if (!_token || !_base) {
                    return false
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp = this._getLp(_pairs, _token, _base)
                if (!_lp) {
                    return false
                }
                let callContract = this._getGarbiSwapContractToReedData(_lp.contract)

                let slippage = this.getSlippage()
                if (!slippage) {
                    return false
                }

                let tokenInput = $(`input[name=token_input]`).val()
                if (!tokenInput || tokenInput == 0) {
                    return false
                }
                tokenInput -= tokenInput * slippage
                callContract
                    .methods
                    .getDataFromTokenInputToAddLp(coreHelper.toBN(tokenInput, _tokenDecimal))
                    .call()
                    .then(_result => {
                        mintLp = parseInt(_result[0]) / (10 ** _lp["lbDecimal"]);
                        let baseInput = parseInt(_result[1]) / (10 ** _baseDecimal);                        
                        $(`input[name=base_input]`).val(baseInput.toFixed(10));
                    })
            } catch (error) {
                console.log("getBaseInputFromTokenInput", error);
            }
            setTimeout(() => {
                this.getBaseInputFromTokenInput()
            }, 15000)
        },

        getTokenInputFromBaseInput() {
            try {
                if($(`input[name=token_input]`).val() === 0 || $(`input[name=token_input]`).val() === "") {
                    $(`input[name=token_input]`).val("Garbi is calculating");
                }
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);
                if (!_token || !_base) {
                    return false
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp = this._getLp(_pairs, _token, _base)
                if (!_lp) {
                    return false
                }
                let callContract = this._getGarbiSwapContractToReedData(_lp.contract)

                let slippage = this.getSlippage()
                if (!slippage) {
                    return false
                }

                let baseToInput = $(`input[name=base_input]`).val()
                if (!baseToInput || baseToInput == 0) {
                    return false
                }
                callContract
                    .methods
                    .getDataFromBaseInputToAddLp(coreHelper.toBN(baseToInput, _baseDecimal))
                    .call()
                    .then(_result => {
                        mintLp = parseInt(_result[0]) / (10 ** _lp["lbDecimal"]);
                        
                        let tokenInput = parseInt(_result[1]) / (10 ** _tokenDecimal);
                        tokenInput += tokenInput * slippage
                        $(`input[name=token_input]`).val(tokenInput.toFixed(10))
                    })
            } catch (error) {
                console.log("getTokenInputFromBaseInput", error);
            }
            setTimeout(() => {
                this.getTokenInputFromBaseInput()
            }, 15000)
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

        async addLP() {
            let self = this
            $(`.btn-deposit`).click((e) => {
                e.preventDefault()
                let slippage = this.getSlippage()
                if (isNaN(slippage) == true) {
                    return false
                }
                let userAdd = coreHelper.getCurrentAddress();
                if (!userAdd) {
                    return false
                }
                let _pool = $('select[name=lp_token]').val();
                let _token = _pool.slice(0, _pool.length - 4);
                let _base = _pool.slice(_pool.length - 4);

                if (!_token || !_base) {
                    return false
                }
                let _tokenAddr = configHelper.getTokenByTokenName(setting.chainId, _token)
                let _baseAddr = configHelper.getTokenByTokenName(setting.chainId, _base)
                if (_tokenAddr == "" || _baseAddr == "") {
                    return false
                }
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp = this._getLp(_pairs, _token, _base);

                let _contractAddr = _lp.contract
                if (!_contractAddr) {
                    return false
                }

                let tokenInput = $('input[name=token_input]').val()
                if (isNaN(tokenInput) == true || tokenInput == 0 || tokenInput > self.getTokenMax()) {
                    return false;
                }
                let baseInput = $('input[name=base_input]').val()
                if (isNaN(baseInput) == true || baseInput == 0 || baseInput > self.getBaseMax()) {
                    return false;
                }

                //let _tonkenContract = this._getTokenReadContracr(_tokenAddr)
                //let _baseContract = this._getTokenReadContracr(_baseAddr)
                let _contract = this._getGarbiSwapMainContract(_contractAddr)
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                let now = parseInt(Date.now() / 1000)
                let deadline = now + addLPDealine;
                let _transactionHistory = {};
                let minLp = mintLp - mintLp * slippage;
                _contract
                    .methods
                    .addLP(coreHelper.toBN(minLp, _lp.lbDecimal), coreHelper.toBN(baseInput, _baseDecimal), coreHelper.toBN(tokenInput, _tokenDecimal), deadline)
                    .send({ from: userAdd })
                    .on("transactionHash", function(hash) {
                        coreHelper.showPopup('confirm-popup');
                        $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
                    })
                    .on("confirmation", function(confirmationNumber, receipt) {
                        if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                            coreHelper.hidePopup('confirm-popup', 0);
                            coreHelper.showPopup('success-confirm-popup');
                            coreHelper.hidePopup('success-confirm-popup', 10000);
                            $('input[name=token_input]').val("");
                            $('input[name=base_input]').val("");
                            typeOfInputAmt = 0
                            mintLp = 0
                        }
                    })
                    .on('receipt', (receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            })
        },

        getTokenMax() {
            let _balanceOf = storeHelper.getValue("balanceOf")
            _balanceOf = _balanceOf ? _balanceOf : {}
            let _pool = $('select[name=lp_token]').val();
            let _token = _pool.slice(0, _pool.length - 4);

            let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _token)
            return _balanceOf[_fromAddr] ? _balanceOf[_fromAddr] : 0;
        },

        getBaseMax() {
            let _balanceOf = storeHelper.getValue("balanceOf")
            _balanceOf = _balanceOf ? _balanceOf : {}
            let _pool = $('select[name=lp_token]').val();
            let _base = _pool.slice(_pool.length - 4);
            let _tokenAddr = configHelper.getTokenByTokenName(setting.chainId, _base)
            _tokenAddr = _tokenAddr.toLowerCase();
            return _balanceOf[_tokenAddr] ? _balanceOf[_tokenAddr] : 0;
        },

        async _setTokenBalance() {
            let _uTokenBal = this.getTokenMax();
            $(`.token-bal`).html(`${coreHelper.numberWithCommas(_uTokenBal, 6)}`);

        },
        async _setBaseBalance() {
            let _uBaseBal = this.getBaseMax()
            $(`.base-bal`).html(`${coreHelper.numberWithCommas(_uBaseBal, 6)}`);
        },

        async _approveToken(_user) {
            let _self = this
            let _pool = $('select[name=lp_token]').val();
            let _token = _pool.slice(0, _pool.length - 4);
            let _base = _pool.slice(_pool.length - 4);
            if (!_token || !_base) {
                return false;
            }
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
            let _spender;

            let _lp = this._getLp(_pairs, _token, _base);
            if (!_lp) {
                return false;
            }
            _spender = _lp.contract;
            let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _token);
            if (!_fromAddr) {
                return false;
            }
            if (!_spender) {
                return false;
            }
            // console.log("_fromAddr", _fromAddr)
            // console.log("_spender", _spender)
            let _fToken = this._getTokenMainContract(_fromAddr);
            let _amountLimit = configHelper.getAmountLimit();

            _fToken
                .methods
                .approve(
                    _spender,
                    _amountLimit
                )
                .send({
                    from: _user
                })
                .on('transactionHash', (hash) => {
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    _self._showSuccessPopup(receipt);
                })
                .on('receipt', (receipt) => {
                    _self._showSuccessPopup(receipt);
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
        },

        async _approveBase(_user) {
            let _self = this
            let _pool = $('select[name=lp_token]').val();
            let _token = _pool.slice(0, _pool.length - 4);
            let _base = _pool.slice(_pool.length - 4);
            if (!_token || !_base) {
                return false;
            }
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
            let _spender;

            let _lp = this._getLp(_pairs, _token, _base);
            if (!_lp) {
                return false;
            }
            _spender = _lp.contract;
            let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _base);
            if (!_fromAddr) {
                return false;
            }
            if (!_spender) {
                return false;
            }
            let _fBase = this._getTokenMainContract(_fromAddr);
            let _amountLimit = configHelper.getAmountLimit();

            _fBase
                .methods
                .approve(
                    _spender,
                    _amountLimit
                )
                .send({
                    from: _user
                })
                .on('transactionHash', (hash) => {
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    _self._showSuccessPopup(receipt);
                })
                .on('receipt', (receipt) => {
                    _self._showSuccessPopup(receipt);
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
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
        _getTokenContract(_token) {
            let _abi = abiHelper.getTokenABI();
            return contractBaseHelper.getMainContract(_token, _abi);
        },
        
        resetPageInput() {
            $('.token-bal').text("0.0");
            $('.base-bal').text("0.0");
            $('input[name=token_input]').val("");
            $('input[name=base_input]').val("");
        },

    };
}(jQuery));