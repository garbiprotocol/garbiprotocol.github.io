/**
 * import abi.js
 * import config.js
 * import base.contract.js
 * import core.js
 * init options {chainId, pid}
 * 
 * NOTE:
 *   + Calling the function in a single page does not need to pass the parameter chainId, pid
 */

$.GARBI_FARM_V2 = function() {};
$.GARBI_FARM_V2.prototype = (function() {
    var setting = {
        chainId: null,
        pid: null,
    }
    var GRBPrice = 0;
    var GRB_TOKEN_DECIMAL = 18;

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            GRBPrice = configHelper.getPriceByTokenName(setting.chainId, 'grb');
            this.updateGRBPrice();

        },

        // async test() {
        //     let user = "0x47b24C4Fea7FB4fc55b6102181E9c0EB8223b9f4";

        //     // let resultApproveWantToFarmContract = this.ApproveWantToFarmContract(user);
        //     // console.log(resultApproveWantToFarmContract);

        //     // let resultGetAllowanceWantToFarmContract = await this.GetAllowanceWantToFarmContract(user);
        //     // console.log(resultGetAllowanceWantToFarmContract);

        //     // let resultAllowanceERC20 = await this.GetAllowanceERC20("weth", user, "0xE4FEA722e459C8598bD1f8Aed3F02D950E47974C");
        //     // console.log(resultAllowanceERC20);

        //     // let resultApproveERC20 = await this.ApproveERC20("weth", user, "0xE4FEA722e459C8598bD1f8Aed3F02D950E47974C");
        //     // console.log(resultApproveERC20);

        //     let dataUser = await this.GetDataUser(user);
        //     console.log(dataUser);

        //     // let resultDeposit = await this.Deposit(user, "1000000000000");
        //     // console.log(resultDeposit);

        //     // let resultHarvest = await this.Harvest(user);
        //     // console.log(resultHarvest);

        //     // let resultWithdraw = await this.Withdraw(user, "975000000000");
        //     // console.log(resultWithdraw);
        // },

        async updateGRBPrice() {
            let self = this;
            let apiLink = "https://api.coingecko.com/api/v3/simple/price?ids=garbi-protocol%2Cethereum&vs_currencies=usd";
            $.get(apiLink, function(data) {
                GRBPrice = data["garbi-protocol"]["usd"];
            });
            setTimeout(function() {
                self.updateGRBPrice();
            }, 15000);
        },

        async GetAllowanceWantToFarmContract(user, chainId, pid) {
            chainId = this.VerifyChainId(chainId);
            pid = this.VerifyPid(pid);

            let contractConfig = await this.ValidateContractFarmByPid(chainId, pid, `Pid ${pid}} not configured in chainId[${chainId}].farms`);
            let tokenNameOfWant = configHelper.getTokenNameByAddress(chainId, contractConfig.want);
            return await this.GetAllowanceERC20(tokenNameOfWant, user, contractConfig.contract);
        },

        async ApproveWantToFarmContract(user, chainId, pid) {
            chainId = this.VerifyChainId(chainId);
            pid = this.VerifyPid(pid);

            let contractConfig = await this.ValidateContractFarmByPid(chainId, pid, `Pid ${pid}} not configured in chainId[${chainId}].farms`);
            let tokenNameOfWant = configHelper.getTokenNameByAddress(chainId, contractConfig.want);
            return await this.ApproveERC20(tokenNameOfWant, user, contractConfig.contract);
        },

        async GetDataUser(user, chainId, pid) {
            let contractAction = await this.GetContractFarmActionToReadData(chainId, pid);
            let result = await contractAction.methods.getData(user).call();
            let wantToken = await this.GetTokenWantOfFarmContractByPid(chainId, pid);
            let data = {};
            data["miningSpeed"] = parseInt(result["miningSpeed_"]);
            data["userGRBPending"] = coreHelper.parseFloatNumber(parseInt(result["userGRBPending_"]) / (10 ** GRB_TOKEN_DECIMAL), GRB_TOKEN_DECIMAL);
            data["totalMintPerDay"] = coreHelper.parseFloatNumber(parseInt(result["totalMintPerDay_"]) / (10 ** GRB_TOKEN_DECIMAL), GRB_TOKEN_DECIMAL);
            data["totalWantShare"] = coreHelper.parseFloatNumber(parseInt(result["tvl_"]) / (10 ** wantToken.wantDecimal), wantToken.wantDecimal);
            data["userWantBal"] = coreHelper.parseFloatNumber(parseInt(result["userWantBal_"]) / (10 ** wantToken.wantDecimal), wantToken.wantDecimal);
            data["userWantShare"] = coreHelper.parseFloatNumber(parseInt(result["userWantShare_"]) / (10 ** wantToken.wantDecimal), wantToken.wantDecimal);
            data["userWantShareBigInt"] = result["userWantShare_"];
            data["userETHBal"] = coreHelper.parseFloatNumber(parseInt(result["userETHBal_"]) / (10 ** 18), 18);

            // Calculate TVL and APY
            data["tvl"] = data["totalWantShare"] * wantToken.price;
            if (data["tvl"] > 0) {
                data["grbRewardAPY"] = data["totalMintPerDay"] * GRBPrice * 36500 / (data["tvl"]);
            }
            data["apy"] = data["grbRewardAPY"];
            return data;
        },

        async Deposit(user, amount, chainId, pid) {
            let contractAction = await this.GetContractFarmActionToMain(chainId, pid);
            return await contractAction.methods.deposit(amount).send({ from: user });
        },

        async Harvest(user, chainId, pid) {
            let contractAction = await this.GetContractFarmActionToMain(chainId, pid);
            return await contractAction.methods.harvest(user).send({ from: user })
                .on('transactionHash', (hash) => {
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", "https://arbiscan.io/tx/" + hash);
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

        async Withdraw(user, amount, chainId, pid) {
            let contractAction = await this.GetContractFarmActionToMain(chainId, pid);
            return await contractAction.methods.withdraw(amount).send({ from: user })
                .on('transactionHash', (hash) => {
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", "https://arbiscan.io/tx/" + hash);
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

        async GetAllowanceERC20(tokenName, owner, spender, chainId) {
            let contractAction = await this.GetTokenActionToReadData(tokenName, chainId);

            let result = await contractAction.methods.allowance(owner, spender).call();

            return result;
        },

        async ApproveERC20(tokenName, owner, spender, chainId) {
            let amountDefault = coreHelper.getAmountAllow();

            let contractAction = await this.GetTokenActionToMain(tokenName, chainId);

            return await contractAction.methods.approve(spender, amountDefault).send({ from: owner })
                .on('transactionHash', (hash) => {
                    coreHelper.showPopup('confirm-popup');
                    $('.transaction-hash').attr("href", "https://arbiscan.io/tx/" + hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {

                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);
                })
                .on('receipt', (receipt) => {
                    $('.btn-approve').hide();
                    coreHelper.hidePopup('confirm-popup', 0);
                    coreHelper.showPopup('success-confirm-popup');
                    coreHelper.hidePopup('success-confirm-popup', 10000);
                })
                .on('error', (err, receipt) => {
                    console.log(err);
                });
        },

        async GetContractFarmActionToReadData(chainId, pid) {

            chainId = this.VerifyChainId(chainId);
            pid = this.VerifyPid(pid);

            let contractConfig = this.ValidateContractFarmByPid(chainId, pid, `Pid ${pid}} not configured in chainId[${chainId}].farms`);
            let contractAddress = contractConfig.contract;
            let contractAbi = abiHelper.getGarbiFarmPoolABI();
            let contractAction = contractBaseHelper.getReadContract(contractAddress, contractAbi, chainId);
            return contractAction;
        },

        async GetContractFarmActionToMain(chainId, pid) {

            chainId = this.VerifyChainId(chainId);
            pid = this.VerifyPid(pid);

            let contractConfig = this.ValidateContractFarmByPid(chainId, pid, `Pid ${pid}} not configured in chainId[${chainId}].farms`);
            let contractAddress = contractConfig.contract;
            let contractAbi = abiHelper.getGarbiFarmPoolABI();
            let contractAction = contractBaseHelper.getMainContract(contractAddress, contractAbi);
            return contractAction;
        },

        async GetTokenWantOfFarmContractByPid(chainId, pid) {
            chainId = this.VerifyChainId(chainId);
            pid = this.VerifyPid(pid);

            let contractConfig = this.ValidateContractFarmByPid(chainId, pid, `Pid ${pid}} not configured in chainId[${chainId}].farms`);
            let data = {}
            data.wantAddress = contractConfig.want;
            data.wantDecimal = contractConfig.wantDecimal;
            data.price = contractConfig.price;
            return data;
        },

        async GetTokenActionToReadData(tokenName, chainId) {
            chainId = this.VerifyChainId(chainId);

            let tokenAddress = this.ValidateTokenAddressByTokenName(tokenName, chainId, `Token ${tokenName} not configured in chainId[${chainId}]`);
            let tokenAbi = abiHelper.getERC20ABI();

            let contractAction = contractBaseHelper.getReadContract(tokenAddress, tokenAbi, chainId);
            return contractAction;
        },

        async GetTokenActionToMain(tokenName, chainId) {
            chainId = this.VerifyChainId(chainId);

            let tokenAddress = this.ValidateTokenAddressByTokenName(tokenName, chainId, `Token ${tokenName} not configured in chainId[${chainId}]`);
            let tokenAbi = abiHelper.getERC20ABI();

            let contractAction = contractBaseHelper.getMainContract(tokenAddress, tokenAbi);
            return contractAction;
        },

        VerifyChainId(chainId) {
            chainId = (chainId == undefined) ? setting.chainId : chainId;
            if (chainId == undefined) throw new Error("Invalid chainId");
            return chainId;
        },

        VerifyPid(pid) {
            pid = (pid == undefined) ? setting.pid : pid;
            if (pid == undefined) throw new Error("Invalid pid");
            return pid;
        },

        ValidateTokenAddressByTokenName(tokenName, chainId, messege) {
            let tokenAddress = configHelper.getTokenByTokenName(chainId, tokenName);
            if (tokenAddress == undefined) throw new Error(messege);
            return tokenAddress;
        },

        ValidateContractFarmByPid(chainId, pid, messege) {
            let contractConfig = configHelper.getFarmContractByPid(chainId, pid);
            if (contractConfig == undefined) throw new Error(messege);
            return contractConfig;
        },
    }

}(jQuery));