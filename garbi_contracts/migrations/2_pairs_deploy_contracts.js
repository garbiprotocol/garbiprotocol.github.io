

const GarbiswapTradeDAIUSDC = artifacts.require("GarbiswapTradeDAIUSDC");

const USDC = "0x71978b56d8753f17bb05f7c9e4b98421cee1396e";
const DAI = "0x5922517b49d04f7128c9901b2c3ffd932e62def5";
const GarbiswapWhitelist = "0xb1bd1210711cc2cfb864dd3828d66eff843c7015";
const GarbiTimeLock = "0xa1aa773bd288a269d83db99e43d8bad6d8c9d2a0";
const GarbiswapFeeMachine = "0x567b583b661a5b10e972028a62a594126aea7c9a";
const GarbiOracle = "0x81f44bcb3682479cc5d356b96eee6cd496bf5769";

module.exports = function(deployer) {
    deployer.deploy(GarbiswapTradeDAIUSDC, 
                    USDC, 
                    DAI,
                    GarbiTimeLock,
                    GarbiswapFeeMachine,
                    GarbiswapWhitelist,
                    GarbiOracle,
                    "Garbiswap sLP Token",
                    "GsLP"
                    );
};
