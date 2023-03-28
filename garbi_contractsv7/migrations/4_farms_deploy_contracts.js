const GarbiFarmUniV3 = artifacts.require("GarbiFarmUniV3");

//production
const GarbiMining = "0x440d472c70e1b0ae98f8e3553980b0926cad928c";

const wantNFT = "0xc36442b4a4522e871399cd717abdd847ab11fe88";
const uniswapV3Pool = "0x91d98bc270b1c74c0511f19eb17931d7e200ca0b";
const pidOfMiningNFT = 13;
const positionManager = "0xc36442b4a4522e871399cd717abdd847ab11fe88";
const token0 = "0x5fd71280b6385157b291b9962f22153fc9e79000";
const token1 = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
const tickLower = -115140;
const tickUpper = -46080;
//end production

//testnet
//const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";
//
//const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
//
//const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
////
//const GEC = "0x965782738c1acca851104444bda0a03ee68355dc";
//
//const wantNFT = "0x622e4726a167799826d1e1d150b076a7725f5d81";
//const uniswapV3Pool = "0x0eb4f2f731aa14b63ac8b6ec65eaec6ca8799117";
//const pidOfMiningNFT = 21;
//const positionManager = "0x622e4726a167799826d1e1d150b076a7725f5d81";
//const token0 = "0xd1eB8a5798E04703ec5324c99405F581BD6318b8";
//const token1 = "0xE0EcA46EA3308E8184e3b462b8A722F93A8F6F27";
//const tickLower = -115140;
//const tickUpper = -46080;
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
