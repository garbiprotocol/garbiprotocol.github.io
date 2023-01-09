// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GarbiTimeLock is Ownable {

	using SafeMath for uint256;
	
    mapping(address => mapping(bytes32 => TimeLock)) public timeLockOf;

    uint public constant GRACE_PERIOD = 30 days;
    uint public constant MINIMUM_DELAY = 2 days;
    uint public constant MAXIMUM_DELAY = 30 days;
    uint public delay;

    struct TimeLock {
        bool queuedTransactions;
        uint256 timeOfExecute;
        mapping(bytes32 => address) addressOf;
        mapping(bytes32 => uint256) uintOf;
    }

    event onQueuedTransactionsChangeAddress(address _contractCall, string _functionName, string _fieldName, address _value);
    event onQueuedTransactionsChangeUint(address _contractCall, string _functionName, string _fieldName, uint256 _value);
    event onCancelTransactions(address _contractCall, string _functionName);

    function setDelay(uint delay_) public onlyOwner {
        require(delay_ >= MINIMUM_DELAY, "Timelock::setDelay: Delay must exceed minimum delay.");
        require(delay_ <= MAXIMUM_DELAY, "Timelock::setDelay: Delay must not exceed maximum delay.");

        delay = delay_;
    }

    function cancelTransactions(address _contractCall, string memory _functionName) public onlyOwner {

        TimeLock storage _timelock = timeLockOf[_contractCall][keccak256(abi.encode(_functionName))];
        _timelock.queuedTransactions = false;

        emit onCancelTransactions(_contractCall, _functionName);
    }

    function queuedTransactionsChangeAddress(address _contractCall, string memory _functionName, string memory _fieldName, address _newAddr) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[_contractCall][keccak256(abi.encode(_functionName))];

        _timelock.addressOf[keccak256(abi.encode(_fieldName))] = _newAddr;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeAddress(_contractCall, _functionName, _fieldName, _newAddr);
    }

    function queuedTransactionsChangeUint(address _contractCall, string memory _functionName, string memory _fieldName, uint256 _value) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[_contractCall][keccak256(abi.encode(_functionName))];

        _timelock.uintOf[keccak256(abi.encode(_fieldName))] = _value;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeUint(_contractCall, _functionName, _fieldName, _value);
    }
   
    function doneTransactions(string memory _functionName) public {

        TimeLock storage _timelock = timeLockOf[msg.sender][keccak256(abi.encode(_functionName))];

        require(_timelock.queuedTransactions == true, "Transaction hasn't been queued.");

        _timelock.queuedTransactions = false;
    }

    /**
    * _typeOfField: 1: address, 2: uint
    */
    function clearFieldValue(string memory _functionName, string memory _fieldName, uint8 _typeOfField) public {
        TimeLock storage _timelock = timeLockOf[msg.sender][keccak256(abi.encode(_functionName))];

        require(_timelock.queuedTransactions == true, "Transaction hasn't been queued.");

        if (_typeOfField == 1) {
            delete _timelock.addressOf[keccak256(abi.encode(_fieldName))];
        } else if (_typeOfField == 2) {
            delete _timelock.uintOf[keccak256(abi.encode(_fieldName))];
        }
    }

    function getAddressChangeOnTimeLock(address _contractCall, string memory _functionName, string memory _fieldName) public view returns(address) {
        return timeLockOf[_contractCall][keccak256(abi.encode(_functionName))].addressOf[keccak256(abi.encode(_fieldName))];
    }

    function getUintChangeOnTimeLock(address _contractCall, string memory _functionName, string memory _fieldName) public view returns(uint256) {
        return timeLockOf[_contractCall][keccak256(abi.encode(_functionName))].uintOf[keccak256(abi.encode(_fieldName))];
    }

    function isQueuedTransaction(address _contractCall, string memory _functionName) public view returns(bool)
    {
        TimeLock storage _timelock = timeLockOf[_contractCall][keccak256(abi.encode(_functionName))];

        require(_timelock.queuedTransactions == true, "Transaction hasn't been queued.");
        require(_timelock.timeOfExecute <= block.timestamp, "Transaction hasn't surpassed time lock.");
        require(_timelock.timeOfExecute.add(GRACE_PERIOD) >= block.timestamp, "Transaction is stale.");

        return true;
    }
}