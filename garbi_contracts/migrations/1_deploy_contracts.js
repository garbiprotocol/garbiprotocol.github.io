
const GRB = artifacts.require("GRB");
const GRBProxy = artifacts.require("GRBProxy");
const GDAI = artifacts.require("GDAI");
const GUSDC = artifacts.require("GUSDC");
const GarbiswapWhitelist = artifacts.require("GarbiswapWhitelist");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const GarbiswapTradeDAIUSDC = artifacts.require("GarbiswapTradeDAIUSDC");
const GarbiswapFeeMachine = artifacts.require("GarbiswapFeeMachine");
const GarbiTreasury = artifacts.require("GarbiTreasury");
const GarbiOracle = artifacts.require("GarbiOracle");

module.exports = function(deployer) {
//    deployer.deploy(GDAI, "1000000000000000000000000", "500000000000000000000000");
    //deployer.deploy(GUSDC, "1000000000000", "500000000000");
    //deployer.deploy(GRB, "1250000000000000000000000", "500000000000000000000000");
    //deployer.deploy(GarbiswapWhitelist);
    //deployer.deploy(GarbiTimeLock);
    //deployer.deploy(GRBProxy, "0x5fd71280b6385157b291b9962f22153fc9e79000");
    deployer.deploy(GarbiswapTradeDAIUSDC, 
                    "0x71978b56d8753f17bb05f7c9e4b98421cee1396e", 
                    "0x5922517b49d04f7128c9901b2c3ffd932e62def5",
                    "0xa1aa773bd288a269d83db99e43d8bad6d8c9d2a0",
                    "0x567b583b661a5b10e972028a62a594126aea7c9a",
                    "0xb1bd1210711cc2cfb864dd3828d66eff843c7015",
                    "0x81f44bcb3682479cc5d356b96eee6cd496bf5769",
                    "Garbiswap sLP Token",
                    "GsLP"
                    );
//      deployer.deploy(GarbiswapFeeMachine, 
//                        "0xcec9df0B33dC03b7a0ebEca5Aa06f29A276723bE", 
//                        "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063", 
//                        "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063", 
//                        "0xa1aa773bd288a269d83db99e43d8bad6d8c9d2a0"
//                        );
    //deployer.deploy(GarbiTreasury, "0x5Fd71280b6385157b291b9962f22153FC9E79000", "0x82e0455e55ee4e8a773db7de60114a1bb6e495bb");
    //deployer.deploy(GarbiOracle);
};
