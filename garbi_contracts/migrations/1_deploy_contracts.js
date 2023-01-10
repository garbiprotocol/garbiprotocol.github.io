
const GRB = artifacts.require("GRB");
const GRBProxy = artifacts.require("GRBProxy");
const GDAI = artifacts.require("GDAI");
const GUSDC = artifacts.require("GUSDC");
const GarbiswapWhitelist = artifacts.require("GarbiswapWhitelist");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const GarbiswapTradeUSDTUSDC = artifacts.require("GarbiswapTradeUSDTUSDC");
const GarbiswapFeeMachine = artifacts.require("GarbiswapFeeMachine");
const GarbiTreasury = artifacts.require("GarbiTreasury");

module.exports = function(deployer) {
//    deployer.deploy(GDAI, "1000000000000000000000000", "500000000000000000000000");
//    deployer.deploy(GUSDC, "1000000000000000000000000", "500000000000000000000000");
    //deployer.deploy(GRB, "1250000000000000000000000", "500000000000000000000000");
//    deployer.deploy(GarbiswapWhitelist);
    //deployer.deploy(GarbiTimeLock);
    //deployer.deploy(GRBProxy, "0x5fd71280b6385157b291b9962f22153fc9e79000");
//    deployer.deploy(GarbiswapTradeUSDTUSDC, 
//                    "0x0230d6666c78122345cdb57b321e89734a9bd6ad", 
//                    "0xa70fc215b7ef35090eeae3011c4d6175b6de5057",
//                    "0x281d627da075b0681fd484768cb7e15984a51322",
//                    "0x97ac0481d8efce7cba1964ebb839d2929110d66e",
//                    "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063",
//                    "0xbf03e87ebb3abc3d943b6fae179958fc54ea2a1f",
//                    "Garbiswap LP Token",
//                    "GLP"
//                    );
    //deployer.deploy(GarbiswapFeeMachine, "0x1c1dbaf3e6ee6bfe530a08e1ef3b287e6846ec03", "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063", "0x632414bbF1C1DE108Aec3Ff3B716ace89e582063", "0x281d627da075b0681fd484768cb7e15984a51322");
    deployer.deploy(GarbiTreasury, "0x5Fd71280b6385157b291b9962f22153FC9E79000", "0x82e0455e55ee4e8a773db7de60114a1bb6e495bb");
};
