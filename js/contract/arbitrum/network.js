$.GARBI_NETWORK = function() {};
$.GARBI_NETWORK.prototype = (function() {
    const network = {
        ArbitrumOne: {
            chainId: 42161,
            chainName: "Arbitrum One",
            currencySymbol: "ETH",
            rpcList: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io/tx/']

        },

        ArbitrumGoerli: {
            chainId: 421613,
            chainName: "Arbitrum Goerli",
            currencySymbol: "ETH",
            rpcList: ['https://goerli-rollup.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://goerli.arbiscan.io/tx/'],
        },

        ArbitrumNova: {
            chainId: 42170,
            chainName: "Arbitrum Nova",
            currencySymbol: "ETH",
            rpcList: ['https://nova.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://nova.arbiscan.io/tx/'],
        }
    };

    return {
        GetNetworkByNetworkName(chainName) {
            return network[chainName];
        },

        GetChainIdByNetworkNameToRead(chainName) {
            return network[chainName].chainId;
        },

        GetNetworkByChainId(chainId) {
            let lengthNetworkConfig = Object.keys(network).length;
            for (let i = 0; i < lengthNetworkConfig; i++) {
                if (chainId == Object.values(network)[i].chainId) {
                    return (Object.values(network)[i]);
                }
            }
            throw new Error(`ChainId ${chainId} is not config`);
        },

        CheckConnected() {
            return web3.currentProvider.selectedAddress !== null ? true : false;
        },

        async SwichNetworkByChainId(chainId) {
            let network = this.GetNetworkByChainId(chainId);
            await this.SwichNetwork(network);
        },

        async SwichNetworkByChainName(chainName) {
            let network = this.GetNetworkByNetworkName(chainName);
            await this.SwichNetwork(network);
        },

        async SwichNetwork(selectNetwork) {

            let checkNetwork = await this.IsValidNode(selectNetwork.chainId);
            if (checkNetwork == false) {
                let provider = window.ethereum;
                let chainIdToHex = this.ConvertChainIdToHex(selectNetwork.chainId);

                let networkChain = [{
                    "chainId": chainIdToHex,
                    "chainName": selectNetwork.chainName,
                    "nativeCurrency": {
                        "name": 'ETH',
                        "symbol": 'ETH',
                        "decimals": 18
                    },
                    "rpcUrls": selectNetwork.rpcList,
                    "blockExplorerUrls": selectNetwork.blockExplorerUrls,
                }];

                try {
                    await provider.request({
                        "method": 'wallet_addEthereumChain',
                        "params": networkChain,
                    });
                } catch (error) {
                    await web3.currentProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    });
                }
            }
        },

        async IsValidNode(chainIdNetworkDeposit) {
            let self = this;
            let chainIdActive = await self.GetChainIdToMain();
            if (chainIdActive != chainIdNetworkDeposit) {
                return false;
            }
            return true;
        },

        async GetChainIdToMain() {
            let chainId = await web3.currentProvider.request({ method: 'eth_chainId' });

            if (`${chainId.charAt(0)}${chainId.charAt(1)}` == '0x') {
                return parseInt(chainId.slice(2), 16);
            } else {
                return parseInt(chainId, 16);
            }
        },

        ConvertChainIdToHex(chainId) {
            return `0x${parseInt(chainId, 10).toString(16)}`;
        },

        GetblockExplorerUrlsNetworkName(chainName) {
            return network[chainName].blockExplorerUrls;
        },

        GetblockExplorerUrlsNetworkId(chainId) {
            let network = this.GetNetworkByChainId(chainId);
            return network.blockExplorerUrls;
        },
    }
}(jQuery))