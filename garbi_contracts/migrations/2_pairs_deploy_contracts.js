const GarbiswapTradeDAIUSDC = artifacts.require("GarbiswapTradeDAIUSDC");
const GarbiswapTradeUSDTUSDC = artifacts.require("GarbiswapTradeUSDTUSDC");
const GarbiswapTradeGRBWETH = artifacts.require("GarbiswapTradeGRBWETH");
const GarbiswapTradeMachine = artifacts.require("GarbiswapTradeMachine");

const USDC = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
const DAI = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
const USDT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
const GRB = "0x5Fd71280b6385157b291b9962f22153FC9E79000";
const WETH = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
const GarbiswapWhitelist = "0xf4a4d3906d49ea542b82ec03f973202c485da7fc";
const GarbiTimeLock = "0xb9f4b946d73b7a414e45875e4e38f066d29dfdb1";
const GarbiswapFeeMachine = "0x4e2669fdc10037a554c65892c69118cea5b453c0";
const GarbiOracle = "0x686e28c4ee8c4c03770404506e0027bf5ed31ab6";
const veGRB = "0x14c302dca44528a2b00b932afdf01e9d48100b7b";

module.exports = function(deployer) {
    //    deployer.deploy(GarbiswapTradeDAIUSDC, 
    //                    USDC, 
    //                    DAI,
    //                    GarbiTimeLock,
    //                    GarbiswapFeeMachine,
    //                    GarbiswapWhitelist,
    //                    GarbiOracle,
    //                    "Garbiswap sLP Token",
    //                    "GarbiSLP"
    //                    );
    //    deployer.deploy(GarbiswapTradeUSDTUSDC, 
    //                    USDC, 
    //                    USDT,
    //                    GarbiTimeLock,
    //                    GarbiswapFeeMachine,
    //                    GarbiswapWhitelist,
    //                    GarbiOracle,
    //                    "Garbiswap sLP Token",
    //                    "GarbiSLP"
    //                    );
    // deployer.deploy(GarbiswapTradeGRBWETH, 
    //                 WETH, 
    //                 GRB,
    //                 GarbiTimeLock,
    //                 GarbiswapFeeMachine,
    //                 GarbiswapWhitelist,
    //                 "Garbiswap GLP Token",
    //                 "GarbiLP"
    //                 );
    //    deployer.deploy(GarbiswapTradeMachine, 
    //                    veGRB, 
    //                    GarbiswapWhitelist
    //                    );
};