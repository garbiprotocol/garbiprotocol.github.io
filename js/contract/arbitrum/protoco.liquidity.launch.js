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
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.protocolLiquidityLaunch.contract;
            let _readContract = contractBaseHelper.getReadContract(_contract, _abi);
            let _r = await _readContract.methods.getData(_user).call();

            let _data = {};
            /**
            data_[0] = uint256 userUSDCBalance;
            data_[1] = uint256 userMaxGrbBuy;
            data_[2] = uint256 userMaxUSDCPay;
            data_[3] = uint256 contractUSDCBalance;
            data_[4] = uint256 HARD_CAP_PER_USER;
            data_[5] = uint256 totalSaleGab;
            data_[6] = uint256 salePrice;
            data_[7] = uint256 totalPurchased;
            data_[8] = uint256 usdcAllowed;
             */
            _data.uUSDCBal = coreHelper.parseFloatNumber(parseInt(_r[0]) / 1e18, 18);
            _data.uMaxGrbBuy = coreHelper.parseFloatNumber(parseInt(_r[1]) / 1e18, 18);
            _data.uMaxUSDCPay =  coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.cUSDCBal = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            _data.totalPurchased = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.usdcAllowed = coreHelper.parseFloatNumber(parseInt(_r[8]) / 1e18, 18);
            _data.config = {
                hardCapPerUser: coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 8),
                salePrice: coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 8),
                totalOffered: _contractsObj.protocolLiquidityLaunch.totalOffered
            };
            _data.totalSaleGrb = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.totalGRBBuyed = _data.config.totalOffered - _data.totalSaleGrb;

            // _data.totalGRBBuyed = coreHelper.numberWithCommas(_data.config.totalOffered - _data.totalSaleGrb, 6)
            // self.processAmt(null, _data);
            self.drawUI( _data);
            await self._initUserData(_user, _data);

        },

        async drawUI(_data) {
            let self = this;
            let _ratioProgess = _data.totalGRBBuyed * 100 / _data.config.totalOffered;

            // $(`.total-usdc-perchased`).html(`${ coreHelper.formatBalance(_data.totalPurchased, 3) }`);
            // $(`.total-grb-offered`).html(`${ coreHelper.formatBalance(_data.config.totalOffered, 0) }`);
            // $(`.sale-price`).html(`${ coreHelper.numberWithCommas(_data.config.salePrice, 3) }`);
            // $(`.hard-cap-per-user`).html(`${ coreHelper.formatBalance(_data.config.hardCapPerUser, 2) }`);
            $(`.u-usdc-max-pay`).html(`${ coreHelper.numberWithCommas(self.getMaxPay(_data), 8) }`)
            $(`.launch-process`).html(`${ coreHelper.numberWithCommas(_ratioProgess, 2) }`);
        },

        getMaxPay(_data) {
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
        async processAmt(_payAmt = null, _data = null) {
            if (_data == null) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
            }
            if (!_data) return false;
            if (_payAmt == null) _payAmt = $(`input[name=amount_buy]`).val();

            let _salePrice = _data.config.salePrice;
            let _uMaxGrbBuy = _data.uMaxGrbBuy;
            let _uMaxUSDCPay = _data.uMaxUSDCPay <= _data.uUSDCBal ? _data.uMaxUSDCPay : _data.uUSDCBal;

            let _quatity = _payAmt / _salePrice;
            _quatity = _quatity <= _uMaxGrbBuy ? _quatity : _uMaxGrbBuy;

        },
        onAmountPayChange() {
            let self = this;
            $(`input[name=amount_buy]`).on('input', (e) => {
               self.processAmt(e.target.value);
            });
        },
        clickMax() {
            let self = this;
            $(`.max-usdc`).on("click", () => {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                
                $(`input[name=amount_buy`).val(self.getMaxPay(_data));
            });
        },

        buy() {
            let self = this;
            $(`.btn-buy`).click(function(e) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                let _usdcAllowed = _data.usdcAllowed ? _data.usdcAllowed : 0;
                if (_usdcAllowed > 100000) {
                    self._buy();
                } else {
                    self._approve();
                }
            });
        },

        _approve() {
            let self = this;
            let _abi = abiHelper.getTokenABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _tokensObj = configHelper.getTokens(setting.chainId);
            let _contract = _tokensObj["usdc"];
            let callContarct = contractBaseHelper.getMainContract(_contract, _abi);

            callContarct
                    .methods
                    .approve(_contractsObj.protocolLiquidityLaunch.contract, configHelper.getAmountLimit())
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
        _buy() {
            let self = this;
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.protocolLiquidityLaunch.contract;
            let callContarct = contractBaseHelper.getMainContract(_contract, _abi);

            let input = $(`input[name=amount_buy]`).val();

            callContarct
                .methods
                .buy(coreHelper.toBN(input))
                .send({ 
                    from: _user
                })
                .on("transactionHash", function(hash) {
                    coreHelper.showPopup('confirm-popup');
                })
                .on("confirmation", function(confirmationNumber, receipt) {
                        if (self._showSuccessPopup(receipt)) {
                            $('input[name=amount_buy]').val("");
                        }
                })
                .on('receipt', (receipt) => {
                        if (self._showSuccessPopup(receipt)) {
                            $('input[name=amount_buy]').val("");
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