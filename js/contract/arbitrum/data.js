$.DATA = function() {};
$.DATA.prototype = (function() {
    var setting = {
        chainId: 56
    };
    var isInitTokenPrice = true;
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
                await self._initBalance();
                if (isInitTokenPrice == true) await self._initPrice();
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
            }, 7000);
        },
        async _initBalance() {
            try {
                let _abi = abiHelper.getBalanceInfoABI();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.info.balanceInfo;
                let _readContract = contractBaseHelper.getReadContract(_contract, _abi);
                let _tokenList = configHelper.getTokenList(setting.chainId);
                let _user = coreHelper.getUserAccount();
                let _r = await _readContract.methods.getData(_user, _tokenList).call();
                let _balanceOf = {};
                _balanceOf['native'] = parseInt(_r.nativeBal_) / 1e18;
                for (let idx = 0; idx < _r.tokensBal_.length; idx++) {
                    let _tokenDecimal = configHelper.getTokenDecimalByAddress(setting.chainId, _r.tokensBal_[idx]['token']);
                    _balanceOf[_r.tokensBal_[idx]['token'].toLowerCase()] = parseInt(_r.tokensBal_[idx]['amount']) / (10 ** _tokenDecimal);
                }
                storeHelper.setVaule('balanceOf', _balanceOf);
            } catch (e) {
                console.log("_initBalance", e);
            }
        },
        async _initPrice() {
            try {
                let _tokenList = configHelper.getTokenList(setting.chainId);
                let _prices = configHelper.getPrices(setting.chainId);
                let _priceOf = {};
                for (let idx = 0; idx < _tokenList.length; idx++) {
                    let _tokenName = configHelper.getTokenNameByAddress(setting.chainId, _tokenList[idx]);
                    let _price = _prices[_tokenName] ? _prices[_tokenName] : 0;
                    _priceOf[_tokenList[idx]] = _price;
                }
                storeHelper.setVaule('priceOf', _priceOf);
                // stop init price
                isInitTokenPrice = false;
            } catch (e) {
                console.log("_initPrice", e);
            }
        }
    };
}(jQuery));