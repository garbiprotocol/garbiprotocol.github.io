
const GarbiswapTradeInfo = artifacts.require("GarbiswapTradeInfo");
const BalanceInfo = artifacts.require("BalanceInfo");
const AllowTransferInfo = artifacts.require("AllowTransferInfo");

module.exports = function(deployer) {
    deployer.deploy(BalanceInfo);
    deployer.deploy(GarbiswapTradeInfo);
    deployer.deploy(AllowTransferInfo);
};
