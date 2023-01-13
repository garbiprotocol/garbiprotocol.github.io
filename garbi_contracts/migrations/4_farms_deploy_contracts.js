
const GarbiFarmGRBWETH = artifacts.require("GarbiFarmGRBWETH");
const GarbiFarmDAIUSDC = artifacts.require("GarbiFarmDAIUSDC");
const GarbiFarmUSDTUSDC = artifacts.require("GarbiFarmUSDTUSDC");

const GarbiMining = "0x440d472c70e1b0ae98f8e3553980b0926cad928c";

const GRBWETHLP = "0xb68b1c9a7dc9a437d6ee597ae31d80005206a919";
const pidOfMiningGRBWETH = 0;

const DAIUSDCLP = "0x4685befdc633a4067e65d422520e99c34c09b4d2";
const pidOfMiningDAIUSDC = 1;

const USDTUSDCLP = "0x3d5ddde5b8790cc294d03433bbe9cad194c002a5";
const pidOfMiningUSDTUSDC = 2;

module.exports = function(deployer) {
    deployer.deploy(GarbiFarmGRBWETH, GarbiMining, GRBWETHLP, pidOfMiningGRBWETH);
    deployer.deploy(GarbiFarmDAIUSDC, GarbiMining, DAIUSDCLP, pidOfMiningDAIUSDC);
    deployer.deploy(GarbiFarmUSDTUSDC, GarbiMining, USDTUSDCLP, pidOfMiningUSDTUSDC);
};
