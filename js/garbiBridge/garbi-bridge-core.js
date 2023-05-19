$.GARBI_BRIDGE = function() {};
$.GARBI_BRIDGE.prototype = (function()
{
    var setting = {
        chainId: 56,
    };

    return {
        init: function(options)
        {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },

        LoadData()
        {
            let self = this;
            try 
            {
                self.SwichNetworkDeposit();
                return self.ReloadData();
            }
            catch (e) 
            {
                return self.ReloadData();
            }
        },

        ReloadData()
        {
            let self = this;
            setTimeout(function() {
                self.LoadData();
            }, 5000);
        },

        async Bridge()
        {
            let self = this;
            let user = self.GetWalletAddress();
            let selectNetwork = self.GetNameNetworkDeposit();
            let selectToken = self.GetNameTokenBridge();
            
            let amountInputBridge = self.GetAmountInputBridge();
            if(amountInputBridge == '') return;

            let allowanceToErc20Handle = await self.GetAllowanceOfERC20Handle(selectNetwork, selectToken);
            
            if(allowanceToErc20Handle/1e18 < amountInputBridge)
            {
                self.ApproveTokenDepositToERC20Handle(selectNetwork, selectToken);
            }

            let bridgePair = garbiBridgeConfig.GetBridgePairByNetworkName(selectNetwork);
            let destinationDomainID = bridgePair.destinationDomainID;
            let resourceID = bridgePair.resourceID[selectToken];

            let dataDeposit = self.ConvertDataDepositToBytes(amountInputBridge, user);
            
            let contractConfig = garbiBridgeConfig.GetContractAddressByNetworkName(selectNetwork);
            let brideContractAddress = contractConfig.bridgeContract;
            let bridgeAbi = garbiBridgeAbi.GetBridgeContractABI();

            let brideContractAction = contractBaseHelper.getMainContract(brideContractAddress, bridgeAbi);

            brideContractAction.methods.deposit(destinationDomainID, resourceID, dataDeposit)
            .send({from: user, value: 0})
            .on('transactionHash', (hash) => {
                coreHelper.showPopup('confirm-popup');
                $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            })
            .on('receipt', (receipt) => {
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);

                console.log(receipt);
            })
            .on('error', (err, receipt) => {
                console.log(err);
            });
        },

        async GetAllowanceOfERC20Handle(chainName, tokenName)
        {
            let self = this;
            let user = self.GetWalletAddress();
            let erc20HandleAddress = garbiBridgeConfig.GetERC20HandleAddressByNetworkName(chainName);
            let result = await self.GetAllowance(chainName, tokenName, user, erc20HandleAddress);
            return result;
        },

        async ApproveTokenDepositToERC20Handle(chainName, tokenName)
        {
            let self = this;
            let user = self.GetWalletAddress();
            let erc20HandleAddress = garbiBridgeConfig.GetERC20HandleAddressByNetworkName(chainName);

            self.ApproveERC20(chainName, tokenName, user, erc20HandleAddress);
        },

        async SwichNetworkDeposit()
        {   
            let self = this;
            let selectNetwork = self.GetNameNetworkDeposit();
            let networkDeposit = garbiBridgeConfig.GetNetworkByNetworkName(selectNetwork);

            let checkNetwork = await self.IsValidNode(networkDeposit.chainId);
            if(checkNetwork == false)
            {
                let provider = window.ethereum;
                let chainIdToHex = self.ConvertChainIdToHex(networkDeposit.chainId);
    
                let networkChain = 
                [{ 
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
    
                try
                {
                    await provider.request({ 
                        "method": 'wallet_addEthereumChain', 
                        "params": networkChain, 
                    });
                }
                catch(error)
                {
                    await web3.currentProvider.request(
                    {
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    }); 
                }
            }
        },

        GetWalletAddress()
        {
            let self = this;
            if(self.CheckConnected() == true)
            {
                return web3.currentProvider.selectedAddress;
            }
        },

        async GetAllowance(chainName, tokenName, owner, spender)
        {
            let self = this;
            let tokenAddress = garbiBridgeConfig.GetTokenAddressByNetworkName(chainName, tokenName);
            let tokenAbi = garbiBridgeAbi.GetERC20BaseABI();
            let chainId = await self.GetChainId();
            let contract = contractBaseHelper.getReadContract(tokenAddress, tokenAbi, chainId);

            let result = await contract.methods.allowance(owner, spender).call();

            return result;
        },

        async ApproveERC20(chainName, tokenName, owner, spender)
        {
            let self = this;
            let tokenAddress = garbiBridgeConfig.GetTokenAddressByNetworkName(chainName, tokenName);
            let tokenAbi = garbiBridgeAbi.GetERC20BaseABI();
            let amountDefault = coreHelper.getAmountAllow();
            let chainId = await self.GetChainId();

            let contract = contractBaseHelper.getMainContract(tokenAddress, tokenAbi, chainId);
            contract.methods.approve(spender, amountDefault)
            .send({from: owner})
            .on('transactionHash', (hash) => {
                coreHelper.showPopup('confirm-popup');
                $('.transaction-hash').attr("href", "https://arbiscan.io/tx/"+hash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            })
            .on('receipt', (receipt) => {
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            })
            .on('error', (err, receipt) => {
                console.log(err);
            });
        },

        GetNameNetworkDeposit()
        {
            return $('select[name=from]').val();
        },

        GetNameTokenBridge()
        {
            return "cyberCredit"; // get token option in UI; 
        },

        GetAmountInputBridge()
        {
            return $('input[name=amountIn]').val();
        },

        ConvertDataDepositToBytes(amount, recipient)
        {
            let self = this;
            const data = '0x' +
            ethers.utils.hexZeroPad(ethers.utils.bigNumberify(self.ExpandDecimals(amount)).toHexString(), 32).substr(2) +   
            ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +   
            recipient.substr(2);                   

            return data;

        },

        ExpandDecimals(amount, decimals = 18)
        {
            return ethers.utils.parseUnits(String(amount), String(decimals));
        },

        CheckConnected()
        {
            return web3.currentProvider.selectedAddress !== null ? true : false;
        },
        
        async IsValidNode(chainIdNetworkDeposit)
        {
            let self = this;
            let chainIdActive = await self.GetChainId();
            if(chainIdActive != chainIdNetworkDeposit) 
            {
                return false;
            }
            return true;
        },

        async GetChainId()
        {
            let chainId = await web3.currentProvider.request({ method: 'eth_chainId'});

            if(`${chainId.charAt(0)}${chainId.charAt(1)}` == '0x')
            {
                return parseInt(chainId.slice(2), 16);
            }
            else
            {
                return parseInt(chainId, 16);
            }
        },

        ConvertChainIdToHex(chainId)
        {
            return `0x${parseInt(chainId, 10).toString(16)}`;
        }

    }
}(jQuery));