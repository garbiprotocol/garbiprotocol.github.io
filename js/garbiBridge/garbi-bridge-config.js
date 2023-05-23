$.GARBI_BRIDGE_CONFIG = function() {};
$.GARBI_BRIDGE_CONFIG.prototype = (function()
{
    const network = 
    {
        ArbitrumOne: 
        {
            chainId : 42161,
            chainName : "Arbitrum One",
            currencySymbol: "ETH",
            rpcList: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io']

        },

        ArbitrumGoerli:
        {
            chainId : 421613,
            chainName : "Arbitrum Goerli",
            currencySymbol: "ETH",
            rpcList: ['https://goerli-rollup.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://goerli.arbiscan.io/'],
        },

        ArbitrumNova:
        {
            chainId : 42170,
            chainName : "Arbitrum Nova",
            currencySymbol: "ETH",
            rpcList: ['https://nova.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://nova.arbiscan.io'],
        }
    };

    const contract = 
    {
        ArbitrumOne:
        {
            bridgeContract: "0xaab127696990703c922ad4ccdd5838799e6ba265",
            erc20Handle: "0x56ad41b541d1921e099c54ebf936987723b6cb5f",
        },

        ArbitrumGoerli:
        {
            bridgeContract: "0xED86Cb44d0810D3D4Da41132554770428f8e5Ad9",
            erc20Handle: "0x6dbb578ca9145229abb109685d13fa12b8db6273",
            
        },
        ArbitrumNova:
        {
            bridgeContract: "0xaAB127696990703C922Ad4cCDd5838799e6BA265",
            erc20Handle: "0x56ad41b541d1921e099c54ebf936987723b6cb5f",
        },
    };

    const token = 
    {
        ArbitrumOne:
        {
            cyberCredit: "0x85Cf9E2fE7eEA7F362cfA940Cc4bfBb4D05e1D08",
            vegrb: "0x14C302dca44528A2B00B932AfdF01E9d48100B7b",
            grb: "0x5Fd71280b6385157b291b9962f22153FC9E79000",
        },

        ArbitrumGoerli:
        {
            cyberCredit: "0xA55cb2d81E01773866F300C3d1c6fD7574Cfa245",
            vegrb: "0xD912cca034056115900F87C2DB8eF1a6B1a89143",
            grb: "0x570A6cFA0e11f0Db8594E6a74B9106d5F21151C0",
        },
        ArbitrumNova:
        {
            cyberCredit: "0x3C2A3AfDbA1f64A83Cfe9350769D401Fd22ef74D",
            vegrb: "",
            grb: "",
        },
    };

    const bridgeToNetwork = 
    {
        ArbitrumOne:
        {
            domainID: "3",
            resourceID: 
            {
                cyberCredit: "0x000000000000000000000085cf9e2fe7eea7f362cfa940cc4bfbb4d05e1d0800",
                vegrb: "",
                grb: ""
            }
        },

        ArbitrumGoerli:
        {
            domainID: "1",
            resourceID: 
            {
                cyberCredit: "0x000000000000000000000085cf9e2fe7eea7f362cfa940cc4bfbb4d05e1d0800",
                vegrb: "",
                grb: ""
            }
        },

        ArbitrumNova:
        {
            domainID: "2",
            resourceID: 
            {
                cyberCredit: "0x000000000000000000000085cf9e2fe7eea7f362cfa940cc4bfbb4d05e1d0800",
                vegrb: "",
                grb: ""
            }
        },
    }

    return {
        init: function(options)
        {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
        },

        GetNetworkByNetworkName(chainName)
        {
            return network[chainName];
        },

        GetChainIdByNetworkNameToRead(chainName)
        {
            return network[chainName].chainId;
        },

        GetContractAddressByNetworkName(chainName)
        {
            return contract[chainName];
        },

        GetERC20HandleAddressByNetworkName(chainName)
        {
            return contract[chainName].erc20Handle;
        },

        GetTokenAddressByNetworkName(chainName, tokenName)
        {
            return token[chainName][tokenName];
        },

        GetBridgeToNetworkByNetworkName(chainName)
        {
            return bridgeToNetwork[chainName];
        }
        
    }
}(jQuery));