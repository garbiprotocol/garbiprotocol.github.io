$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        421613: {
            protocolLiquidityLaunch: {
                contract: "0x86755259649354a63a6ebad207803424296db6d2",
                totalOffered: 50000000000
            }
        },
    };
    var TOKENS = {
        421613: {
            'gar': '0x5707A65bBE46B6D5c4cF4E981A1Fe680242C00FE'
        }
    }
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        /**
         * @param _chainId {Number} 56 || 97
         */
        getContracts(_chainId = 56) {
            return CONTRACTS[_chainId];
        },
        /**
         * @param _chainId {Number} 56 || 97
         */
        getTokens(_chainId = 56) {
            return TOKENS[_chainId];
        },
        getTokenList(_chainId = 56) {
            let _tokenObj = this.getTokens(_chainId);
            let _tokenList = [];
            for (let idx in _tokenObj) {
                _tokenList.push(_tokenObj[idx]);
            }
            return _tokenList;
        },
        /**
         * @param _chainId {Number} 56 || 97
         * @param _tokenName {String}
         */
        getTokenByTokenName(_chainId = 56, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        }
    };
}(jQuery));