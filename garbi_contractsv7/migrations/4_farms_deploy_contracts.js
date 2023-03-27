const GarbiFarmUniV3 = artifacts.require("GarbiFarmUniV3");

//production

//end production

//testnet
const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";

const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
const pidOfMiningSingleGRB = 9;
const blockToUnlock = 5760*365; //1 week

const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
const pidOfMiningSingleVeGRB = 12;
const blockToUnlockVeGRB = 5760*365; //1 week
//
const GEC = "0x965782738c1acca851104444bda0a03ee68355dc";
const pidOfMiningGEC = 13;

const wantNFT = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const uniswapV3Pool = "0x7f930f1f571264271ff8abf587f6b34a79c963e2";
const pidOfMiningNFT = 17;
const positionManager = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const token0 = "0x29680bd5f3f324001add9229d6b44615353f554c";
const token1 = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
const tickLower = "267180";
const tickUpper = "283260";
//end testnet

module.exports = function(deployer) {
//    deployer.deploy(GarbiFarmGRBWETH, GarbiMining, GRBWETHLP, pidOfMiningGRBWETH);
//    deployer.deploy(GarbiFarmDAIUSDC, GarbiMining, DAIUSDCLP, pidOfMiningDAIUSDC);
//    deployer.deploy(GarbiFarmUSDTUSDC, GarbiMining, USDTUSDCLP, pidOfMiningUSDTUSDC);
//    deployer.deploy(GarbiFarmSingleWETH, GarbiMining, WETH, pidOfMiningSingleWETH);
//    deployer.deploy(GarbiFarmSingleWBTC, GarbiMining, WBTC, pidOfMiningSingleWBTC);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, GRB, pidOfMiningSingleGRB1week, blockToUnlock1week);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, GRB, pidOfMiningSingleGRB1month, blockToUnlock1month);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, GRB, pidOfMiningSingleGRB1year, blockToUnlock1year);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, veGRB, pidOfMiningSingleVeGRB1week, blockToUnlock1week);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, veGRB, pidOfMiningSingleVeGRB1month, blockToUnlock1month);
//    deployer.deploy(GarbiStakeGRB, GarbiMining, veGRB, pidOfMiningSingleVeGRB1year, blockToUnlock1year);
    deployer.deploy(GarbiFarmUniV3, GarbiMining, wantNFT, uniswapV3Pool, pidOfMiningNFT, positionManager, token0, token1, tickLower, tickUpper);
};
