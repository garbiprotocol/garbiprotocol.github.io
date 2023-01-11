$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        421613: {
            info: {
                getAllowTransfer: '0x23E8f78ab3813Cf2297b3F49BaF93Ef9fDD5cD8B',
                balanceInfo: '0x44e80DDF5F96fe5efbDFCDfb6e7C16F154467AEE',
                priceInfo: ''
            },
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
                            pairs: '0xf1089d56d142d46e5ff5ec8f6705f6f252c11357'
                        },
                        pairs: [
                            {
                                contract: '0x644434ccba741b2892485e857e60f332264f3ab8',
                                tradeFee: 0.001,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                lbDecimal: 6,
                                base: 'usdc',
                                token: 'usdt'
                            },
                            {
                                contract: '0xb957d13250443706717d0d95cdb67e4a02650b6c',
                                tradeFee: 0.001,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                lbDecimal: 6,
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
            'grb': '0xd1eB8a5798E04703ec5324c99405F581BD6318b8',
            'usdc': '0x29680bd5f3f324001add9229d6b44615353f554c',
            'usdt': '0x2e4e7ebff934b6999bdc2983f17f6bd4b6a84206',
            'dai': '0x9Ce3C139316A560A57c861F558284CF31EBC8acE'
        }
    }
    var TOKENS_DECIMAL = {
        421613: {
            'grb': 18,
            'usdc': 6,
            'usdt': 6,
            'dai': 18
        }
    };
    var PRICES = {
        421613: {
            'usdc': 1,
            'usdt': 1,
            'dai': 1
        }
    };
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
        getPrices(_chainId = 42161) {
            return PRICES[_chainId];
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getTokenNameByAddress(_chainId = 42161, _tokenAddr = '') {
            _tokenAddr = _tokenAddr.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenName in _tokens) {
                if (_tokens[_tokenName].toLowerCase() == _tokenAddr) return _tokenName;
            }
            return "";
        },
        getTokenDecimalByAddress(_chainId = 42161, _tokenAddr = '') {
            _tokenAddr = _tokenAddr.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenName in _tokens) {
                if (_tokens[_tokenName].toLowerCase() == _tokenAddr) return TOKENS_DECIMAL[_chainId][_tokenName];;
            }
            throw new Error("Invalid Token Address");
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenDecimalByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS_DECIMAL[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        }
    };
}(jQuery));