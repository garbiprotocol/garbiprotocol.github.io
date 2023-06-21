const GarbiFarmGRBWETH = artifacts.require("GarbiFarmGRBWETH");
const GarbiFarmDAIUSDC = artifacts.require("GarbiFarmDAIUSDC");
const GarbiFarmUSDTUSDC = artifacts.require("GarbiFarmUSDTUSDC");
const GarbiFarmSingleWETH = artifacts.require("GarbiFarmSingleWETH");
const GarbiFarmSingleWETHBridge = artifacts.require("GarbiFarmSingleWETHBridge");
const GarbiFarmSingleERC20Bridge = artifacts.require("GarbiFarmSingleERC20Bridge");
const GarbiFarmSingleWBTC = artifacts.require("GarbiFarmSingleWBTC");
const GarbiFarmGEC = artifacts.require("GarbiFarmGEC");
const GarbiStakeGRB = artifacts.require("GarbiStakeGRB");
const GarbiFarmPixilSaga = artifacts.require("GarbiFarmPixilSaga");
// const MockETHHandle = artifacts.require("MockETHHandle");
// const Test = artifacts.require("Test");

//production
// const GarbiMining = "0x440d472c70e1b0ae98f8e3553980b0926cad928c";

// const GRBWETHLP = "0x26cf5ba5b29f23f20fa82ba684f15e1eb5bf4874";
// const pidOfMiningGRBWETH = 5;

// const USDTUSDCLP = "0x3d5ddde5b8790cc294d03433bbe9cad194c002a5";
// const pidOfMiningUSDTUSDC = 1;

// const DAIUSDCLP = "0x4685befdc633a4067e65d422520e99c34c09b4d2";
// const pidOfMiningDAIUSDC = 2;

// // const WETH = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
// const pidOfMiningSingleWETH = 3;

// const WBTC = "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f";
// const pidOfMiningSingleWBTC = 4;

// const GRB = "0x5Fd71280b6385157b291b9962f22153FC9E79000";

// const pidOfMiningSingleGRB1week = 6;
// const blockToUnlock1week = 5760 * 7; //1 week

// const pidOfMiningSingleGRB1month = 7;
// const blockToUnlock1month = 5760 * 30; //1 month

// const pidOfMiningSingleGRB1year = 8;
// const blockToUnlock1year = 5760 * 365; //1 year

// const veGRB = "0x14c302dca44528a2b00b932afdf01e9d48100b7b";
// const pidOfMiningSingleVeGRB1week = 9;
// const pidOfMiningSingleVeGRB1month = 10;
// const pidOfMiningSingleVeGRB1year = 11;

// const GEC = "0x5eba4d078a28578d24aa536f70448d507e1cc78e";
// const pidOfMiningGEC = 12;
//end production
//testnet arbitrum goerli
const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";
//
//const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
//const pidOfMiningSingleGRB = 9;
//const blockToUnlock = 5760*365; //1 week
//
//const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
//const pidOfMiningSingleVeGRB = 12;
//const blockToUnlockVeGRB = 5760*365; //1 week
////
//const GEC = "0x965782738c1acca851104444bda0a03ee68355dc";
//const pidOfMiningGEC = 13;

const WETH = "0xe39ab88f8a4777030a534146a9ca3b52bd5d43a3";
const ETHHandle = "0x8AAbe98da8Fd219C1f9bd9f04d7b62c4fDDA2168";
const pidOfMiningSingleWETHBridge = 26;
//end testnet

// test in arbitrum nova
// const GarbiMining = "0xf139d03D4CD2f86c9a9a65a9558A1898aD1278DD";
// const WETH = "0x722E8BdD2ce80A4422E880164f2079488e115365";
// const MockETHHandle = "0xC4F2eDC6f1Bc6fD816D21Cb5c30ea4e81e6Bd148";

// const pidOfMiningSingleWETHBridge = 0;

// end test

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
    //    deployer.deploy(GarbiFarmGEC, GarbiMining, GEC, pidOfMiningGEC);
    //    deployer.deploy(GarbiFarmPixilSaga, GarbiMining, GRB, 15);
    deployer.deploy(GarbiFarmSingleWETHBridge, GarbiMining, WETH, pidOfMiningSingleWETHBridge);
    // deployer.deploy(MockETHHandle);
    // deployer.deploy(Test);
};