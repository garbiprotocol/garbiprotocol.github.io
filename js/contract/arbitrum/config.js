$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        421613: {
            protocolLiquidityLaunch: {
                contract: "0x6FA8564842a78ceeDfDF52e0bE70Fe4437ae60F2",
                totalOffered: 250000
            }
        },
    };
    var TOKENS = {
        421613: {
            'grb': '0xF957881C60ec9E1a436f4C5e2bfC115b800E5be7',
            'usdc': '0xC667C0e84bEfB80099372d4062B3076b232EF157'
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
         * @param _chainId {Number} 42161 || 421613
         */
        getContracts(_chainId = 42161) {
            return CONTRACTS[_chainId];
        },
        /**
         * @param _chainId {Number} 56 || 421613
         */
        getTokens(_chainId = 42161) {
            return TOKENS[_chainId];
        },
        getTokenList(_chainId = 42161) {
            let _tokenObj = this.getTokens(_chainId);
            let _tokenList = [];
            for (let idx in _tokenObj) {
                _tokenList.push(_tokenObj[idx]);
            }
            return _tokenList;
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        }
    };
}(jQuery));