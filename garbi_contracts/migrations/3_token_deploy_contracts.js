
const GRB = artifacts.require("GRB");
const GRBProxy = artifacts.require("GRBProxy");
const veGRB = artifacts.require("veGRB");
const GDAI = artifacts.require("GDAI");
const GUSDC = artifacts.require("GUSDC");
const GUSDT = artifacts.require("GUSDT");

module.exports = function(deployer) {
    deployer.deploy(GDAI, "1000000000000000000000000", "500000000000000000000000");
    deployer.deploy(GUSDC, "1000000000000", "500000000000");
    deployer.deploy(GUSDT, "1000000000000", "500000000000");
    deployer.deploy(GRB, "1250000000000000000000000", "500000000000000000000000").then(function() {
        return deployer.deploy(GRBProxy, GRB.address);
    });
    deployer.deploy(veGRB, "1250000000000000000000000", "500000000000000000000000");
};
