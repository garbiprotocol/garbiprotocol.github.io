// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

import './interfaces/IGarbiMining.sol';

contract GarbiFarmUniV3 is IERC721Receiver, ReentrancyGuard, Ownable {

    using SafeMath for uint256;
    uint256 public version = 100;
    
    IERC721 public want; // GRBWETH UNI V3 NFT

    address public token0; //GRB
    address public token1; //WETH

    INonfungiblePositionManager public positionManager;

    IUniswapV3Pool public uniswapV3Pool;

    int24 public poolTickLower;
    int24 public poolTickUpper;
    
    mapping(address => uint256) public userInfoTokenId;

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

    event onDeposit(address _user, uint256 tokenId);
    event onWithdraw(address _user, uint256 tokenId);

    event onQueuedTransactionsChangeAddress(string _functionName, string _fieldName, address _value);
    event onQueuedTransactionsChangeUint(string _functionName, string _fieldName, uint256 _value);
    event onCancelTransactions(string _functionName);

    constructor(
        IGarbiMining _miningMachine,
        IERC721 _want,
        address _uniswapV3Pool,
        uint256 _pidOfMining,
        address _positionManager,
        address _token0,
        address _token1,
        int24 _tickLower, 
        int24 _tickUpper
        ) {
        want = _want;
        miningMachine = _miningMachine;
        uniswapV3Pool = IUniswapV3Pool(_uniswapV3Pool);
        pidOfMining = _pidOfMining;
        positionManager = INonfungiblePositionManager(_positionManager);
        token0 = _token0;
        token1 = _token1;
        poolTickLower = _tickLower;
        poolTickUpper = _tickUpper;
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

    function changeTokenAddress() public onlyOwner
    {
        TimeLock storage _timelock = timeLockOf[keccak256(abi.encode('changeTokenAddress'))];

        _validateTimelock(_timelock);
    
        if (_timelock.addressOf[keccak256(abi.encode('want'))] != address(0)) {
            want = IERC721(_timelock.addressOf[keccak256(abi.encode('want'))]);
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

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        // Return the expected value to indicate that the transfer was handled successfully.
        return this.onERC721Received.selector;
    }


    function deposit(uint256 tokenId) external nonReentrant 
    {
        require(tokenId > 0, 'INVALID_INPUT');
        require(want.ownerOf(tokenId) == msg.sender, 'INVALID_INPUT');
        require(userInfoTokenId[msg.sender] == 0, 'NEED_WITHDRAW_TOKEN_ID');
        (, , , , , int24 tickLower , int24 tickUpper , uint128 liquidity, , , , ) = positionManager.positions(tokenId);
        require(tickLower >= poolTickLower && tickUpper <= poolTickUpper, 'INVALID_PRICE_RANGE');

        harvest(msg.sender);
    	want.safeTransferFrom(msg.sender, address(this), tokenId);
        userInfoTokenId[msg.sender] = tokenId;
        
        uint256 wantAmt = liquidity;
        shareOf[msg.sender] = shareOf[msg.sender].add(wantAmt);
        totalShare = totalShare.add(wantAmt);
        miningMachine.updateUser(pidOfMining, msg.sender);
        emit onDeposit(msg.sender, tokenId);

    }
    function withdraw() external nonReentrant 
    {
        require(userInfoTokenId[msg.sender] != 0, 'NO_TOKEN_ID_TO_WITHDRAW');
        harvest(msg.sender);

        uint256 _share = shareOf[msg.sender];
        shareOf[msg.sender] = 0;
        totalShare = totalShare.sub(_share);
        
        uint256 tokenId = userInfoTokenId[msg.sender];
        want.safeTransferFrom(address(this), msg.sender, tokenId);
        userInfoTokenId[msg.sender] = 0;

        miningMachine.updateUser(pidOfMining, msg.sender);
        emit onWithdraw(msg.sender, tokenId);
    }

    function harvest(address _user) public returns(uint256 _pendingVeGRB) {
        if(isCurrentPriceInRange()) {
            return miningMachine.harvest(pidOfMining, _user);
        }
        else {
            return 0;
        }
    }

    function isCurrentPriceInRange() public view returns (bool) {
        // Get the current price (square root price) from the Uniswap v3 pool
        (uint160 sqrtPriceX96, , , , , , ) = uniswapV3Pool.slot0();

        // Convert the tickLower and tickUpper to their corresponding square root prices
        uint160 sqrtPriceLowerX96 = TickMath.getSqrtRatioAtTick(poolTickLower);
        uint160 sqrtPriceUpperX96 = TickMath.getSqrtRatioAtTick(poolTickUpper);

        // Check if the current price is within the tick range
        return sqrtPriceX96 >= sqrtPriceLowerX96 && sqrtPriceX96 < sqrtPriceUpperX96;
    }

    function getData(
        address _user
    ) 
    public 
    view
    returns(
        uint256 miningSpeed_,
        uint256 totalMintPerDay_, 
        uint256 userGRBPending_, 
        uint256 tvl_,
        uint256 tokenId
    ) {
        if(isCurrentPriceInRange()) {
            (userGRBPending_, , ) = miningMachine.getUserInfo(pidOfMining, _user);
            totalMintPerDay_ = miningMachine.getTotalMintPerDayOf(pidOfMining);
            miningSpeed_ = miningMachine.getMiningSpeedOf(pidOfMining);
        }
        else {
            userGRBPending_ = 0;
            totalMintPerDay_ = 0;
            miningSpeed_ = 0;
        }
        
        tvl_ = totalShare;
        tokenId = userInfoTokenId[msg.sender];
    } 
}