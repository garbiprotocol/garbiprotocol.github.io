$.GARBI_BRIDGE_CONFIG = function() {};
$.GARBI_BRIDGE_CONFIG.prototype = (function() {
    const network = {
        ArbitrumOne: {
            chainId: 42161,
            chainName: "Arbitrum One",
            currencySymbol: "ETH",
            rpcList: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io']

        },

        ArbitrumGoerli: {
            chainId: 421613,
            chainName: "Arbitrum Goerli",
            currencySymbol: "ETH",
            rpcList: ['https://goerli-rollup.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://goerli.arbiscan.io/'],
        },

        ArbitrumNova: {
            chainId: 42170,
            chainName: "Arbitrum Nova",
            currencySymbol: "ETH",
            rpcList: ['https://nova.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://nova.arbiscan.io'],
        }
    };

    const contract = {
        ArbitrumOne: {
            bridgeContract: "0xaab127696990703c922ad4ccdd5838799e6ba265",
            erc20Handle: "0x56ad41b541d1921e099c54ebf936987723b6cb5f",
        },

        ArbitrumGoerli: {
            bridgeContract: "0xe8bd9c2a389177effd74d109b915a690245d15aa",
            erc20Handle: "0x7f72A67d72A144513e05648571000efa6a0f9D60",

        },
        ArbitrumNova: {
            bridgeContract: "0x0e99bb96880ed959324615d0e9cd05ec7f7eb004",
            erc20Handle: "0x5B1CED88a115aF0d72Df7b5cB0195BA03234679d",
        },
    };

    const token = {
        ArbitrumOne: {
            cyberCredit: "0x85Cf9E2fE7eEA7F362cfA940Cc4bfBb4D05e1D08",
            vegrb: "0x14C302dca44528A2B00B932AfdF01E9d48100B7b",
            grb: "0x5Fd71280b6385157b291b9962f22153FC9E79000",
        },

        ArbitrumGoerli: {
            cyberCredit: "0xA55cb2d81E01773866F300C3d1c6fD7574Cfa245",
            vegrb: "0xD912cca034056115900F87C2DB8eF1a6B1a89143",
            grb: "0xd1eB8a5798E04703ec5324c99405F581BD6318b8",
        },
        ArbitrumNova: {
            cyberCredit: "0x3C2A3AfDbA1f64A83Cfe9350769D401Fd22ef74D",
            vegrb: "",
            grb: "0x90F72cC2BDFaf3aB5AC61a7f7b6759E25B844F1A",
        },
    };

    const bridgeToNetwork = {
        ArbitrumOne: {
            domainID: "3",
            resourceID: {
                cyberCredit: "0x000000000000000000000085cf9e2fe7eea7f362cfa940cc4bfbb4d05e1d0800",
                vegrb: "",
                grb: ""
            }
        },

        ArbitrumGoerli: {
            domainID: "421613",
            resourceID: {
                cyberCredit: "0x0000000000000000000000a55cb2d81e01773866f300c3d1c6fd7574cfa24500",
                vegrb: "",
                grb: ""
            }
        },

        ArbitrumNova: {
            domainID: "42170",
            resourceID: {
                cyberCredit: "0x0000000000000000000000a55cb2d81e01773866f300c3d1c6fd7574cfa24500",
                vegrb: "",
                grb: ""
            }
        },
    }

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
        },

        GetNetworkByNetworkName(chainName) {
            return network[chainName];
        },

        GetChainIdByNetworkNameToRead(chainName) {
            return network[chainName].chainId;
        },

        GetContractAddressByNetworkName(chainName) {
            return contract[chainName];
        },

        GetERC20HandleAddressByNetworkName(chainName) {
            return contract[chainName].erc20Handle;
        },

        GetBridgeContractAddressByNetworkName(chainName) {
            return contract[chainName].bridgeContract;
        },

        GetTokenAddressByNetworkName(chainName, tokenName) {
            return token[chainName][tokenName];
        },

        GetBridgeToNetworkByNetworkName(chainName) {
            return bridgeToNetwork[chainName];
        }

    }
}(jQuery));