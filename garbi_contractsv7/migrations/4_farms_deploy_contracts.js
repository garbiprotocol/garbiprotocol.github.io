
const GarbiFarmUniV3 = artifacts.require("GarbiFarmUniV3");

//production

//end production

//testnet
const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";
const want = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const uniswapV3Pool = "0x7f930F1f571264271Ff8Abf587F6b34a79C963e2";
const pid = "1";
const positionManager = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const token0 = "0x29680BD5F3f324001Add9229d6B44615353f554c";
const token1 = "0xd1eB8a5798E04703ec5324c99405F581BD6318b8";
const tickLower = "267180";
const tickUpper = "283260";
//end testnet

module.exports = function(deployer) {
    deployer.deploy(GarbiFarmUniV3, GarbiMining, want, uniswapV3Pool, pid, positionManager, token0, token1, tickLower, tickUpper);
};
