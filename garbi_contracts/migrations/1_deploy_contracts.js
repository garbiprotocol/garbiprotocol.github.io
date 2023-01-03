
const GRB = artifacts.require("GRB");
const GRBProxy = artifacts.require("GRBProxy");
const GarbiSwapPool = artifacts.require("GarbiSwapPool");

module.exports = function(deployer) {
  // deployer.deploy(GRB, "1250000000000000000000000", "500000000000000000000000");
  deployer.deploy(GRBProxy, "0x21B0940D8c33e9464eE775Bf24537423746A2507");
  // deployer.deploy(GarbiSwapPool, "0x6ac7b107e0eea2db04aaac9e0eae7eda8c3e9d57", "0x940dFF7Edbc24FbB683a8d002eCbA6C0a62cCc75", "LP Token", "LP");
};
