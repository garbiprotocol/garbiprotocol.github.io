$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        421613: {
            protocolLiquidityLaunch: {
                contract: "0x658fA49C37c41833923ef48E4eCfDB527D2cc6b0",
                totalOffered: 250000
            },
            publicSale: {
                contract: "0xC535363F6E4BFf54d5A3d489194956baE2F9eA61",
                totalOffered: 200000
            },
            privateSale: {
                contract: "0xb62153e33C14B8B5fC37c94031E24579144745dF",
                totalOffered: 50000
            },
            launchData: {
                contract: "0xF1fab3169bd20F9384181599d711f28Afe560788"
            },
            garbiSwap: {
                pool: {
                    default: {
                        tradeMachine: '',
                        info: {
                            pairs: '0x265e273A18C032cc12260B317d2BfB3D058039A0'
                        },
                        pairs: [
                            {
                                contract: '0xf48ae426b8647e5d7c025051957c527e825c85e6',
                                tradeFee: 0.001,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'usdc',
                                token: 'usdt'
                            },
                            {
                                contract: '0xf48ae426b8647e5d7c025051957c527e825c85e6',
                                tradeFee: 0.001,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'usdc',
                                token: 'dai'
                            }
                        ]
                    }
                },
            }
        },
    };
    var TOKENS = {
        421613: {
            'grb': '0x940dFF7Edbc24FbB683a8d002eCbA6C0a62cCc75',
            'usdc': '0x031c18be12afc98d2e4996660707b79ecde7e916',
            'usdt': '0x5922517b49d04f7128c9901b2c3ffd932e62def5',
            'dai': '0x5922517b49d04f7128c9901b2c3ffd932e62def5'
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