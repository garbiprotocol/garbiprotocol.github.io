// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import './interfaces/IGarbiMining.sol';

contract GarbiFarmPixilSaga is ReentrancyGuard, Ownable {

    using SafeMath for uint256;
    
    IERC20 public want; // GRB
    
    uint256 public PLATFORM_FEE = 0;

    address public platformFundAddress;

    IGarbiMining public miningMachine;

    uint256 public pidOfMining;
    uint256 public totalShare = 0;
    mapping(address => uint256) public shareOf;

    mapping(bytes32 => TimeLock) public timeLockOf;

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

    event onDeposit(address _user, uint256 _amount);
    event onWithdraw(address _user, uint256 _amount);
    event onEmergencyWithdraw(address _user, uint256 _amount);

    event onQueuedTransactionsChangeAddress(string _functionName, string _fieldName, address _value);
    event onQueuedTransactionsChangeUint(string _functionName, string _fieldName, uint256 _value);
    event onCancelTransactions(string _functionName);

    constructor(
        IGarbiMining _miningMachine,
        IERC20 _want,
        uint256 _pidOfMining
        ) {
        want = _want;
        miningMachine = _miningMachine;
        pidOfMining = _pidOfMining;
        platformFundAddress = _msgSender();
    }

    function setDelay(uint delay_) public onlyOwner {
        require(delay_ >= MINIMUM_DELAY, "Timelock::setDelay: Delay must exceed minimum delay.");
        require(delay_ <= MAXIMUM_DELAY, "Timelock::setDelay: Delay must not exceed maximum delay.");

        delay = delay_;
    }

    function cancelTransactions(string memory _functionName) public onlyOwner {

        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];
        _timelock.queuedTransactions = false;

        emit onCancelTransactions(_functionName);
    }

    function queuedTransactionsChangeAddress(string memory _functionName, string memory _fieldName, address _newAddr) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];

        _timelock.addressOf[keccak256(abi.encode(_fieldName))] = _newAddr;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeAddress(_functionName, _fieldName, _newAddr);
    }

    function queuedTransactionsChangeUint(string memory _functionName, string memory _fieldName, uint256 _value) public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode(_functionName))];

        _timelock.uintOf[keccak256(abi.encode(_fieldName))] = _value;
        _timelock.queuedTransactions = true;
        _timelock.timeOfExecute = block.timestamp.add(delay);

        emit onQueuedTransactionsChangeUint(_functionName, _fieldName, _value);
    }

    function setMiningMachine() public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode('setMiningMachine'))];
        _validateTimelock(_timelock);
        require(_timelock.addressOf[keccak256(abi.encode('miningMachine'))] != address(0), "INVALID_ADDRESS");

        miningMachine = IGarbiMining(_timelock.addressOf[keccak256(abi.encode('miningMachine'))]);
        _timelock.queuedTransactions = false;
    }

    function setPlatformFee(uint256 _platformFee) public onlyOwner {
        PLATFORM_FEE = _platformFee;
    }

    function setPlatformFundAdress(address newAddress) public onlyOwner {
        platformFundAddress = newAddress;
    }

    function changeTokenAddress() public onlyOwner
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode('changeTokenAddress'))];

        _validateTimelock(_timelock);
    
        if (_timelock.addressOf[keccak256(abi.encode('want'))] != address(0)) {
            want = IERC20(_timelock.addressOf[keccak256(abi.encode('want'))]);
            delete _timelock.addressOf[keccak256(abi.encode('want'))];
        }
        _timelock.queuedTransactions = false;
    }

    function setPidOfMining() public onlyOwner 
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode('setPidOfMining'))];
        _validateTimelock(_timelock);
        require(_timelock.uintOf[keccak256(abi.encode('pidOfMining'))] > 0, "INVALID_AMOUNT");

        pidOfMining = _timelock.uintOf[keccak256(abi.encode('pidOfMining'))];
        _timelock.queuedTransactions = false;
    }

    function _validateTimelock(TimeLock storage _timelock) private view
    {
        require(_timelock.queuedTransactions == true, "Transaction hasn't been queued.");
        require(_timelock.timeOfExecute <= block.timestamp, "Transaction hasn't surpassed time lock.");
        require(_timelock.timeOfExecute.add(GRACE_PERIOD) >= block.timestamp, "Transaction is stale.");
    }

    function deposit(uint256 _wantAmt) external nonReentrant onlyOwner
    {
        require(_wantAmt > 0, 'INVALID_INPUT');
        require(want.balanceOf(msg.sender) >= _wantAmt, 'INVALID_INPUT');

        harvest(msg.sender);
    	want.transferFrom(msg.sender, address(this), _wantAmt);

        uint256 platformFee = _wantAmt.mul(PLATFORM_FEE).div(1000);
        want.transfer(platformFundAddress, platformFee);

        uint256 _wantAmtAfterFee = _wantAmt.sub(platformFee);

        shareOf[msg.sender] = shareOf[msg.sender].add(_wantAmtAfterFee);
        totalShare = totalShare.add(_wantAmtAfterFee);
        miningMachine.updateUser(pidOfMining, msg.sender);
        emit onDeposit(msg.sender, _wantAmt);

    }
    function withdraw(uint256 _wantAmt) external nonReentrant 
    {
        require(_wantAmt > 0, 'INVALID_INPUT');   
        harvest(msg.sender);

        uint256 _share = shareOf[msg.sender];
        require(_share >= _wantAmt, 'INVALID_AMOUNT_WITHDRAW');

        shareOf[msg.sender] = shareOf[msg.sender].sub(_wantAmt);
        totalShare = totalShare.sub(_wantAmt);
        uint256 _wantBal = want.balanceOf(address(this)); 
        if (_wantBal < _wantAmt) {
            _wantAmt = _wantBal;
        }
        want.transfer(msg.sender, _wantAmt);
        
        miningMachine.updateUser(pidOfMining, msg.sender);
    	// 
        emit onWithdraw(msg.sender, _wantAmt);
    }
    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw() public 
    {
        uint256 _share = shareOf[msg.sender];
        require(_share > 0, 'INVALID_AMOUNT');

        shareOf[msg.sender] = 0;
        totalShare = totalShare.sub(_share);
        uint256 _wantBal = want.balanceOf(address(this));
        if (_wantBal < _share) {
            _share = _wantBal;
        }

        want.transfer(msg.sender, _share);

        emit onEmergencyWithdraw(msg.sender, _share);
    }

    function harvest(address _user) public returns(uint256 _pendingVeGRB) { 
        return miningMachine.harvest(pidOfMining, _user);
    }

    function getData(
        address _user
    ) 
    public 
    view
    returns(
        uint256 miningSpeed_,
        uint256 userWantBal_, 
        uint256 totalMintPerDay_, 
        uint256 userETHBal_, 
        uint256 userGRBPending_, 
        uint256 userWantShare_,
        uint256 tvl_
    ) {
        userWantBal_ = want.balanceOf(_user);
        totalMintPerDay_ = miningMachine.getTotalMintPerDayOf(pidOfMining);

        miningSpeed_ = miningMachine.getMiningSpeedOf(pidOfMining);
        userETHBal_ = address(_user).balance;
        (userGRBPending_, , ) = miningMachine.getUserInfo(pidOfMining, _user);
        userWantShare_ = shareOf[_user];
        tvl_ = totalShare;
    } 
}