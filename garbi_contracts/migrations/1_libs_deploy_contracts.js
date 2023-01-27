
const GarbiswapWhitelist = artifacts.require("GarbiswapWhitelist");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const GarbiswapFeeMachine = artifacts.require("GarbiswapFeeMachine");
const GarbiTreasury = artifacts.require("GarbiTreasury");
const GarbiOracle = artifacts.require("GarbiOracle");
const GarbiMining = artifacts.require("GarbiMining");
const GarbiPlatformFund = artifacts.require("GarbiPlatformFund");
const GarbiPerformanceFund = artifacts.require("GarbiPerformanceFund");
const GarbiVestGRB = artifacts.require("GarbiVestGRB");

//production
//const GRB = "0x5Fd71280b6385157b291b9962f22153FC9E79000";
//const performanceMachineContract = "0xd9d820dd337fa2da2edef1ee240cc236dbc23359";
//const veGRB = "0x14c302dca44528a2b00b932afdf01e9d48100b7b";
//end production
//testnet
const GRB = "0xd1eb8a5798e04703ec5324c99405f581bd6318b8";
const veGRB = "0xcf7d3a1ff5188a0d398cf8181b8bdc051204f8da";
const GarbiTimeLockAddress = "0x3e0b1ae5edd611eb6b9e22c2ad737b8453e7682d";
const GarbiswapWhitelistAddress = "0x3bafb09dd2fe339021b812ef230db546d600479e";
//end testnet
const startBlock = 1;

module.exports = function(deployer) {
//    deployer.deploy(GarbiTimeLock).then(function(){
//        return  deployer.deploy(GarbiswapFeeMachine, 
//                        veGRB, 
//                        performanceMachineContract, 
//                        performanceMachineContract, 
//                        GarbiTimeLock.address
//                ).then(function() {
//                    //return deployer.deploy(GarbiTreasury, GRB, GarbiTimeLock.address);
//                });
//    });
//    deployer.deploy(GarbiMining, 
//                    veGRB, 
//                    startBlock
//                    );
//    deployer.deploy(GarbiPerformanceFund);
//    deployer.deploy(GarbiPlatformFund);
//    deployer.deploy(GarbiswapWhitelist);
//    deployer.deploy(GarbiOracle);
    deployer.deploy(GarbiVestGRB,
                    GRB,
                    veGRB, 
                    GarbiswapWhitelistAddress,
                    GarbiTimeLockAddress,
                    );        
};
