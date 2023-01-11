
const GarbiswapWhitelist = artifacts.require("GarbiswapWhitelist");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const GarbiswapFeeMachine = artifacts.require("GarbiswapFeeMachine");
const GarbiTreasury = artifacts.require("GarbiTreasury");
const GarbiOracle = artifacts.require("GarbiOracle");

const GRB = "0xcec9df0B33dC03b7a0ebEca5Aa06f29A276723bE";
const performanceMachineContract = "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063";

module.exports = function(deployer) {
    deployer.deploy(GarbiswapWhitelist);
    deployer.deploy(GarbiOracle);
    deployer.deploy(GarbiTimeLock).then(function(){
        return  deployer.deploy(GarbiswapFeeMachine, 
                        GRB, 
                        performanceMachineContract, 
                        performanceMachineContract, 
                        GarbiTimeLock.address
                ).then(function() {
                    return deployer.deploy(GarbiTreasury, GRB, GarbiTimeLock.address);
                });
    });
};
