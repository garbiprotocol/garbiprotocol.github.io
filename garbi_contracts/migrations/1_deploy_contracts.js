
const GRB = artifacts.require("GRB");

module.exports = function(deployer) {
  deployer.deploy(GRB, "1250000000000000000000000", "500000000000000000000000");
};
