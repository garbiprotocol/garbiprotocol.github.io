const GarbiStakeGRB = artifacts.require("GarbiStakeGRB");
const GarbiMining = artifacts.require("GarbiMining");
const veGRB = artifacts.require("veGRB");
const GRB = artifacts.require("GRB");

const truffleAssert = require("truffle-assertions");
const blockToUnlock = 2; //5 blocks

contract("GarbiStakeGRB", async (accounts) => {
  let instance;
  let garbiMiningInstance;
  let veGRBInstance;
  let GRBInstance;

  beforeEach(async () => {
    veGRBInstance = await veGRB.new("1250000000000000000000000");
    GRBInstance = await GRB.new("1250000000000000000000000", "1000");
    garbiMiningInstance = await GarbiMining.new(veGRBInstance.address, 1);
    await veGRBInstance.setMiningMachine(garbiMiningInstance.address);
    const pidOfMining = 0;
    instance = await GarbiStakeGRB.new(garbiMiningInstance.address, GRBInstance.address, pidOfMining, blockToUnlock);
    await garbiMiningInstance.queuedTransactionsChangeAddress("addPool", "grabiFarm", instance.address);
    await garbiMiningInstance.addPool(500, instance.address);
    
  });
  it("should deposit success", async () => {
    await GRBInstance.approve(instance.address, "1000");
    await instance.deposit("1000");
    const shareOf = await instance.shareOf(accounts[0]);
    const totalShare = await instance.totalShare();
    const balanceGRB = await GRBInstance.balanceOf(instance.address);
    assert.equal(shareOf, "1000", "shareOf failed");
    assert.equal(totalShare, "1000", "totalShare failed");
    assert.equal(balanceGRB, "1000", "balanceGRB failed");
  });
  it("should withdraw success after enough time", async () => {
    //deposit some tokens to the contract;
    await GRBInstance.approve(instance.address, "1000");
    await instance.deposit("1000");
    await sleep(2000*2); //wait 2 blocks
    await instance.withdraw("100");
    const balanceGRB = await GRBInstance.balanceOf(accounts[0]);
    assert.equal(balanceGRB, "100", "balanceGRB failed");
  });
  it("should withdraw fail if not enough time", async () => {
    //deposit some tokens to the contract;
    await GRBInstance.approve(instance.address, "1000");
    await instance.deposit("1000");
    await truffleAssert.fails(
      instance.withdraw("100"),
      "INVALID_BLOCK_TO_UNLOCK"
    );
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
