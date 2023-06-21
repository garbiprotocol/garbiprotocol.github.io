// check chain id to switch network
$('.switch-network-btn').click(function () {
    networkHelper.SwichNetworkByChainId(chainId);
    CheckChainId();
    async function CheckChainId () {
        let curChainId = await networkHelper.GetChainIdToMain();
        if (curChainId != chainId) {
            $('.alert-banner').show();
            setTimeout(() => {
                CheckChainId();
            }, 1000);
        }
        else {
            $('.alert-banner').hide();
        }
    }           
});