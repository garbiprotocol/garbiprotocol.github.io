
const GarbiFarmGRBWETH = artifacts.require("GarbiFarmGRBWETH");
const GarbiFarmDAIUSDC = artifacts.require("GarbiFarmDAIUSDC");
const GarbiFarmUSDTUSDC = artifacts.require("GarbiFarmUSDTUSDC");

const GarbiMining = "0xb63234acac10029eaebf63a0f28584cd096df62b";

const GRBWETHLP = "0x1914513cc76018f399e58ccc9b87be681423a9ce";
const pidOfMiningGRBWETH = 2;

const DAIUSDCLP = "0xb957d13250443706717d0d95cdb67e4a02650b6c";
const pidOfMiningDAIUSDC = 3;

const USDTUSDCLP = "0x644434ccba741b2892485e857e60f332264f3ab8";
const pidOfMiningUSDTUSDC = 4;

module.exports = function(deployer) {
    //deployer.deploy(GarbiFarmGRBWETH, GarbiMining, GRBWETHLP, pidOfMiningGRBWETH);
    deployer.deploy(GarbiFarmDAIUSDC, GarbiMining, DAIUSDCLP, pidOfMiningDAIUSDC);
    deployer.deploy(GarbiFarmUSDTUSDC, GarbiMining, USDTUSDCLP, pidOfMiningUSDTUSDC);
};
