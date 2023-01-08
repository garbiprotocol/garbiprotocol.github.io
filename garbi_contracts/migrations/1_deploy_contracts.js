
const GRB = artifacts.require("GRB");
const GRBProxy = artifacts.require("GRBProxy");
const GDAI = artifacts.require("GDAI");
const GUSDC = artifacts.require("GUSDC");

module.exports = function(deployer) {
    deployer.deploy(GDAI, "1000000000000000000000000", "500000000000000000000000");
    deployer.deploy(GUSDC, "1000000000000000000000000", "500000000000000000000000");
    //deployer.deploy(GRBProxy, "0x5fd71280b6385157b291b9962f22153fc9e79000");
};
