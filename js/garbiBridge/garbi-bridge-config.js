$.GARBI_BRIDGE_CONFIG = function() {};
$.GARBI_BRIDGE_CONFIG.prototype = (function() {

    // test with erc20
    // const contract = {
    //     ArbitrumOne: {
    //         bridgeContract: "0xaab127696990703c922ad4ccdd5838799e6ba265",
    //         erc20Handle: "0x56ad41b541d1921e099c54ebf936987723b6cb5f",
    //         ethHandle: "",
    //     },

    //     ArbitrumGoerli: {
    //         bridgeContract: "0x86fddc8cf4e768b2534ed33841a0ad298cf9e9f0",
    //         erc20Handle: "0xd54d619470905440842bc87d6031694764381e1e",
    //         ethHandle: "",

    //     },
    //     ArbitrumNova: {
    //         bridgeContract: "0xa1aa773bd288a269d83db99e43d8bad6d8c9d2a0",
    //         erc20Handle: "0x07be47ca378a96a1ecadea815f5b5f3604fdbd69",
    //         ethHandle: "",
    //     },
    // };

    // test with eth
    const contract = {
        ArbitrumOne: {
            bridgeContract: "",
            erc20Handle: "",
            ethHandle: "",
            farm: {
                weth: ""
            }
        },

        ArbitrumGoerli: {
            bridgeContract: "0x8E45D454857F718592C71170e3aAc77b14Afef27",
            erc20Handle: "0xd54d619470905440842bc87d6031694764381e1e", // fake
            ethHandle: "0x8AAbe98da8Fd219C1f9bd9f04d7b62c4fDDA2168",
            farm: {
                weth: "0x5CD2E0Bd1f602270bF69A21616BcD3E9d852d526",
            }
        },
        ArbitrumNova: {
            bridgeContract: "0x1fa630ba932b618083010c48545e89574e213c9c",
            erc20Handle: "0x07be47ca378a96a1ecadea815f5b5f3604fdbd69", // fake
            ethHandle: "0x4b11029574004e4bc421df6fa13e83810d0c6147",
            farm: {
                weth: "0xb5DCD8cE4E2f390A263cf9EA90E8048c3F5e3D44",
            }
        },
    };

    const token = {
        ArbitrumOne: {
            cyberCredit: {
                address: "0x85Cf9E2fE7eEA7F362cfA940Cc4bfBb4D05e1D08",
                name: "Cyber Credit",
                tokenDecimal: 18,
                tokenSymbol: "CC",
            },
            vegrb: {
                address: "0x14C302dca44528A2B00B932AfdF01E9d48100B7b",
                name: "veGRB",
                tokenDecimal: 18,
                tokenSymbol: "veGRB",
            },
            grb: {
                address: "0x5Fd71280b6385157b291b9962f22153FC9E79000",
                name: "GarbiProtocol",
                tokenDecimal: 18,
                tokenSymbol: "GRB",
            },
            eth: {
                address: "0x0000000000000000000000000000000000000000",
                name: "Ethereum",
                tokenDecimal: 18,
                tokenSymbol: "ETH",
            },
            weth: {
                address: "",
                name: "WETH",
                tokenDecimal: 18,
                tokenSymbol: "WETH",
            }
        },

        ArbitrumGoerli: {
            cyberCredit: {
                address: "0xA55cb2d81E01773866F300C3d1c6fD7574Cfa245",
                name: "Cyber Credit",
                tokenDecimal: 18,
                tokenSymbol: "CC",
            },
            vegrb: {
                address: "0xD912cca034056115900F87C2DB8eF1a6B1a89143",
                name: "veGRB",
                tokenDecimal: 18,
                tokenSymbol: "veGRB",
            },
            grb: {
                address: "0xd1eB8a5798E04703ec5324c99405F581BD6318b8",
                name: "Garbi Protocol",
                tokenDecimal: 18,
                tokenSymbol: "GRB",
            },
            eth: {
                address: "0x0000000000000000000000000000000000000000",
                name: "Ethereum",
                tokenDecimal: 18,
                tokenSymbol: "ETH",
            },
            weth: {
                address: "0xe39ab88f8a4777030a534146a9ca3b52bd5d43a3",
                name: "WETH",
                tokenDecimal: 18,
                tokenSymbol: "WETH",
            }
        },
        ArbitrumNova: {
            cyberCredit: {
                address: "0x3C2A3AfDbA1f64A83Cfe9350769D401Fd22ef74D",
                name: "Cyber Credit",
                tokenDecimal: 18,
                tokenSymbol: "CC",
            },
            vegrb: {
                address: "",
                name: "veGRB",
                tokenDecimal: 18,
                tokenSymbol: "veGRB",
            },
            grb: {
                address: "0x90F72cC2BDFaf3aB5AC61a7f7b6759E25B844F1A",
                name: "GarbiProtocol",
                tokenDecimal: 18,
                tokenSymbol: "GRB",
            },
            eth: {
                address: "0x0000000000000000000000000000000000000000",
                name: "Ethereum",
                tokenDecimal: 18,
                tokenSymbol: "ETH",
            },
            weth: {
                address: "0x722E8BdD2ce80A4422E880164f2079488e115365",
                name: "WETH",
                tokenDecimal: 18,
                tokenSymbol: "WETH",
            },
        },
    };

    const bridgeToNetwork = {
        ArbitrumOne: {
            domainID: "3",
            resourceID: {
                cyberCredit: "0x000000000000000000000085cf9e2fe7eea7f362cfa940cc4bfbb4d05e1d0800",
                vegrb: "",
                grb: "",
                eth: "",
            }
        },

        ArbitrumGoerli: {
            domainID: "1",
            resourceID: {
                cyberCredit: "0x0000000000000000000000a55cb2d81e01773866f300c3d1c6fd7574cfa24500",
                vegrb: "",
                grb: "",
                eth: "0x000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab100"
            }
        },

        ArbitrumNova: {
            domainID: "2",
            resourceID: {
                cyberCredit: "0x0000000000000000000000a55cb2d81e01773866f300c3d1c6fd7574cfa24500",
                vegrb: "",
                grb: "",
                eth: "0x000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab100",
            }
        },
    };

    const relayerVotes = {
        relayers: ["0"],
        totalYesVotes: 2,
        totalYesVotesUI: 3,
    }

    // units: seconds
    const estimateTimeBridgeSuccess = {
        ArbitrumGoerli: {
            ArbitrumOne: 120,
            ArbitrumNova: 60,
        },
        ArbitrumNova: {
            ArbitrumOne: 120,
            ArbitrumGoerli: 120,
        },
        ArbitrumOne: {
            ArbitrumGoerli: 120,
            ArbitrumNova: 60,
        }
    }

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
        },

        GetContractAddressByNetworkName(chainName) {
            return contract[chainName];
        },

        GetERC20HandleAddressByNetworkName(chainName) {
            return contract[chainName].erc20Handle;
        },

        GetEETHandleAddressByNetworkName(chainName) {
            return contract[chainName].ethHandle;
        },

        GetBridgeContractAddressByNetworkName(chainName) {
            return contract[chainName].bridgeContract;
        },

        GetTokenAddressByNetworkName(chainName, tokenName) {
            return token[chainName][tokenName].address;
        },

        GetTokenNameByNetworkName(chainName, tokenName) {
            return token[chainName][tokenName].name;
        },

        GetTokenSymbolByNetworkName(chainName, tokenName) {
            return token[chainName][tokenName].tokenSymbol;
        },

        GetBridgeToNetworkByNetworkName(chainName) {
            return bridgeToNetwork[chainName];
        },

        GetUrlRpcByNetworkName(chainName) {
            let network = this.GetNetworkByNetworkName(chainName);
            let rpcList = network.rpcList;
            console.log(rpcList[0]);
            return rpcList[0];
        },

        GetTotalYesVotes() {
            return relayerVotes.totalYesVotes;
        },

        GetTotalYesVotesUI() {
            return relayerVotes.totalYesVotesUI;
        },

        GetEstimateTimeBridgeSuccess(chainNameFrom, chainNameTo) {
            return estimateTimeBridgeSuccess[chainNameFrom][chainNameTo];
        },

        GetFarmContractOfNetworkByPoolName(chainName, tokenName) {
            let contract = this.GetContractAddressByNetworkName(chainName);
            return contract.farm[tokenName];
        }

    }
}(jQuery));