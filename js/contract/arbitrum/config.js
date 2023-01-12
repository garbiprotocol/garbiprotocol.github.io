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
                        tradeMachine: '0x8591663134607bcd9e6d73d99c6aeee4bcbbaca0',
                        info: {
                            pairs: '0xf1089d56d142d46e5ff5ec8f6705f6f252c11357'
                        },
                        pairs: [
                             {
                                contract: '0x1914513cc76018f399e58ccc9b87be681423a9ce',
                                tradeFee: 0.001,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 18,
                                base: 'weth',
                                token: 'grb'
                            },
                            {
                                contract: '0x644434ccba741b2892485e857e60f332264f3ab8',
                                tradeFee: 0.001,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 6,
                                base: 'usdc',
                                token: 'usdt'
                            },
                            {
                                contract: '0xb957d13250443706717d0d95cdb67e4a02650b6c',
                                tradeFee: 0.001,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 6,
                                base: 'usdc',
                                token: 'dai'
                            }
                        ]
                    }
                },
            },
            farms: {
                2: {
                    type: 'garbi_pool',
                    contract: '0xd157e43d28de8e5a645bc70f37b3458e3f857983',
                    want: '0x1914513cc76018f399e58ccc9b87be681423a9ce', // 
                    wantDecimal: 18,
                    pid: 2,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.GRB_ETH.LP',
                    price: 35,
                    version: 1
                },
                4: {
                    type: 'garbi_pool',
                    contract: '0x9b935126d5bb5ac934e8fc9abf51df6a11ccb9a0',
                    want: '0x644434ccba741b2892485e857e60f332264f3ab8', // 
                    wantDecimal: 6,
                    pid: 4,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.USDT_USDC.LP',
                    price: 2,
                    version: 1
                },
                3: {
                    type: 'garbi_pool',
                    contract: '0xea715ebf7d98924b5f3cd2b19b4b2f84fd48cb03',
                    want: '0xb957d13250443706717d0d95cdb67e4a02650b6c', // 
                    wantDecimal: 18,
                    pid: 3,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.DAI_USDC.LP',
                    price: 2,
                    version: 1
                }
            },
            harvestMachine: ""
        },
    };
    var TOKENS = {
        421613: {
            'grb': '0xd1eb8a5798e04703ec5324c99405f581bd6318b8',
            'weth': '0xe0eca46ea3308e8184e3b462b8a722f93a8f6f27',
            'usdc': '0x29680bd5f3f324001add9229d6b44615353f554c',
            'usdt': '0x2e4e7ebff934b6999bdc2983f17f6bd4b6a84206',
            'dai': '0x9ce3c139316a560a57c861f558284cf31ebc8ace'
        }
    }
    var TOKENS_DECIMAL = {
        421613: {
            'grb': 18,
            'weth': 18,
            'usdc': 6,
            'usdt': 6,
            'dai': 18
        }
    };
    var PRICES = {
        421613: {
            'grb': 0.25,
            'weth': 1200,
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
        getPriceByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return PRICES[_chainId][_tokenName] ? PRICES[_chainId][_tokenName] : 0;
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