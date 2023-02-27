$.PROTOCOL_LIQUIDITY_LAUNCH = function() {};
$.PROTOCOL_LIQUIDITY_LAUNCH.prototype = (function() {
    var setting = {
        chainId: 42161,
        // 42161 // Arb mainanet
        // 421613 // goerli testnet
        transactionFee: 0.001 // ETH
    };
    var transactions = {};
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.initData();
        },
        async initData() {
            let self = this;
            try {
                await self.getData();
                self.reloadData();
            } catch (e) {
                console.log("INIT::DATA::FALSE", e);
                self.reloadData();
            }
        },

        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 17000);
        },

        async getData() {
            let self = this;
            let _abi = abiHelper.getLaunchDataABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.launchData.contract;
            let _readContract = contractBaseHelper.getReadContract(_contract, _abi);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = [];

            for (let _idx = 0; _idx < _r.length; _idx++) {
                let _content = {};
                let _isPrivateSale = _idx == 0;
                _content["allowed"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["allowed"]) / 1e18, 18);
                _content["uUSDCBal"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["uUSDCBal"]) / 1e6, 6);
                _content["cUSDCBal"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["cUSDCBal"]) / 1e6, 6);
                _content["uMaxUSDCPay"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["uMaxUSDCPay"]) / 1e6, 6);
                _content["salePrice"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["salePrice"]) / 1e6, 6);
                _content["totalPurchased"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["totalPurchased"]) / 1e6, 6);
                _content["totalSale"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["totalSale"]) / 1e18, 18);
                _content["uMaxGrbBuy"] = coreHelper.parseFloatNumber(parseInt(_r[_idx]["uMaxGrbBuy"]) / 1e18, 18);
                _content["config"] = {
                    salePrice: _content["salePrice"],
                    totalOffered: _isPrivateSale == true ? _contractsObj["privateSale"]["totalOffered"] : _contractsObj["publicSale"]["totalOffered"],
                };
                _content["totalGRBBuyed"] = _content["config"]["totalOffered"] - _content["totalSale"];
                _data.push(_content);
            }
            
            console.log("_data", _data)
            self.drawUI( _data);
            await self._initUserData(_user, _data);

        },
        async drawUI(_data) {
            let self = this;
            let _ratioProgess = self.getTotalGRBBuyed(_data) * 100 / self.getTotalOffered(_data);

            $(`.u-usdc-max-pay-public-sale`).html(`${ coreHelper.numberWithCommas(self.getMaxPay(_data, false), 8) }`)
            $(`.u-usdc-max-pay-private-sale`).html(`${ coreHelper.numberWithCommas(self.getMaxPay(_data, true), 8) }`)
            $(`.launch-process`).html(`${ coreHelper.numberWithCommas(_ratioProgess, 2) }`);
        },
        getTotalGRBBuyed(_data) {
            let _total = 0;
            for (let _idx = 0; _idx < _data.length; _idx++) {
                _total += _data[_idx]["totalGRBBuyed"];
            }
            return _total;
        },
        getTotalOffered(_data) {
            let _total = 0;
            for (let _idx = 0; _idx < _data.length; _idx++) {
                _total += _data[_idx]["totalOffered"];
            }
            return _total;
        },
        getMaxPay(_data, _isPrivateSale = false) {
            if (_isPrivateSale == true) {
                _data = _data[0];
            } else {
                _data = _data[1];
            }
            let _maxPay = _data.uMaxUSDCPay;
            let _uBal = _data.uUSDCBal;
            let _fee = setting.transactionFee;

            if (_uBal <= _fee) {
                _maxPay = 0;
            } else {
                _maxPay = _maxPay < _uBal - _fee ? _maxPay : _uBal - _fee;
            }
            return _maxPay;
        },
        getAllowedAmount(_data, _isPrivateSale = false) {
            if (_isPrivateSale == true) {
                _data = _data[0];
            } else {
                _data = _data[1];
            }
            let _allowed = _data.allowed ? _data.allowed : 0;
            return _allowed;
        },
        clickMaxPrivateSale() {
            let self = this;
            let _isPrivateSale = true;
            $(`.max-usdc-private-sale`).on("click", () => {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                
                $(`input[name=amount_buy_private_sale`).val(self.getMaxPay(_data, _isPrivateSale));
            });
        },

        clickMaxPublicSale() {
            let self = this;
            let _isPrivateSale = false;
            $(`.max-usdc-private-sale`).on("click", () => {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                
                $(`input[name=amount_buy_public_sale`).val(self.getMaxPay(_data, _isPrivateSale));
            });
        },

        buyPrivateSale() {
            let self = this;
            let _isPrivateSale = true;
            $(`.btn-buy-private-sale`).click(function(e) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                let _usdcAllowed = self.getAllowedAmount(_data, _isPrivateSale);
                if (_usdcAllowed > 100000) {
                    self._buy(_isPrivateSale);
                } else {
                    self._approve(_isPrivateSale);
                }
            });
        },

        buyPublicSale() {
            let self = this;
            let _isPrivateSale = false;
            $(`.btn-buy-public-sale`).click(function(e) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                let _usdcAllowed = self.getAllowedAmount(_data, _isPrivateSale);
                if (_usdcAllowed > 100000) {
                    self._buy(_isPrivateSale);
                } else {
                    self._approve(_isPrivateSale);
                }
            });
        },

        _approve(_isPrivateSale = false) {
            let self = this;
            let _abi = abiHelper.getTokenABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _tokensObj = configHelper.getTokens(setting.chainId);
            let _contract = _tokensObj["usdc"];
            let callContarct = contractBaseHelper.getMainContract(_contract, _abi);
            let _spender = "";
            if (_isPrivateSale == true) {
                _spender = _contractsObj.privateSale.contract;
            } else {
                _spender = _contractsObj.publicSale.contract;
            }

            callContarct
                    .methods
                    .approve(_spender, configHelper.getAmountLimit())
                    .send({ 
                        from: _user
                    })
                    .on("transactionHash", function(hash) {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on("confirmation", function(confirmationNumber, receipt) {
                        if (self._showSuccessPopup(receipt)) {
                            self._buy();
                        }
                    })
                    .on('receipt', (receipt) => {
                        if (self._showSuccessPopup(receipt)) {
                            self._buy();
                        }
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
        },
        _buy(_isPrivateSale = false) {
            let self = this;
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = "";
            let _inputName = "";
            if (_isPrivateSale == true) {
                _contract = _contractsObj.privateSale.contract;
                _inputName = "amount_buy_private_sale";
            } else {
                _contract = _contractsObj.publicSale.contract;
                _inputName = "amount_buy_public_sale";
            }
            let callContarct = contractBaseHelper.getMainContract(_contract, _abi);
             
            let input = $(`input[name=${_inputName}]`).val();

            callContarct
                .methods
                .buy(coreHelper.toBN(input, 6))
                .send({ 
                    from: _user
                })
                .on("transactionHash", function(hash) {
                    coreHelper.showPopup('confirm-popup');
                })
                .on("confirmation", function(confirmationNumber, receipt) {
                        if (self._showSuccessPopup(receipt)) {
                            $(`input[name=${_inputName}]`).val("");
                        }
                })
                .on('receipt', (receipt) => {
                        if (self._showSuccessPopup(receipt)) {
                            $(`input[name=${_inputName}]`).val("");
                        }
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
        },


        _showSuccessPopup(receipt, next = null) {
            if (receipt.status == true && !transactions[receipt.transactionHash]) {
                // if (next) next();
                transactions[receipt.transactionHash] = true;
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
                 // $('input[name=amount_buy]').val("");
                 return true;
            }
            return false;
        },

        async _initUserData(_user, _data) {

            let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
            _protocolLauchInfoOf = _protocolLauchInfoOf ? _protocolLauchInfoOf : {};
            _protocolLauchInfoOf[_user] = _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
            _protocolLauchInfoOf[_user] = _data;
            storeHelper.setVaule('protocolLauchInfoOf', _protocolLauchInfoOf);
        },


    }
}(jQuery));