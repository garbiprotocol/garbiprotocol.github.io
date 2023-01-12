
const GarbiswapWhitelist = artifacts.require("GarbiswapWhitelist");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const GarbiswapFeeMachine = artifacts.require("GarbiswapFeeMachine");
const GarbiTreasury = artifacts.require("GarbiTreasury");
const GarbiOracle = artifacts.require("GarbiOracle");
const GarbiMining = artifacts.require("GarbiMining");


const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
const performanceMachineContract = "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063";
const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
const startBlock = 1;

module.exports = function(deployer) {
//    deployer.deploy(GarbiswapWhitelist);
//    deployer.deploy(GarbiOracle);
//    deployer.deploy(GarbiTimeLock).then(function(){
//        return  deployer.deploy(GarbiswapFeeMachine, 
//                        GRB, 
//                        performanceMachineContract, 
//                        performanceMachineContract, 
//                        GarbiTimeLock.address
//                ).then(function() {
//                    return deployer.deploy(GarbiTreasury, GRB, GarbiTimeLock.address);
//                });
//    });
//    deployer.deploy(GarbiMining, 
//                    veGRB, 
//                    startBlock
//                    );
};
