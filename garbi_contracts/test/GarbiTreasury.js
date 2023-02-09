const GarbiTreasury = artifacts.require("GarbiTreasury");
const GRB = artifacts.require("GRB");
const GarbiTimeLock = artifacts.require("GarbiTimeLock");
const truffleAssert = require("truffle-assertions");

contract("GarbiTreasury", async (accounts) => {
  let instance;
  let GRBInstance;
  let garbiTimeLockInstance;

  beforeEach(async () => {
    GRBInstance = await GRB.new("1250000000000000000000000", "0");
    garbiTimeLockInstance = await GarbiTimeLock.new();
    instance = await GarbiTreasury.new(GRBInstance.address, garbiTimeLockInstance.address);
    
    // Set the mining machine address in the garbiTimeLock contract
    await garbiTimeLockInstance.queuedTransactionsChangeAddress(instance.address, 'setMiningMachineContract', 'miningMachineContract', accounts[1]);
    await instance.setMiningMachineContract();
  });

  it("should mint tokens for a user", async () => {
    await GRBInstance.mint(instance.address, 100);
    const miningMachine = accounts[1];
    await instance.mint(accounts[0], 50, { from: miningMachine });
    const balance = await GRBInstance.balanceOf(accounts[0]);
    assert.equal(balance, 50, "Minting failed");
  });

  it("should fail to mint tokens if the caller is not the mining machine", async () => {
    await GRBInstance.mint(instance.address, 100);
    await truffleAssert.fails(
      instance.mint(accounts[1], 50, { from: accounts[0] }),
      "INVALID_PERMISSION"
    );
  });

  it("should fail to mint tokens if the amount is greater than the balance", async () => {
    await GRBInstance.mint(instance.address, 100);
    await truffleAssert.fails(
      instance.mint(accounts[1], 150, { from: accounts[1] }),
      "INVALID_AMOUNT"
    );
  });
  
  it("should fail if setMiningMachineContract is calling not from owner", async () => {
    await garbiTimeLockInstance.queuedTransactionsChangeAddress(instance.address, 'setMiningMachineContract', 'miningMachineContract', accounts[1]);
    await truffleAssert.fails(
      instance.setMiningMachineContract({ from: accounts[1] }),
      "Ownable: caller is not the owner"
    );
  });
  
  it("should success setMiningMachineContract if caller is owner", async () => {
    await garbiTimeLockInstance.queuedTransactionsChangeAddress(instance.address, 'setMiningMachineContract', 'miningMachineContract', accounts[9]);
    await instance.setMiningMachineContract({ from: accounts[0] });
    const miningMachine = await instance.miningMachine();
    assert.equal(miningMachine, accounts[9], "setMiningMachineContract failed");
  });
});
