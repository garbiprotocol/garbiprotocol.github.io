$.GARBI_SWAP_INFO = function() {};
$.GARBI_SWAP_INFO.prototype = (function() {
    var setting = {
        chainId: 42161,
        pool: "default"
    };
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
                let _abi = abiHelper.getGarbiSwapInfoABI();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.garbiSwap.pool[setting["pool"]].info.pairs;
                let _readContract = contractBaseHelper.getReadContract(_contract, _abi);
                let _pairs = _contractsObj.garbiSwap.pool[setting["pool"]].pairs;
                let _tradeMachineAddr = _contractsObj.garbiSwap.pool[setting["pool"]].tradeMachine;
                let _lps = _pairs.map(item => item.contract);
                let _lpsDecimal = _pairs.map(item => item.lbDecimal);
                let _user = coreHelper.getUserAccount();
                let _r = await _readContract.methods.getData(_user, _lps).call();
                let _data = [];
                let _liquidityOfGarbiSwap = {};
                let _allowsTransferToTradeMachineOf = {};
                for (let idx = 0; idx < _r.length; idx++) {
                    // base alway is busd
                    let _base = _pairs[idx].base;
                    let _token = _pairs[idx].token;
                    let _baseDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _base);
                    let _tokenDecimal = configHelper.getTokenDecimalByTokenName(setting.chainId, _token);
                    let _baseReserve = parseInt(_r[idx]['baseReserve']) / (10 ** _baseDecimal);
                    let _tokenReserve = parseInt(_r[idx]['tokenReserve']) / (10 ** _tokenDecimal);
                    let _uBaseAllowedToPair = parseInt(_r[idx]['uBaseAllowedToPair']) / (10 ** _baseDecimal);
                    let _uTokenAllowedToPair = parseInt(_r[idx]['uTokenAllowedToPair']) / (10 ** _tokenDecimal);

                    let _uBaseAllowedToTradeMachine = parseInt(_r[idx]['uBaseAllowedToTradeMachine']) / (10 ** _baseDecimal);
                    let _uTokenAllowedToTradeMachine = parseInt(_r[idx]['uTokenAllowedToTradeMachine']) / (10 ** _tokenDecimal);

                    _liquidityOfGarbiSwap[_base] = _liquidityOfGarbiSwap[_base] ? _liquidityOfGarbiSwap[_base] : 0;
                    _liquidityOfGarbiSwap[_token] = _liquidityOfGarbiSwap[_token] ? _liquidityOfGarbiSwap[_token] : 0;
                    _liquidityOfGarbiSwap[_base] += _baseReserve;
                    _liquidityOfGarbiSwap[_token] += _tokenReserve;
                    let _allowedOf = {};
                    _allowedOf[_base] = _uBaseAllowedToPair;
                    _allowedOf[_token] = _uTokenAllowedToPair;

                    _allowsTransferToTradeMachineOf[_base] = _uBaseAllowedToTradeMachine;
                    _allowsTransferToTradeMachineOf[_token] = _uTokenAllowedToTradeMachine;

                    _data.push({
                        "contract": _pairs[idx].contract,
                        "base": _base,
                        "token": _token,
                        "baseReserve": _baseReserve,
                        "tokenReserve": _tokenReserve,
                        "lbDecimal": _lpsDecimal,
                        "uLPBal": parseInt(_r[idx]['uLPBal']) / (10 ** _lpsDecimal),
                        "uBaseAllowed": _uBaseAllowed,
                        "uTokenAllowed": _uTokenAllowed,
                        "allowedOf": _allowedOf
                    });
                }
                // console.log("_data", _data)
                storeHelper.setVaule('garbiSwapLPs', _data);
                storeHelper.setVaule('liquidityOfGarbiSwap', _liquidityOfGarbiSwap);
                storeHelper.setVaule('allowsTransferToTradeMachineOf', _allowsTransferToTradeMachineOf);
                self.initInterface(_data, _liquidityOfGarbiSwap);
                self.reloadData();
            } catch (e) {
                console.log("INIT::GARBI_SWAP_INFO::FALSE", e);
                self.reloadData();
            }
        },
        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 15000);
        },
        async initInterface(_garbiSwapInfos, _liquidityOfGarbiSwap) {
            let total = 0
            for (let token in _liquidityOfGarbiSwap) {
                total += _liquidityOfGarbiSwap[token]
            }
            for (let _token in _liquidityOfGarbiSwap) {
                $(`.swap-liquidity-${_token}`).html(`
                    ${coreHelper.displayBalance(_liquidityOfGarbiSwap[_token], 2)} &nbsp
                    (${coreHelper.numberWithCommas(_liquidityOfGarbiSwap[_token] * 100 / total, 2)}%)`);

            }
        }
    };
}(jQuery));