// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IGarbiTimeLock.sol';

contract ISwapTrade {
    uint256 public TRADE_FEE; //0.1% 1/1000
} 

contract GarbiswapFeeMachine is Ownable{
    
    using SafeMath for uint256;

    IERC20 public GRB;
    
    address public performanceMachineContract; // the contract will use fee to Buy GARBI on pancakeswap , then burn
    address public safuFundContract;

    IGarbiTimeLock public garbiTimeLockContract;

    uint256 public PERFORMANCE_FEE = 16; //16% 16/100 from 0.1% trade fee 
    uint256 public SAFU_FUND = 4; //4% 4/100 from 0.1% trade fee

    uint256 public DISTRIBUTE_GARBI_AMOUNT = 2 * 1e17;
    // $1000 => fee = 1000*0.2/100 => 2
    uint256 public MAX_FEE_ON_DISTRIBUTE = 2 * 1e18;
    uint256 public DAY_PERIOD = 1 days;

    mapping (address => bool) public pairs;
    mapping (address => mapping(uint256 => uint256)) public feeOf;
    mapping (address => uint256) public timeOfCreateNewFee;
    mapping (address => uint256) public totalDays;

    event onDistributeGarbi(address _trader, uint256 _amount);
    
    constructor(
        IERC20 _grb,
        address _performanceMachineContract, 
        address _safuFundContract,
        IGarbiTimeLock _garbiTimeLockContract
        ) {
        garbiTimeLockContract = _garbiTimeLockContract;
        performanceMachineContract = _performanceMachineContract;
        safuFundContract = _safuFundContract;

        GRB = _grb;
    }

    function setDayPeriod(uint256 _value) public onlyOwner {
        DAY_PERIOD = _value;
    }
    function addPair(address _pair) public onlyOwner {
        require(pairs[_pair] != true, "IN_THE_LIST");
        pairs[_pair] = true;
    }

    function removePair(address _pair) public onlyOwner {
        require(pairs[_pair] == true, "NOT_IN_THE_LIST");
        pairs[_pair] = false;
    }

    function setDistributeGarbiAmount(uint256 _amount) public onlyOwner {
        DISTRIBUTE_GARBI_AMOUNT = _amount;
    }


    function setPerformanceMachine() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setPerformanceMachine'), "INVALID_PERMISSION");

        address _performanceMachine = garbiTimeLockContract.getAddressChangeOnTimeLock(address(this), 'setPerformanceMachine', 'performanceMachine');

        require(_performanceMachine != address(0), "INVALID_ADDRESS");

        performanceMachineContract = _performanceMachine;

        garbiTimeLockContract.clearFieldValue('setPerformanceMachine', 'performanceMachine', 1);
        garbiTimeLockContract.doneTransactions('setPerformanceMachine');
    }

    function setSafuFundContract() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setSafuFundContract'), "INVALID_PERMISSION");

        address _safuFundContract = garbiTimeLockContract.getAddressChangeOnTimeLock(address(this), 'setSafuFundContract', 'safuFundContract');

        require(_safuFundContract != address(0), "INVALID_ADDRESS");

        safuFundContract = _safuFundContract;

        garbiTimeLockContract.clearFieldValue('setSafuFundContract', 'safuFundContract', 1);
        garbiTimeLockContract.doneTransactions('setSafuFundContract');
    }

    function setPerformanceFee() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setPerformanceFee'), "INVALID_PERMISSION");

        PERFORMANCE_FEE = garbiTimeLockContract.getUintChangeOnTimeLock(address(this), 'setPerformanceFee', 'PERFORMANCE_FEE');

        garbiTimeLockContract.clearFieldValue('setPerformanceFee', 'PERFORMANCE_FEE', 2);
        garbiTimeLockContract.doneTransactions('setPerformanceFee');
    }

    function setSafuFee() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setSafuFee'), "INVALID_PERMISSION");

        SAFU_FUND = garbiTimeLockContract.getUintChangeOnTimeLock(address(this), 'setSafuFee', 'SAFU_FUND');

        garbiTimeLockContract.clearFieldValue('setSafuFee', 'SAFU_FUND', 2);
        garbiTimeLockContract.doneTransactions('setSafuFee');
    }


    function setMaxFeeOnDistribute() public onlyOwner {

        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setMaxFeeOnDistribute'), "INVALID_PERMISSION");

        MAX_FEE_ON_DISTRIBUTE = garbiTimeLockContract.getUintChangeOnTimeLock(address(this), 'setMaxFeeOnDistribute', 'MAX_FEE_ON_DISTRIBUTE');

        garbiTimeLockContract.clearFieldValue('setMaxFeeOnDistribute', 'MAX_FEE_ON_DISTRIBUTE', 2);
        garbiTimeLockContract.doneTransactions('setMaxFeeOnDistribute');
    }

    function processTradeFee(IERC20 token, address trader) public {

        require(pairs[msg.sender] == true, "PAIR_NOT_CORRECT");

        uint256 tokenBalance = token.balanceOf(address(this)); 
        require(tokenBalance > 0, "TOKEN_BALANCE_ZERO");
        uint256 performanceFee = tokenBalance.mul(PERFORMANCE_FEE).div(100);
        uint256 safuFundAmount = tokenBalance.mul(SAFU_FUND).div(100);
        token.transfer(performanceMachineContract, performanceFee);
        token.transfer(safuFundContract, safuFundAmount);
        token.transfer(msg.sender, token.balanceOf(address(this))); //send back the trade fee after cut 20% (trade fee for LP = 0.24%)

        _distributeGarbi(trader, tokenBalance);
        _updateDailyFee(msg.sender, tokenBalance);
    }

    function _updateDailyFee(address _lp, uint256 _fee) private {
        if (timeOfCreateNewFee[_lp].add(DAY_PERIOD) <= block.timestamp) {
            totalDays[_lp] += 1;
            timeOfCreateNewFee[_lp] = block.timestamp;
        } 
        feeOf[_lp][totalDays[_lp]] = feeOf[_lp][totalDays[_lp]].add(_fee);
    }

    function _distributeGarbi(address trader, uint256 fee) private {
        uint256 _grbBal = GRB.balanceOf(address(this));
        uint256 _distributeAmt = DISTRIBUTE_GARBI_AMOUNT;

        if (fee < MAX_FEE_ON_DISTRIBUTE) {
            _distributeAmt = _distributeAmt.mul(fee).div(MAX_FEE_ON_DISTRIBUTE);
        }

        if (_distributeAmt > _grbBal) {
            _distributeAmt = _grbBal;
        }
        if (_distributeAmt > 0) {
            GRB.transfer(trader, _distributeAmt);
            emit onDistributeGarbi(trader, _distributeAmt);
        }
    }
    function getTradeFeeAPY(IERC20 _lp) public view returns(uint256) {
        uint256 _totalSupply = _lp.totalSupply(); // Base and Token = 2 * total supply
        uint256 _totalDays = totalDays[address(_lp)];
        uint256 _count = 0;
        uint256 _totalFee = 0;
        for (uint256 idx = _totalDays; idx >= 0; idx--) {
            _count += 1;
            _totalFee = _totalFee.add(feeOf[address(_lp)][idx]);
            if (_count >= 7) {
                break;
            }
        }
        if (_count <= 0) {
            return 0;
        }
        if (_totalSupply <= 0) {
            return 0;
        }
        uint256 _dailyFee = _totalFee.div(_count);
        return _dailyFee.mul(1e12).mul(365).div(_totalSupply.mul(2));
    }
    function getVolume(address _lp) public view returns(uint256) {
        uint256 _tradeFee = ISwapTrade(_lp).TRADE_FEE();
        uint256 _feeOnLastDay = feeOf[_lp][totalDays[_lp]];
        // TRADE_FEE = 2; //0.2% 2/1000
        // $1000 => fee = 1000*0.2/100 => 2
        // => Volume = 1000 * fee / TRADE_FEE
        return _feeOnLastDay.mul(1000).div(_tradeFee);
    }
}