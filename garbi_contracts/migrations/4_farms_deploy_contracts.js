
const GarbiFarmGRBWETH = artifacts.require("GarbiFarmGRBWETH");
const GarbiMining = artifacts.require("GarbiMining");

const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
const startBlock = 1;
const GRBWETHLP = "0x644434ccba741b2892485e857e60f332264f3ab8";
const pidOfMining = 0;

module.exports = function(deployer) {
    deployer.deploy(GarbiMining, 
                    veGRB, 
                    startBlock
                    ).then(function() {
                        return deployer.deploy(GarbiFarmGRBWETH, GarbiMining.address, GRBWETHLP, pidOfMining);
                    });
};
