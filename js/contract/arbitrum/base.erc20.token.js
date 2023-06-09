$.BASE_ERC20_TOKEN = function() {};
$.BASE_ERC20_TOKEN.prototype = (function() {
    var setting = {
        chainId: null,
        tokenAddress: null,
        tokenAbi: null,
    };

    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },

        // Read contract
        async allowance(owner, spender) {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.allowance(owner, spender).call();
        },

        async balanceOf(account) {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.balanceOf(account).call();
        },

        async decimals() {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.decimals().call();
        },

        async name() {
            let contractAction = await this.GetTokenActionToReadData();
            return await contractAction.methods.name().call();
        },

        async owner() {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.owner().call();
        },

        async symbol() {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.symbol().call();
        },

        async totalSupply() {
            let contractAction = await this.GetTokenActionToReadData()
            return await contractAction.methods.totalSupply().call();
        },

        // Write contract
        async approve(caller, spender, amount) {
            let contractAction = await this.GetTokenActionToMain();

            return await contractAction.methods.approve(spender, amount).send({ from: caller });
        },

        async transfer(caller, to, amount) {
            let contractAction = await this.GetTokenActionToMain();

            return await contractAction.methods.approve(to, amount).send({ from: caller });
        },

        async transferFrom(caller, from, to, amount) {
            let contractAction = await this.GetTokenActionToMain();

            return await contractAction.methods.approve(from, to, amount).send({ from: caller });
        },

        async GetTokenActionToReadData() {
            let chainId = this.VerifyChainId();
            let tokenAddress = this.VerifyTokenAddress();
            let tokenAbi = this.VerifyTokenAbi();
            let contractAction = contractBaseHelper.getReadContract(tokenAddress, tokenAbi, chainId);
            return contractAction;
        },

        async GetTokenActionToMain() {
            let tokenAddress = this.VerifyTokenAddress();
            let tokenAbi = this.VerifyTokenAbi();
            let contractAction = contractBaseHelper.getMainContract(tokenAddress, tokenAbi);
            return contractAction;
        },

        VerifyChainId() {
            let chainId = setting.chainId;
            if (chainId == undefined) throw new Error("ERC20: Invalid chainId");
            return chainId;
        },

        VerifyTokenAddress() {
            let tokenAddress = setting.tokenAddress;
            if (tokenAddress == undefined) throw new Error("ERC20: Invalid tokenAddress");
            return tokenAddress;
        },

        VerifyTokenAbi() {
            let tokenAbi = setting.tokenAbi;
            if (tokenAbi == undefined) throw new Error("ERC20: Invalid tokenAbi");
            return tokenAbi;
        },
    }
}(jQuery))