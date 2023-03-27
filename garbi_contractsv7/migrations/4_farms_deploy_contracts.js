const GarbiFarmUniV3 = artifacts.require("GarbiFarmUniV3");

//production

//end production

//testnet
const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";

const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";

const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
//
const GEC = "0x965782738c1acca851104444bda0a03ee68355dc";

const wantNFT = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const uniswapV3Pool = "0x0eb4f2f731aa14b63ac8b6ec65eaec6ca8799117";
const pidOfMiningNFT = 20;
const positionManager = "0x622e4726a167799826d1e1d150b076a7725f5d81";
const token0 = "0xd1eB8a5798E04703ec5324c99405F581BD6318b8";
const token1 = "0xE0EcA46EA3308E8184e3b462b8A722F93A8F6F27";
const tickLower = -115140;
const tickUpper = -46080;
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
