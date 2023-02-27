$(document).ready(function() {
    forceCurrentAddresstoEthereum();
});

async function forceCurrentAddresstoEthereum() {
    if (!window)
        return null;
    if (!window.ethereum)
        return null;
    if (window.ethereum.selectedAddress == '')
        return null;
    var currentAddress = await window.ethereum.request({ method: 'eth_accounts' });
    window.ethereum.selectedAddress = currentAddress[0];
}
