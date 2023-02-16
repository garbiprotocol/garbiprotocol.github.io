// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import '../interfaces/IGarbiOracle.sol';

contract GarbiRepository is Ownable {
    using SafeMath for uint256;

    IGarbiOracle public garbiOracle;

    IERC20 public base;

    address public repositoryManagerAddress;

    modifier onlyRepositoryManager()
    {
        require(repositoryManagerAddress == msg.sender, "INVALID_PERMISSION");
        _;
    }

    // Events
    event onWithdrawBase(address addressWithdraw, uint256 amount);

    constructor(
        IERC20 baseContract
    ) {
        base = baseContract;
    }

    function setRepositoryManagerAddress(address newAddress) public onlyOwner {
        repositoryManagerAddress = newAddress;
    }

    function setBaseContract(IERC20 newContract) public onlyOwner {
        base = newContract;
    }
    
    function getCapacityByToken() public view returns (uint256 repoCapacityInToken) {
       repoCapacityInToken = base.balanceOf(address(this));
    }

    function getCapacityByUSD() public view returns (uint256 repoCapacityInUSD) {
       uint256 baseBalance = base.balanceOf(address(this));
       uint256 basePriceFromOracle = garbiOracle.getLatestPrice(address(base));

       repoCapacityInUSD = baseBalance.mul(basePriceFromOracle);
    }

    function getBasePrice() public view returns (uint256 basePriceFromOracle) {
       basePriceFromOracle = garbiOracle.getLatestPrice(address(base));
    }

    function withdrawBaseToRepositoryManager(uint256 baseOutAmount) public onlyRepositoryManager {
        require(baseOutAmount > 0, 'INVALID_DATA');
        uint256 repoCapacityInToken = getCapacityByToken();
        
        if(baseOutAmount > repoCapacityInToken) {
            baseOutAmount = repoCapacityInToken;
        }

        base.transfer(repositoryManagerAddress, baseOutAmount);

        emit onWithdrawBase(repositoryManagerAddress, baseOutAmount);
    }
}