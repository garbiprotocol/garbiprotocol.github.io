// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import './interfaces/IGarbiTimeLock.sol';
import './interfaces/IGarbiswapWhitelist.sol';
import './interfaces/IERC20withBurn.sol';

contract GarbiVestGRB is ReentrancyGuard, Ownable {

    using SafeMath for uint256;

    IERC20 public GRB;
    IERC20withBurn public veGRB;

    IGarbiTimeLock public garbiTimeLockContract;
    IGarbiswapWhitelist public whitelistContract;

    mapping(address => uint256) public userVeGRBDeposited;
    mapping(address => uint256) public userGRBAvailable;
    mapping(address => uint256) public userVeGRBConvertToGRB;
    mapping(address => uint256) public userLastVestCaculated;
    mapping(address => uint256) public userVestFinished;

    uint256 public PERCENTAGE_GRB = 40; //40% 40/100
    uint256 public totalBlock = 5760;

    event onDeposit(address _user, uint256 _amount);
    event onClaim(address _user, uint256 _amount);

    modifier onlyWhitelist()
    {
        if (msg.sender != tx.origin) {
            require(whitelistContract.whitelisted(msg.sender) == true, 'INVALID_WHITELIST');
        }
        _;
    }

    constructor(
        IERC20 _grb,
        IERC20withBurn _veGrb,
        IGarbiswapWhitelist _whitelistContract,
        IGarbiTimeLock _garbiTimeLockContract
    ) {
        GRB = _grb;
        veGRB = _veGrb;
        garbiTimeLockContract = _garbiTimeLockContract;
        whitelistContract = _whitelistContract;
    }

    function setWhitelistContract() public onlyOwner {
        require(garbiTimeLockContract.isQueuedTransaction(address(this), 'setWhitelistContract'), "INVALID_PERMISSION");

        address _whitelistContract = garbiTimeLockContract.getAddressChangeOnTimeLock(address(this), 'setWhitelistContract', 'whitelistContract');

        require(_whitelistContract != address(0), "INVALID_ADDRESS");

        whitelistContract = IGarbiswapWhitelist(_whitelistContract);

        garbiTimeLockContract.clearFieldValue('setWhitelistContract', 'whitelistContract', 1);
        garbiTimeLockContract.doneTransactions('setWhitelistContract');
    }

    function deposit(uint256 _veGRBAmount) public onlyWhitelist nonReentrant {
        require(_veGRBAmount > 0, 'INVALID_INPUT');
        
        updateUser(msg.sender);

        uint256 userVeGRBBalance = veGRB.balanceOf(msg.sender);
        if(_veGRBAmount > userVeGRBBalance) {
            _veGRBAmount = userVeGRBBalance;
        }

        veGRB.transferFrom(msg.sender, address(this), _veGRBAmount);

        userVeGRBDeposited[msg.sender] = userVeGRBDeposited[msg.sender].add(_veGRBAmount).sub(userVeGRBConvertToGRB[msg.sender]);
        userVeGRBConvertToGRB[msg.sender] = 0;

        uint256 availableGRB = _veGRBAmount.mul(PERCENTAGE_GRB).div(100);
        userGRBAvailable[msg.sender] = userGRBAvailable[msg.sender].add(availableGRB);
        userVeGRBDeposited[msg.sender] = userVeGRBDeposited[msg.sender].sub(availableGRB);

        userVestFinished[msg.sender] = block.number + totalBlock;

        emit onDeposit(msg.sender, _veGRBAmount);
    }

    function claimGRB(uint256 _amount) public onlyWhitelist nonReentrant {
        require(_amount > 0, 'INVALID_INPUT');
        
        updateUser(msg.sender);

        uint256 vaultBalance = GRB.balanceOf(address(this));
        
        if(_amount > vaultBalance) {
            _amount = vaultBalance;
        }

        if(_amount > userGRBAvailable[msg.sender]) {
            _amount = userGRBAvailable[msg.sender];
        }
        
        userGRBAvailable[msg.sender] = userGRBAvailable[msg.sender].sub(_amount);  
        GRB.transfer(msg.sender, _amount);
        veGRB.burn(_amount);

        emit onClaim(msg.sender, _amount);
    }

    function updateUser(address _user) public {
        uint256 pendingGRB = getUserPendingGRB(_user);
        userVeGRBConvertToGRB[_user] = userVeGRBConvertToGRB[_user].add(pendingGRB);
        userGRBAvailable[_user] = userGRBAvailable[_user] + pendingGRB;
        userLastVestCaculated[_user] = block.number;
    }

    function getUserVeGRBBalance(address _user) public view returns(uint256 userVeGRBBalance) {
        userVeGRBBalance = userVeGRBDeposited[_user].sub(userVeGRBConvertToGRB[_user]).sub(getUserPendingGRB(_user));
    }

    function getUserPendingGRB(address _user) public view returns(uint256) {
        uint256 userVestingSpeed = userVeGRBDeposited[_user].div(totalBlock);
        uint256 userPendingGRB = 0;
        if(block.number <= userVestFinished[_user]) {
            userPendingGRB = userVestingSpeed.mul(getBlockFrom(userLastVestCaculated[_user], block.number));
            return userPendingGRB;
        }
        else {
            if(userLastVestCaculated[_user] > userVestFinished[_user]) {
                return 0;
            }
            else {
                userPendingGRB = userVestingSpeed.mul(getBlockFrom(userLastVestCaculated[_user], userVestFinished[_user]));
                return userPendingGRB;
            }
        }
    }

    function getBlockFrom(uint256 _from, uint256 _to) public pure returns (uint256) {
        return _to.sub(_from);
    }

    function getUserInfo(address _user) public view returns(uint256 userVeGRBBalance, uint256 userGRBCanClaim, uint256 vestFinished, uint256 lastVestCaculated, uint256 veGRBDeposited, uint256 blocknow, uint256 contractGRBBalance) {
        userVeGRBBalance = getUserVeGRBBalance(_user);
        userGRBCanClaim = userGRBAvailable[_user] + getUserPendingGRB(_user);
        vestFinished = userVestFinished[_user];
        lastVestCaculated = userLastVestCaculated[_user];
        veGRBDeposited = userVeGRBDeposited[_user];
        blocknow = block.number;
        contractGRBBalance = GRB.balanceOf(address(this));
    }

}