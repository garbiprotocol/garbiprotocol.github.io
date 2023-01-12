// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IGarbiTimeLock.sol';

contract GarbiTreasury is Ownable {

    using SafeMath for uint256;

    IERC20 public GRB;
    address public miningMachine;
    IGarbiTimeLock public garbiTimeLockContract;

    modifier onlyMiningMachine()
    {
        require(_msgSender() == miningMachine, 'INVALID_PERMISSION');
        _;
    }

    constructor(
        IERC20 _grb,
        IGarbiTimeLock _garbiTimeLockContract
    ) {
        GRB = _grb;
        garbiTimeLockContract = _garbiTimeLockContract;
    }

    function mint(address _user, uint256 _amount) external onlyMiningMachine {
        require(_amount <= GRB.balanceOf(address(this)), "INVALID_AMOUNT");
        GRB.transfer(_user, _amount);
    }

    function setMiningMachineContract() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setMiningMachineContract'), "INVALID_PERMISSION");

        address _miningMachineContract = garbiTimeLockContract.getAddressChangeOnTimeLock(address(this), 'setMiningMachineContract', 'miningMachineContract');

        require(_miningMachineContract != address(0), "INVALID_ADDRESS");

        miningMachine = _miningMachineContract;

        garbiTimeLockContract.clearFieldValue('setMiningMachineContract', 'miningMachineContract', 1);
        garbiTimeLockContract.doneTransactions('setMiningMachineContract');
    }

}