$.GARBI_SWAP = function() {};
$.GARBI_SWAP.prototype = (function() {
    var setting = {
        chainId: 42161,
        pool: "default"
    };
    var transactions = {};
    const BASE_TOKEN = ['usdc', 'weth'];
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        displayBTN() {
            let self = this;
            let _acc = coreHelper.getCurrentAddress();
            let _from = $('select[name=from]').val();
            let _to = $('select[name=to]').val();
            let _allowMin = 1e18;
            $(`.btn-approve`).html(`Approvel ${_from.toUpperCase()}`);
            if (!_acc || _acc == '') {
                $(`.btn-swap`).show();
                $(`.btn-approve`).hide();
            } else if (!_from || !_to) {
                $(`.btn-swap`).show();
                $(`.btn-approve`).hide();
            } else if (this._isSwapTokenToToken(_from, _to)) {
                let _allowedOf = storeHelper.getValue('allowsTransferToTradeMachineOf');
                let _allowAmt = _allowedOf[_from];
                let _isNeedAllow = _allowAmt < _allowMin;
                if (_isNeedAllow == true) {
                    $(`.btn-swap`).hide();
                    $(`.btn-approve`).show();
                } else {
                    $(`.btn-swap`).show();
                    $(`.btn-approve`).hide();
                }
            } else {
                let _lps = storeHelper.getValue('garbiSwapLPs');
                let _lp = this._getLp(_lps, _from, _to);
                let _allowedOf = _lp ? _lp.allowedOf : {};
                let _allowAmt = _allowedOf[_from];
                let _isNeedAllow = _allowAmt < _allowMin;
                if (_isNeedAllow == true) {
                    $(`.btn-swap`).hide();
                    $(`.btn-approve`).show();
                } else {
                    $(`.btn-swap`).show();
                    $(`.btn-approve`).hide();
                }
            }
            setTimeout(function() {
                self.displayBTN();
            }, 7000);
        },
        async displayTransactionDetail() {
            let self = this;
            await self._setTransactionDetail();
            setTimeout(function() {
                self.displayTransactionDetail();
            }, 15000);
        },
        async displayEstimatePrice() {
            let self = this;
            await self._setEstimatePrice();
            setTimeout(function() {
                self.displayEstimatePrice();
            }, 15000);
        },
        async displayBalance() {
            let self = this;
            await self._setTokenBalance();
            setTimeout(function() {
                self.displayBalance();
            }, 5000);
        },
        async displayUSDValue() {
            let self = this;
            await self._setUsdValue();
            setTimeout(function() {
                self.displayUSDValue();
            }, 15000);
        },
        async loadData() {
            let self = this;
            try {
                return self.reloadData();
            } catch (e) {
                return self.reloadData();
            }
        },
        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.loadData();
            }, 7000);
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
        getDeadline() {
            let _deadlineDelay = 5
                // if (!_deadlineDelay || _deadlineDelay == '') {
                //     _deadlineDelay = 0;
                // }
                // _deadlineDelay = parseFloat(_deadlineDelay);
                // if (isNaN(_deadlineDelay) == true) {
                //     _deadlineDelay = 0;
                // }
            let _now = parseInt(Date.now() / 1000);
            return parseInt(_now + 60 * _deadlineDelay);
        },
        reverse() {
            let self = this;
            $('.btn-reverse-pair').unbind("click").bind('click', async function(e) {
                e.preventDefault();
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                $('select[name=from]').selectpicker('val', _to);
                $('select[name=to]').selectpicker('val', _from);
                self._setAmountOut();
                self._setEstimatePrice();
                self._setTokenBalance();
                self._setUsdValue();
                self._setTransactionDetail();
            });
        },
        onChangeSlippage() {
            let self = this;
            $('input[name=slippage]').on('input', function(e) {
                e.preventDefault();
                self._setAmountOut();
                self._setEstimatePrice();
                self._setTokenBalance();
                self._setUsdValue();
                self._setTransactionDetail();
            });
        },
        onChangeFromToken() {
            let self = this;
            $('select[name=from]').on('change', function(e) {
                e.preventDefault();
                self._setAmountOut();
                self._setEstimatePrice();
                self._setTokenBalance();
                self._setUsdValue();
                self._setTransactionDetail();
            });
        },
        onChangeToToken() {
            let self = this;
            $('select[name=to]').on('change', function(e) {
                e.preventDefault();
                self._setAmountOut();
                self._setEstimatePrice();
                self._setTokenBalance();
                self._setUsdValue();
                self._setTransactionDetail();
            });
        },
        onChangeAmountIn() {
            let self = this;
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1000;  //time in ms, 3 second for example
            var $input =  $('input[name=amountIn]');

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
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                let _amountIn = $input.val();
                _amountIn = parseFloat(_amountIn);
                if (!_from || !_to || isNaN(_amountIn) == true) {
                    return false;
                }
                let _garbiSwapPriceOf = storeHelper.getValue('garbiSwapPriceOf');
                let _price = _garbiSwapPriceOf ? _garbiSwapPriceOf[`${_from}_${_to}`] : 0;
                let _amountOut = _amountIn * _price;
                if (isNaN(_amountOut) == false) {
                    self._setAmountOut();
                    //self._setTokenBalance();
                    //self._setUsdValue();
                }
            }
//            $('input[name=amountIn]').on('input', function(e) {
//                e.preventDefault();
//                
//            });
        },
        autoSlippage() {
            let self = this;
            $('.btn-auto-slippage').click(e => {
                e.preventDefault();
                $('input[name=slippage]').val(0.5);
                self._setAmountOut();
                self._setEstimatePrice();
                self._setTokenBalance();
                self._setUsdValue();
                self._setTransactionDetail();
            });
        },
        approve() {
            let self = this;
            $('.btn-approve').click(e => {
                e.preventDefault();
                let _user = coreHelper.getCurrentAddress();
                if (!_user) {
                    return false;
                }
                self._approve(_user);
            });
        },
        swap() {
            let self = this;
            $('.btn-swap').click(async e => {
                e.preventDefault();
                await self._swap();
            });
        },
        _isEnableRouter() {
            // let _isEnable = $('input[type=checkbox][name=auto_router]').is(":checked");
            // return _isEnable;
            return true;
        },
        async _swap() {
            let self = this;
            try {
                let _user = coreHelper.getCurrentAddress();
                if (!_user) {
                    return false;
                }
                // await self._approve(_user);
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                if (!_from || !_to) {
                    return false;
                }
                let _amountIn = self._getAmountIn();
                if (_amountIn <= 0) {
                    return false;
                }
                if (self._isSwapBaseToToken(_from, _to) == true) {
                    return self._swapBaseToToken(_user, _amountIn, _from, _to);
                }
                if (self._isSwapTokenToBase(_from, _to) == true) {
                    return self._swapTokenToBase(_user, _amountIn, _from, _to);
                }
                if (self._isEnableRouter() == false) {
                    return true;
                }
                if (self._isSwapTokenToToken(_from, _to) == true) {
                    return self._swapTokenToToken(_user, _amountIn, _from, _to);
                }
            } catch (e) {
                console.log("SWAP: ", e);
            }
        },
        async _swapBaseToToken(_user, _amountIn, _from, _to) {
            let self = this;
            try {
                let _fromDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _from);
                let _toDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _to);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp = self._getLp(_pairs, _from, _to);
                let _amountOut = self._getAmountOut();
                let _slippage = self.getSlippage();
                let _deadline = self.getDeadline();
                let _minOut = _amountOut - _amountOut * _slippage;
                if (_minOut <= 0) {
                    return false;
                }
                let _mainContract = self._getGarbiSwapMainContract(_lp.contract);
                _mainContract
                    .methods
                    .swapBaseToTokenWithBaseInput(
                        coreHelper.toBN(_amountIn, _fromDecimal),
                        coreHelper.toBN(_minOut, _toDecimal),
                        _deadline
                    )
                    .send({ from: _user })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                        $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(`SWAP::${_from}->${_to}`, e);
                return false;
            }
        },
        async _swapTokenToBase(_user, _amountIn, _from, _to) {
            let self = this;
            try {
                let _fromDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _from);
                let _toDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _to);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp = self._getLp(_pairs, _from, _to);
                let _amountOut = self._getAmountOut();
                let _slippage = self.getSlippage();
                let _deadline = self.getDeadline();
                let _minOut = _amountOut - _amountOut * _slippage;
                if (_minOut <= 0) {
                    return false;
                }
                let _mainContract = self._getGarbiSwapMainContract(_lp.contract);
                _mainContract
                    .methods
                    .swapTokenToBaseWithTokenInput(
                        coreHelper.toBN(_amountIn, _fromDecimal),
                        coreHelper.toBN(_minOut, _toDecimal),
                        _deadline
                    )
                    .send({ from: _user })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                        $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(`SWAP::${_from}->${_to}`, e);
                return false;
            }
        },
        async _swapTokenToToken(_user, _amountIn, _from, _to) {
            let self = this;
            try {
                let _fromDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _from);
                let _toDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _to);
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lpFrom = self._getLpByToken(_pairs, _from);
                let _lpTo = self._getLpByToken(_pairs, _to);
                let _amountOut = self._getAmountOut();
                let _slippage = self.getSlippage();
                let _deadline = self.getDeadline();
                let _minOut = _amountOut - _amountOut * _slippage;
                if (_minOut <= 0) {
                    return false;
                }
                let _mainContract = self._getTradeMachineMainContract();
                _mainContract
                    .methods
                    .swapTokenToTokenWithTokenInput(
                        coreHelper.toBN(_amountIn, _fromDecimal),
                        coreHelper.toBN(_minOut, _toDecimal),
                        _lpFrom.contract,
                        _lpTo.contract,
                        _deadline
                    )
                    .send({ from: _user })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            } catch (e) {
                console.log(`SWAP::${_from}->${_to}`, e);
                return false;
            }
        },
        async _approve(_user) {
            let _from = $('select[name=from]').val();
            let _to = $('select[name=to]').val();
            if (!_from || !_to) {
                return false;
            }
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
            let _spender;
            if (this._isSwapTokenToToken(_from, _to) == true) {
                _spender = _contractsObj.garbiSwap.pool[setting["pool"]].tradeMachine;
            } else {
                let _lp = this._getLp(_pairs, _from, _to);
                if (!_lp) {
                    return false;
                }
                _spender = _lp.contract;
            }
            let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _from);
            if (!_fromAddr) {
                return false;
            }
            if (!_spender) {
                return false;
            }
            let _fToken = this._getTokenMainContract(_fromAddr);
            let _amountLimit = configHelper.getAmountLimit();
            let _self = this;

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
        async estimateAmountOut() {
            let self = this;
            try {
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                let _amountIn = $('input[name=amountIn]').val();
                _amountIn = parseFloat(_amountIn);
                let _isClearAmountOut = false;
                if (!_from || !_to) {
                    self._putAmountOut('');
                    return self.reEstimateAmountOut();
                }
                if (isNaN(_amountIn) == true) {
                    _isClearAmountOut = true;
                    _amountIn = 1;
                }
                self._setAmountOut();
                self.reEstimateAmountOut();
            } catch (e) {
                console.log("ESTIMATE::AMOUNT_OUT: ", e);
                self.reEstimateAmountOut();
            }
        },
        async reEstimateAmountOut() {
            let self = this;
            setTimeout(function() {
                self.estimateAmountOut();
            }, 7000);
        },
        async getAmountOut(_amountIn, _from, _to) {
            try {
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _lp;
                if (this._isSwapBaseToToken(_from, _to) == true) {
                    _lp = this._getLp(_pairs, _from, _to);
                    return this._getTokenOut(_amountIn, _lp);
                }
                if (this._isSwapTokenToBase(_from, _to) == true) {
                    _lp = this._getLp(_pairs, _from, _to);
                    return this._getBaseOut(_amountIn, _lp);
                }
                if (this._isSwapTokenToToken(_from, _to) == true) {
                    let _lpFrom = this._getLpByToken(_pairs, _from);
                    let _lpTo = this._getLpByToken(_pairs, _to);
                    return this._getAmountOutOfTokenToToken(_amountIn, _lpFrom, _lpTo);
                }
                return 0;
            } catch (e) {
                return 0;
            }
        },
        _showSuccessPopup(receipt) {
            if (receipt.status == true && !transactions[receipt.transactionHash]) {
                transactions[receipt.transactionHash] = true;
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            }
        },
        _getAmountIn() {
            let _amountIn = $('input[name=amountIn]').val();
            _amountIn = parseFloat(_amountIn);
            return isNaN(_amountIn) ? 0 : _amountIn;
        },
        _getAmountOut() {
            let _amountOut = $('input[name=amountOut]').val();
            _amountOut = parseFloat(_amountOut);
            return isNaN(_amountOut) ? 0 : _amountOut;
        },
        async _setAmountOut() {
            let _from = $('select[name=from]').val();
            let _to = $('select[name=to]').val();
            if (!_from || !_to) {
                return false;
            }
            let _amountIn = $('input[name=amountIn]').val();
            _amountIn = parseFloat(_amountIn);
            let _isClearAmountOut = false;
            if (isNaN(_amountIn) == true) {
                _isClearAmountOut = true;
                _amountIn = 1;
            }
            let _amountOut = await this._estimateAmountOut(_amountIn, _from, _to);
            if (_isClearAmountOut == true) {
                this._putAmountOut('');
            } else {
                this._putAmountOut(_amountOut);
            }
            this._setUsdValue();
            this._setEstimatePrice();
            this._setTransactionDetail();
        },
        async _estimateAmountOut(_amountIn, _from, _to) {
            let _amountOut = await this.getAmountOut(_amountIn, _from, _to);
            let _price = _amountOut / _amountIn;
            let _garbiSwapPriceOf = storeHelper.getValue('garbiSwapPriceOf');
            _garbiSwapPriceOf = _garbiSwapPriceOf ? _garbiSwapPriceOf : {};
            _garbiSwapPriceOf[`${_from}_${_to}`] = _price;
            storeHelper.setVaule('garbiSwapPriceOf', _garbiSwapPriceOf);
            return _amountOut;
        },
        async _getNewMarketPrice(_amountIn, _amountOut, _from, _to) {
            return this.getAmountOut(1, _from, _to);
        },
        async _getMarketPrice(_from, _to) {
            return this.getAmountOut(1, _from, _to);
        },
        async _setTransactionDetail() {
            let self = this;
            try {
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                if (!_from || !_to || _from == _to) {
                    return _setDefaulInfo();
                }
                let _amountIn = self._getAmountIn();
                if (_amountIn <= 0) {
                    return _setDefaulInfo();
                }
                let _amountOut = await self._getAmountOut();
                let _slippage = self.getSlippage();
                let _minOut = _amountOut - _amountOut * _slippage;
                let _tradeFee = _amountIn*0.01/100;
                let _priceImpact = 0;
                $('.trxn-allowed-slippage').html(`${coreHelper.numberWithCommas(_slippage * 100, 2)} %`);
                $('.trxn-liquidity-provider-fee').html(`${coreHelper.numberWithCommas(_tradeFee, 6)} ${_from.toUpperCase()}`);
                $('.trxn-price-impact').html(`- ${coreHelper.numberWithCommas(_priceImpact * 100, 12)}%`);
                $('.trxn-min-receiver').html(`${coreHelper.numberWithCommas(_minOut, 6)} ${_to.toUpperCase()}`);
            } catch (e) {
                console.log("_setTransactionDetail", e);
            }

            function _setDefaulInfo() {
                $('.trxn-liquidity-provider-fee').html(`-`);
                $('.trxn-price-impact').html(`-`);
                $('.trxn-allowed-slippage').html(`-`);
                $('.trxn-min-receiver').html(`-`);
            }
        },
        async _setUsdValue() {
            let _priceOf = storeHelper.getValue('priceOf');
            _priceOf = _priceOf ? _priceOf : {};
            let _amountIn = this._getAmountIn();
            if (_amountIn <= 0) {
                $('.from-volume').html('0');
                $('.to-volume').html('0');
            } else {
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                let _amountOut = $('input[name=amountOut]').val();
                let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _from);
                let _toAddr = configHelper.getTokenByTokenName(setting.chainId, _to);
                let _priceOfFrom = _priceOf[_fromAddr] ? _priceOf[_fromAddr] : 0;
                let _priceOfTo = _priceOf[_toAddr] ? _priceOf[_toAddr] : 0;
                let _amountInVolume = _amountIn * _priceOfFrom;
                let _amountOutVolume = _amountOut * _priceOfTo;
                $('.from-volume').html(coreHelper.numberWithCommas(_amountInVolume, 2));
                $('.to-volume').html(coreHelper.numberWithCommas(_amountOutVolume, 2));
            }
        },
        async _setTokenBalance() {
            let _balanceOf = storeHelper.getValue('balanceOf');
            _balanceOf = _balanceOf ? _balanceOf : {};
            let _from = $('select[name=from]').val();
            let _to = $('select[name=to]').val();
            if (_from) {
                let _fromAddr = configHelper.getTokenByTokenName(setting.chainId, _from);
                let _uFromBal = _balanceOf[_fromAddr] ? _balanceOf[_fromAddr] : 0;
                $('.user-from-bal').html(`${coreHelper.numberWithCommas(_uFromBal, 6)} ${_from.toUpperCase()}`);
            } else {
                $('.user-from-bal').html('-');
            }
            if (_to) {
                let _toAddr = configHelper.getTokenByTokenName(setting.chainId, _to);
                let _uToBal = _balanceOf[_toAddr] ? _balanceOf[_toAddr] : 0;
                $('.user-to-bal').html(`${coreHelper.numberWithCommas(_uToBal, 6)} ${_to.toUpperCase()}`);
            } else {
                $('.user-to-bal').html('-');
            }
        },
        async _setEstimatePrice() {
            let self = this;
            try {
                let _from = $('select[name=from]').val();
                let _to = $('select[name=to]').val();
                if (!_from || !_to) {
                    return self._putEstimatePrice('');
                }
                let _amountIn = self._getAmountIn();
                if (_amountIn < 0) {
                    return self._putEstimatePrice('');
                }
                _amountIn = _amountIn == 0 ? 1 : _amountIn;
                let _amountOut = $('input[name=amountOut]').val();
                if (_amountOut <= 0) {
                    return self._putEstimatePrice('');
                }
                let _price = _amountOut / _amountIn;
                let _displayValue = `1 ${_from.toUpperCase()} - ${coreHelper.numberWithCommas(_price, 8)} ${_to.toUpperCase()}`;
                return self._putEstimatePrice(_displayValue);
            } catch (e) {
                console.log("_setEstimatePrice", e);
            }
        },
        _putEstimatePrice(_value) {
            $('.estimate-price').html(_value);
        },
        _putAmountOut(_amountOut) {
            _amountOut = _amountOut == '' ? _amountOut : _amountOut;
            $('input[name=amountOut]').val(_amountOut.toFixed(6));
        },
        _getTokenMainContract(_token) {
            let _abi = abiHelper.getTokenABI();
            return contractBaseHelper.getMainContract(_token, _abi);
        },
        _getGarbiSwapContractToReedData(_contract) {
            let _abi = abiHelper.getGarbiSwapABI();
            return contractBaseHelper.getReadContract(_contract, _abi);
        },
        _getGarbiSwapMainContract(_contract) {
            let _abi = abiHelper.getGarbiSwapABI();
            return contractBaseHelper.getMainContract(_contract, _abi);
        },
        _getTradeMachineMainContract() {
            let _abi = abiHelper.getTradeMachineABI();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.garbiSwap.pool[setting["pool"]].tradeMachine;
            return contractBaseHelper.getMainContract(_contract, _abi);
        },
        _getTradeMachineContractToReedData() {
            let _abi = abiHelper.getTradeMachineABI();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.garbiSwap.pool[setting["pool"]].tradeMachine;
            return contractBaseHelper.getReadContract(_contract, _abi);
        },
        _getAllowTransferContractToReedData() {
            let _abi = abiHelper.getAllowTransferABI();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.info.getAllowTransfer;
            return contractBaseHelper.getReadContract(_contract, _abi);
        },
        _getGarbiSwapContractToReedData(_contract) {
            let _abi = abiHelper.getGarbiSwapABI();
            return contractBaseHelper.getReadContract(_contract, _abi);
        },
        _getLpData(_lps, _lp) {
            let _data;
            for (let idx = 0; idx < _lps.length; idx++) {
                if (_lps[idx].contract == _lp) {
                    _data = _lps[idx];
                    break;
                }
            }
            return _data;
        },
        async _getAmountOutOfTokenToToken(_amountIn, _pair1, _pair2) {
            try {
                let _baseAmtGet = await this._getBaseOut(_amountIn, _pair1);
                let _amountOut = await this._getTokenOut(_baseAmtGet, _pair2);
                return _amountOut;
            } catch (e) {
                return 0;
            }
        },
        async _getBaseOut(_amountIn, _lp) {
            try {
                let _lpsListData = storeHelper.getValue('garbiSwapLPs');                
                let _lpData = this._getLpData(_lpsListData, _lp.contract);
                if (!_lpData) {
                    return 0;
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _lp["base"]);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _lp["token"]);
                let _readContract = await this._getGarbiSwapContractToReedData(_lp.contract);
                let _r = await _readContract.methods.getBaseOutput(coreHelper.toBN(_amountIn, _tokenDecimal)).call();
                let _amountOut = parseInt(_r) / (10 ** _baseDecimal);
                return _amountOut;
            } catch (e) {
                return 0;
            }
        },
        async _getTokenOut(_amountIn, _lp) {
            try {
                let _lpsListData = storeHelper.getValue('garbiSwapLPs');
                let _lpData = this._getLpData(_lpsListData, _lp.contract);
                if (!_lpData) {
                    return 0;
                }
                let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _lp["base"]);
                let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _lp["token"]);
                let _readContract = await this._getGarbiSwapContractToReedData(_lp.contract);
                let _r = await _readContract.methods.getTokenOutput(coreHelper.toBN(_amountIn, _baseDecimal)).call();
                let _amountOut = parseInt(_r) / (10 ** _tokenDecimal);
                return _amountOut;
                return _amountOut;
            } catch (e) {
                console.log("ESTIMATE::getTokenOut", e);
                return 0;
            }
        },
        _isSwapBaseToToken(_from, _to) {
            if (_from == _to) {
                return false;
            }
            if (BASE_TOKEN.includes(_from)) {
                return true;
            }
            return false;
        },
        _isSwapTokenToBase(_from, _to) {
            if (_from == _to) {
                return false;
            }
            if (BASE_TOKEN.includes(_to)) {
                return true;
            }
            return false;
        },
        _isSwapTokenToToken(_from, _to) {
            if (_from == _to) {
                return false;
            }
            if (!BASE_TOKEN.includes(_from) && !BASE_TOKEN.includes(_to)) {
                return true;
            }
            return false;
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
        _getLpByToken(_lps, _token) {
            let _lp;
            for (let idx = 0; idx < _lps.length; idx++) {
                if (
                    _lps[idx].token == _token
                ) {
                    _lp = _lps[idx];
                    break;
                }
            }
            return _lp;
        },
        _isSinglePath(_lps, _from, _to) {
            let _status = false;
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
                    _status = true;
                    break;
                }
            }
            return _status;
        }
    };
}(jQuery));