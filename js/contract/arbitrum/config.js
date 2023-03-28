$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        42161: {
            info: {
                getAllowTransfer: '0xa435031891054dd604a0ea95eb12667d10ef2c25',
                balanceInfo: '0x60137012b6cdbc6ce8571abbd656c120560cf3c5',
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
            garbiOracle: {
                contract: "0xb4e6898c12e782f0e01f610d9f73df1055095cbc"
            },
            garbiVestGRB: {
                contract: "0xfc7d1892137800a3f30d00f9a33624338fd47158"
            },
            garbiStakeGRB1Week: {
                contract: "0x1fb501f09a99844e9c9b4598e50010986f6b17b2"
            },
            garbiStakeGRB1Month: {
                contract: "0xfb66e862693c0676ac44e436d11c43ecda198eca"
            },
            garbiStakeGRB1Year: {
                contract: "0xa8d4324b1fc6442fd47414c809f4b54bfc3babc6"
            },
            garbiStakeVeGRB1Week: {
                contract: "0x001b938f5ac3436192182320f0553f5c939fadce"
            },
            garbiStakeVeGRB1Month: {
                contract: "0x7f95b1fb84f7131c86b3fe7d616be47b0143b2a5"
            },
            garbiStakeVeGRB1Year: {
                contract: "0x69f4f40fb8ad7f123f8fef86cbdf9bbac06f9f91"
            },
            gecExchangeInfo: {
                contract: "0xcd364dd29baab2bd044b9164b9a7d36bb679bf68"
            },
            garbiRepositoryManager: {
                contract: "0x7cc0dca4d117e2fc19a471dc75ba44e82386e8ee"
            },
            NonfungiblePositionManager: {
                contract: "0xc36442b4a4522e871399cd717abdd847ab11fe88"
            },
            GarbiFarmUniV3: {
                contract: "0x0BC8050C3443aFb10F4a999b627043Dcd8FB62b9"
            },
            garbiRepository: {
                'dai': '0xa9d63685d81d29bf8d74c122380df98a7c0a00a2',
                'usdc': '0x9e9c654ce87c0bb58d5df7835ac69a202a1deb9b',
                'usdt': '0x08e4983da044aa8a8d3121913ee0d368a3ff9ae4'
            },
            garbiSwapPairs: {
                'wethgrb': {
                    contract: '0x26cf5ba5b29f23f20fa82ba684f15e1eb5bf4874',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'grb'
                },
                'grbweth': {
                    contract: '0x26cf5ba5b29f23f20fa82ba684f15e1eb5bf4874',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'grb'
                }
            },
            garbiSwap: {
                pool: {
                    default: {
                        tradeMachine: '0x7f530808a2407c20a53a97e6521c1f549c1f8646',
                        info: {
                            pairs: '0x61b21b9b052d0bb2fae1e15c67e42deb9bf9639a'
                        },
                        pairs: [
                            {
                                contract: '0x26cf5ba5b29f23f20fa82ba684f15e1eb5bf4874',
                                tradeFee: 0.002,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 18,
                                base: 'weth',
                                token: 'grb'
                            },
                            {
                                contract: '0xb68b1c9a7dc9a437d6ee597ae31d80005206a919',
                                tradeFee: 0.002,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 18,
                                base: 'etho',
                                token: 'grbo'
                            },
                            {
                                contract: '0x3d5ddde5b8790cc294d03433bbe9cad194c002a5',
                                tradeFee: 0.0001,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 6,
                                base: 'usdc',
                                token: 'usdt'
                            },
                            {
                                contract: '0x4685befdc633a4067e65d422520e99c34c09b4d2',
                                tradeFee: 0.0001,
                                performanceFee: 0.5,
                                safuFund: 0,
                                lbDecimal: 18,
                                base: 'usdc',
                                token: 'dai'
                            }
                        ]
                    }
                },
            },
            farms: {
                0: {
                    type: 'garbi_pool',
                    contract: '0x79cf220c8c5c310a9cbf64788df07699c737b14e',
                    want: '0xb68b1c9a7dc9a437d6ee597ae31d80005206a919', // 
                    wantDecimal: 18,
                    pid: 0,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.GRB_ETH_OLD.LP',
                    price: 35,
                    version: 1
                },
                1: {
                    type: 'garbi_pool',
                    contract: '0x03036402d3aecb72f4bf3d2bd688410eb932d6b7',
                    want: '0x3d5ddde5b8790cc294d03433bbe9cad194c002a5', // 
                    wantDecimal: 6,
                    pid: 1,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.USDT_USDC.LP',
                    price: 2,
                    version: 1
                },
                2: {
                    type: 'garbi_pool',
                    contract: '0x40bb13a3a930cca7dc089f22937e463c0fb9ef27',
                    want: '0x4685befdc633a4067e65d422520e99c34c09b4d2', // 
                    wantDecimal: 18,
                    pid: 2,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.DAI_USDC.LP',
                    price: 2,
                    version: 1
                },
                3: {
                    type: 'garbi_pool',
                    contract: '0x12a7144114354f319bba86acd8d17e912dd4634d',
                    want: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // 
                    wantDecimal: 18,
                    pid: 3,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.WETH.LP',
                    price: 1700,
                    version: 1
                },
                4: {
                    type: 'garbi_pool',
                    contract: '0x6baeb427e39da7550bff5b638686e1e39f327554',
                    want: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // 
                    wantDecimal: 8,
                    pid: 4,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.WBTC.LP',
                    price: 26000,
                    version: 1
                },
                5: {
                    type: 'garbi_pool',
                    contract: '0x5fb8b200ab56326b94060ebfdd002a4419481698',
                    want: '0x26cf5ba5b29f23f20fa82ba684f15e1eb5bf4874', // 
                    wantDecimal: 18,
                    pid: 5,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.GRB_ETH.LP',
                    price: 8000,
                    version: 1
                },
                12: {
                    type: 'garbi_pool',
                    contract: '0xca38f8cd4c816016c46ba27adf377618baec9024',
                    want: '0x5eba4d078a28578d24aa536f70448d507e1cc78e', // 
                    wantDecimal: 18,
                    pid: 12,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.GEC.LP',
                    price: 1,
                    version: 1
                },
            },
            harvestMachine: ""
        },
        421613: {
            info: {
                getAllowTransfer: '0x23E8f78ab3813Cf2297b3F49BaF93Ef9fDD5cD8B',
                balanceInfo: '0x18B9Bc83623c53b92e185A33b482F5206a1eD27b',
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
            garbiVestGRB: {
                contract: "0x18c0d036b684899254fa88b67b4e5405ac5c7ee5"
            },
            garbiStakeGRB1Week: {
                contract: "0x741071c6b068f25ca9d832282a0e91563b8ff0ce"
            },
            garbiStakeGRB1Month: {
                contract: "0x14551e6b43d8d22195e0b2df7746300132c79f48"
            },
            garbiStakeGRB1Year: {
                contract: "0xe5a9b4d6719a1329e452e8e11f20e1235df12d72"
            },
            garbiStakeVeGRB1Week: {
                contract: "0x14eca65a5e9ac57117e44aebbcaeb2e18360da76"
            },
            garbiStakeVeGRB1Month: {
                contract: "0xce797f40d1783ec1681e735cceed4e8a78fa9792"
            },
            garbiStakeVeGRB1Year: {
                contract: "0xbf802cc94215a096de917dcb533d37e81ac9c21e"
            },
            gecExchangeInfo: {
                contract: "0x1f1d5365edd3dbb43d600590079d732f74ee0485"
            },
            garbiRepositoryManager: {
                contract: "0x18784b6ac1849e0015d83944a173427ee100a805"
            },
            NonfungiblePositionManager: {
                contract: "0x622e4726a167799826d1E1D150b076A7725f5D81"
            },
            GarbiFarmUniV3: {
                contract: "0x9ef0d08F55AFaE9421057E79Bd52554CB0b611a2"
            },
            garbiRepository: {
                'dai': '0x508C16e20C4d3730570C7b9B73e1c88538dA8a26',
                'usdc': '0xdf52a59987dfca14a09287e101e01654f143cde1',
                'usdt': '0x02c90b0a584ead487ee5bee35f74cd0132789dd3'
            },
            garbiSwapPairs: {
                'wethgrb': {
                    contract: '0x1914513cc76018f399e58ccc9b87be681423a9ce',
                    tradeFee: 0.001,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'grb'
                },
                'grbweth': {
                    contract: '0x1914513cc76018f399e58ccc9b87be681423a9ce',
                    tradeFee: 0.001,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'grb'
                }
            },
            garbiSwap: {
                pool: {
                    default: {
                        tradeMachine: '0x8591663134607bcd9e6d73d99c6aeee4bcbbaca0',
                        info: {
                            pairs: '0x870eE86395736F6C149F94551E995b8d60b276f9'
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
                                lbDecimal: 18,
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
                },
                13: {
                    type: 'garbi_pool',
                    contract: '0x45b6EeCc4CDeB14A39DcF638fAbF1A563D528538',
                    want: '0x965782738c1acca851104444bda0a03ee68355dc', // 
                    wantDecimal: 18,
                    pid: 13,
                    isActive: true,
                    isERC20: true,
                    isActive: true,
                    label: 'GarbiFarm.GEC.LP',
                    price: 1,
                    version: 1
                }
            },
            harvestMachine: ""
        },
    };
    var TOKENS = {
        42161: { //mainnet arbitrum one
            'grb': '0x5fd71280b6385157b291b9962f22153fc9e79000',
            'vegrb': '0x14c302dca44528a2b00b932afdf01e9d48100b7b',
            'grbo': '0x5fd71280b6385157b291b9962f22153fc9e79000',
            'weth': '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            'etho': '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            'wbtc': '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
            'usdc': '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            'usdt': '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
            'dai': '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
            'gec': '0x5eba4d078a28578d24aa536f70448d507e1cc78e'
        },
        421613: {//arbitrum testnet
            'grb': '0xd1eb8a5798e04703ec5324c99405f581bd6318b8',
            'vegrb': '0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da',
            'weth': '0xE0EcA46EA3308E8184e3b462b8A722F93A8F6F27',
            'usdc': '0x29680BD5F3f324001Add9229d6B44615353f554c',
            'usdt': '0x2E4e7eBfF934B6999BDc2983F17F6bd4b6A84206',
            'dai': '0x9Ce3C139316A560A57c861F558284CF31EBC8acE',
            'gec': '0x965782738c1acca851104444bda0a03ee68355dc'
        }
    }
    var TOKENS_DECIMAL = {
        42161: {
            'grb': 18,
            'vegrb': 18,
            'grbo': 18,
            'weth': 18,
            'etho': 18,
            'wbtc': 8,
            'usdc': 6,
            'usdt': 6,
            'dai': 18,
            'gec': 18
        },
        421613: {
            'grb': 18,
            'vegrb': 18,
            'weth': 18,
            'usdc': 6,
            'usdt': 6,
            'dai': 18,
            'gec': 18
        }
    };
    var PRICES = {
        42161: {
            'grb': 0.6,
            'weth': 1700,
            'wbtc': 26000,
            'usdc': 1,
            'usdt': 1,
            'dai': 1
        },
        421613: {
            'grb': 0.6,
            'weth': 1700,
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
        getAddressByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenAddr in _tokens) {
                if (_tokens[_tokenAddr].toLowerCase() == _tokenName) return _tokenAddr;
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
        },
        getContractAddressByName(_chainId = 421613, name) {
            return CONTRACTS[_chainId][name].contract;
        }
    };
}(jQuery));