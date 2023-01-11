

const GarbiswapTradeDAIUSDC = artifacts.require("GarbiswapTradeDAIUSDC");
const GarbiswapTradeUSDTUSDC = artifacts.require("GarbiswapTradeUSDTUSDC");

const USDC = "0x29680bd5f3f324001add9229d6b44615353f554c";
const DAI = "0x9ce3c139316a560a57c861f558284cf31ebc8ace";
const USDT = "0x2E4e7eBfF934B6999BDc2983F17F6bd4b6A84206";
const GarbiswapWhitelist = "0x3bafB09Dd2Fe339021B812Ef230dB546d600479E";
const GarbiTimeLock = "0x3E0b1Ae5eDd611eb6b9E22C2ad737b8453e7682D";
const GarbiswapFeeMachine = "0xd122aAF318cB5Ab8c3583C05F1923AbfbA5D4d98";
const GarbiOracle = "0x0e1c16263C7A976bA3E47A9D7098a3085d1F1C16";

module.exports = function(deployer) {
//    deployer.deploy(GarbiswapTradeDAIUSDC, 
//                    USDC, 
//                    DAI,
//                    GarbiTimeLock,
//                    GarbiswapFeeMachine,
//                    GarbiswapWhitelist,
//                    GarbiOracle,
//                    "Garbiswap sLP Token",
//                    "GsLP"
//                    );
    deployer.deploy(GarbiswapTradeUSDTUSDC, 
                    USDC, 
                    USDT,
                    GarbiTimeLock,
                    GarbiswapFeeMachine,
                    GarbiswapWhitelist,
                    GarbiOracle,
                    "Garbiswap sLP Token",
                    "GsLP"
                    );
};
