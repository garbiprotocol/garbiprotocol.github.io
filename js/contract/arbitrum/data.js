$.DATA = function() {};
$.DATA.prototype = (function() {
    var setting = {
        chainId: 56
    };
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            // this.initData();
        },
        async initData() {
            let self = this;
            try {
                await self._initBalance();
                await self._initPrice();
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
            }, 3000);
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
                _balanceOf['bnb'] = parseInt(_r.bnbBal_) / 1e18;
                for (let idx = 0; idx < _r.tokensBal_.length; idx++) {
                    _balanceOf[_r.tokensBal_[idx]['token']] = parseInt(_r.tokensBal_[idx]['amount']) / 1e18;
                }
                storeHelper.setVaule('balanceOf', _balanceOf);
            } catch (e) {
                console.log("_initBalance", e);
            }
        },
        async _initPrice() {
            try {
                let _abi = abiHelper.getPriceInfoABI();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.info.priceInfo;
                let _readContract = contractBaseHelper.getReadContract(_contract, _abi);
                let _tokenList = configHelper.getTokenList(setting.chainId);
                let _r = await _readContract.methods.getData(_tokenList).call();
                let _priceOf = {};
                for (let idx = 0; idx < _r.length; idx++) {
                    _priceOf[_r[idx]['token']] = parseInt(_r[idx]['price']) / 1e18;
                }
                storeHelper.setVaule('priceOf', _priceOf);
            } catch (e) {
                console.log("_initPrice", e);
            }
        }
    };
}(jQuery));