
const GarbiFarmGRBWETH = artifacts.require("GarbiFarmGRBWETH");
const GarbiFarmDAIUSDC = artifacts.require("GarbiFarmDAIUSDC");
const GarbiFarmUSDTUSDC = artifacts.require("GarbiFarmUSDTUSDC");

const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";

const GRBWETHLP = "0x644434ccba741b2892485e857e60f332264f3ab8";
const pidOfMiningGRBWETH = 1;

const DAIUSDCLP = "0x644434ccba741b2892485e857e60f332264f3ab8";
const pidOfMiningDAIUSDC = 0;

const USDTUSDCLP = "0x644434ccba741b2892485e857e60f332264f3ab8";
const pidOfMiningUSDTUSDC = 0;

module.exports = function(deployer) {
    deployer.deploy(GarbiFarmGRBWETH, GarbiMining, GRBWETHLP, pidOfMiningGRBWETH);
    //deployer.deploy(GarbiFarmDAIUSDC, GarbiMining, DAIUSDCLP, pidOfMiningDAIUSDC);
    //deployer.deploy(GarbiFarmUSDTUSDC, GarbiMining, USDTUSDCLP, pidOfMiningUSDTUSDC);
};
