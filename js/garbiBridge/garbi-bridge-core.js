$.GARBI_BRIDGE = function() {};
$.GARBI_BRIDGE.prototype = (function() {
    var setting = {
        chainId: 56,
    };

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },

        async BridgeERC20(networkDeposit, networkRecieve, tokenDeposit, amountInputBridge) {
            let self = this;
            await self.Bridge(networkDeposit, networkRecieve, tokenDeposit, amountInputBridge, 0);
        },

        async BridgeETH(networkDeposit, networkRecieve, tokenDeposit, amountInputBridge) {
            let self = this;
            let valueETH = coreHelper.toBN(amountInputBridge, 18);
            await self.Bridge(networkDeposit, networkRecieve, tokenDeposit, amountInputBridge, valueETH);
        },

        async Bridge(networkDeposit, networkRecieve, tokenDeposit, amountInputBridge, valueETH) {
            let self = this;
            let user = self.GetWalletAddress();

            let bridgeFromNetwork = garbiBridgeConfig.GetBridgeToNetworkByNetworkName(networkDeposit);
            let resourceID = bridgeFromNetwork.resourceID[tokenDeposit];

            let bridgeToNetwork = garbiBridgeConfig.GetBridgeToNetworkByNetworkName(networkRecieve);
            let destinationDomainID = bridgeToNetwork.domainID;

            let dataDeposit = self.ConvertDataDepositToBytes(amountInputBridge, user);

            let contractConfig = garbiBridgeConfig.GetContractAddressByNetworkName(networkDeposit);
            let bridgeContractAddress = contractConfig.bridgeContract;
            let bridgeAbi = garbiBridgeAbi.GetBridgeContractABI();

            let brideContractAction = contractBaseHelper.getMainContract(bridgeContractAddress, bridgeAbi);

            brideContractAction.methods.deposit(destinationDomainID, resourceID, dataDeposit)
                .send({ from: user, value: valueETH })
                .on('transactionHash', (hash) => {
                    let blockExplorerUrl = garbiBridgeConfig.GetblockExplorerUrlsNetworkName(networkDeposit);
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", blockExplorerUrl + hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);
                })
                .on('receipt', (receipt) => {
                    $('#modal-bridge-popup').modal('show');
                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);

                    let depositNonce = receipt.events.Deposit.returnValues.depositNonce;
                    self.SyncEvent(networkRecieve, depositNonce);
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
        },

        async GetAllowanceOfTokenDepositToERC20Handle(chainName, tokenName) {
            let self = this;
            let user = self.GetWalletAddress();
            let erc20HandleAddress = garbiBridgeConfig.GetERC20HandleAddressByNetworkName(chainName);
            let result = await self.GetAllowance(chainName, tokenName, user, erc20HandleAddress);
            return result;
        },

        async ApproveTokenDepositToERC20Handle(chainName, tokenName) {
            let self = this;
            let user = self.GetWalletAddress();
            let erc20HandleAddress = garbiBridgeConfig.GetERC20HandleAddressByNetworkName(chainName);

            self.ApproveERC20(chainName, tokenName, user, erc20HandleAddress);
        },

        async GetAllowanceOfGRBToBridgeContract(chainName) {
            let self = this;
            let user = self.GetWalletAddress();
            let bridgeContract = garbiBridgeConfig.GetBridgeContractAddressByNetworkName(chainName);
            let result = await self.GetAllowance(chainName, 'grb', user, bridgeContract);
            return result;
        },

        async ApproveGRBToBridgeContract(chainName) {
            let self = this;
            let user = self.GetWalletAddress();
            let bridgeContract = garbiBridgeConfig.GetBridgeContractAddressByNetworkName(chainName);

            self.ApproveERC20(chainName, 'grb', user, bridgeContract);
        },

        async SwichNetworkDeposit(selectNetwork) {
            let self = this;
            let networkDeposit = garbiBridgeConfig.GetNetworkByNetworkName(selectNetwork);

            let checkNetwork = await self.IsValidNode(networkDeposit.chainId);
            if (checkNetwork == false) {
                let provider = window.ethereum;
                let chainIdToHex = self.ConvertChainIdToHex(networkDeposit.chainId);

                let networkChain = [{
                    "chainId": chainIdToHex,
                    "chainName": networkDeposit.chainName,
                    "nativeCurrency": {
                        "name": 'ETH',
                        "symbol": 'ETH',
                        "decimals": 18
                    },
                    "rpcUrls": networkDeposit.rpcList,
                    "blockExplorerUrls": networkDeposit.blockExplorerUrls,
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

        GetWalletAddress() {
            let self = this;
            if (self.CheckConnected() == true) {
                return web3.currentProvider.selectedAddress;
            }
        },

        async GetBalanceETH(chainName, user) {
            let network = garbiBridgeConfig.GetNetworkByNetworkName(chainName);
            let rpc = network.rpcList[0];
            let _web3 = new Web3(new Web3.providers.HttpProvider(rpc));
            let balanceETH = await _web3.eth.getBalance(user);

            return balanceETH;
        },

        async GetAllowance(chainName, tokenName, owner, spender) {
            let self = this;
            let tokenAddress = garbiBridgeConfig.GetTokenAddressByNetworkName(chainName, tokenName);
            let tokenAbi = garbiBridgeAbi.GetERC20BaseABI();
            let chainId = await self.GetChainIdToMain();
            let contract = contractBaseHelper.getReadContract(tokenAddress, tokenAbi, chainId);

            let result = await contract.methods.allowance(owner, spender).call();

            return result;
        },

        async GetBalance(chainName, tokenName, user) {
            let self = this;
            if (tokenName == "eth") {
                return await self.GetBalanceETH(chainName, user);
            }
            let chainId = garbiBridgeConfig.GetChainIdByNetworkNameToRead(chainName);
            let tokenAddress = garbiBridgeConfig.GetTokenAddressByNetworkName(chainName, tokenName);
            let tokenAbi = garbiBridgeAbi.GetERC20BaseABI();
            let contract = contractBaseHelper.getReadContract(tokenAddress, tokenAbi, chainId);

            let result = await contract.methods.balanceOf(user).call();
            return result;
        },

        async ApproveERC20(chainName, tokenName, owner, spender) {
            let self = this;
            let tokenAddress = garbiBridgeConfig.GetTokenAddressByNetworkName(chainName, tokenName);
            let tokenAbi = garbiBridgeAbi.GetERC20BaseABI();
            let amountDefault = coreHelper.getAmountAllow();
            let chainId = await self.GetChainIdToMain();

            let contract = contractBaseHelper.getMainContract(tokenAddress, tokenAbi, chainId);
            contract.methods.approve(spender, amountDefault)
                .send({ from: owner })
                .on('transactionHash', (hash) => {
                    let blockExplorerUrl = garbiBridgeConfig.GetblockExplorerUrlsNetworkName(chainName);
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", blockExplorerUrl + hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);
                })
                .on('receipt', (receipt) => {
                    $('.button-approve').hide();
                    $('.button-approve-grb').hide();
                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
        },

        async SyncEvent(chainName, depositNonce, fromBlock = null, tokenDeposit, amountInputBridge) {
            let eventName = "ProposalVote";
            let network = garbiBridgeConfig.GetNetworkByNetworkName(chainName);
            let rpc = network.rpcList[0];
            let _web3 = new Web3(new Web3.providers.HttpProvider(rpc));
            fromBlock = (fromBlock == null) ? await _web3.eth.getBlockNumber() : fromBlock;
            let latestBlock = await _web3.eth.getBlockNumber();

            let bridgeAbi = garbiBridgeAbi.GetBridgeContractABI();
            let contractConfig = garbiBridgeConfig.GetContractAddressByNetworkName(chainName);
            let bridgeContractAddress = contractConfig.bridgeContract;
            let bridgeContract = new _web3.eth.Contract(bridgeAbi, bridgeContractAddress);

            let data = {};

            let event = await bridgeContract.getPastEvents(eventName, {
                fromBlock: fromBlock,
                toBlock: latestBlock,
            });
            if (event.length > 0) {
                for (let index = 0; index < event.length; index++) {
                    const element = event[index];
                    if (depositNonce == element.returnValues.depositNonce) {
                        data[index] = {};
                        data.dataHash = element.returnValues.dataHash;
                        data.originDomainID = element.returnValues.originDomainID;

                        data[index].address = element.address;
                        data[index].transactionHash = element.transactionHash;
                        data[index].status = element.returnValues.status;

                        let proposal = await bridgeContract.methods.
                        getProposal(data.originDomainID, depositNonce, data.dataHash).call();
                        data.yesVotesTotal = proposal._yesVotesTotal;
                    }
                }
            }
            let totalYesVotesConfigContract = garbiBridgeConfig.GetTotalYesVotes();
            let totalYesVotesConfigUI = garbiBridgeConfig.GetTotalYesVotesUI();
            if (Object.keys(data).length == 0) {
                setTimeout(() => {
                    this.SyncEvent(chainName, depositNonce, latestBlock, tokenDeposit, amountInputBridge);
                }, 3000);
            } else {
                if (data.yesVotesTotal < totalYesVotesConfigContract) {
                    setTimeout(() => {
                        this.SyncEvent(chainName, depositNonce, latestBlock, tokenDeposit, amountInputBridge);
                    }, 3000);
                }

                // handle transaction hash

                // handle total vote UI
                let timestampPopupBridge = Math.floor(Date.now() / 1000);
                $('#modal-bridge-popup .timestampPopupBridge').text(timestampPopupBridge);

                $('#modal-bridge-popup .amountInputBridge').text(amountInputBridge.toString());

                $('#modal-bridge-popup .tokenDeposit').text(tokenDeposit.toString());

                let textYesTotalVotes = (data.yesVotesTotal == totalYesVotesConfigContract) ?
                    totalYesVotesConfigUI :
                    data.yesVotesTotal;
                $('#modal-bridge-popup .totalVoted').text(textYesTotalVotes);
                $('#modal-bridge-popup .totalYesVotesConfig').text(data.totalYesVotesConfigUI);
            }
        },


        ConvertDataDepositToBytes(amount, recipient) {
            let self = this;
            const data = '0x' +
                ethers.utils.hexZeroPad(ethers.utils.bigNumberify(self.ExpandDecimals(amount)).toHexString(), 32).substr(2) +
                ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2) / 2), 32).substr(2) +
                recipient.substr(2);

            return data;

        },

        ExpandDecimals(amount, decimals = 18) {
            return ethers.utils.parseUnits(String(amount), String(decimals));
        },

        CheckConnected() {
            return web3.currentProvider.selectedAddress !== null ? true : false;
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
        }

    }
}(jQuery));