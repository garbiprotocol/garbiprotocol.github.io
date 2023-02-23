// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import '../interfaces/IGarbiOracle.sol';

contract GarbiRepository is Ownable {
    using SafeMath for uint256;

    IGarbiOracle public garbiOracle;

    IERC20Metadata public base;

    uint256 public baseDecimal;

    uint256 public oraclePriceDecimal;

    address public repositoryManagerAddress;

    modifier onlyRepositoryManager()
    {
        require(repositoryManagerAddress == msg.sender, "INVALID_PERMISSION");
        _;
    }

    // Events
    event onWithdrawBase(address addressWithdraw, uint256 amount);

    constructor(
        IERC20Metadata baseContract,
        IGarbiOracle garbiOracleContract,
        address repositoryManagerContract
    ) {
        base = baseContract;
        garbiOracle = garbiOracleContract;
        repositoryManagerAddress = repositoryManagerContract;
    }

    function setGarbiOracle(IGarbiOracle newGarbiOracleContract) public onlyOwner {
        garbiOracle = newGarbiOracleContract;
    }

    function setRepositoryManagerAddress(address newAddress) public onlyOwner {
        repositoryManagerAddress = newAddress;
    }

    function setDecimals() public onlyOwner {
        baseDecimal = base.decimals();
        oraclePriceDecimal = garbiOracle.getPriceDecimals(address(base));
    }

    function setBaseContract(IERC20Metadata newContract) public onlyOwner {
        base = newContract;
    }
    
    function getCapacityByToken() public view returns (uint256 repoCapacityInToken) {
       repoCapacityInToken = convertDecimalTo18(base.balanceOf(address(this)), baseDecimal);
    }

    function getCapacityByUSD() public view returns (uint256 repoCapacityInUSD) {
       uint256 baseBalance = convertDecimalTo18(base.balanceOf(address(this)), baseDecimal);
       uint256 basePriceFromOracle = garbiOracle.getLatestPrice(address(base));

       repoCapacityInUSD = baseBalance.mul(basePriceFromOracle).div(10**oraclePriceDecimal);
    }

    function getBasePrice() public view returns (uint256 basePriceFromOracle) {
       basePriceFromOracle = convertDecimalTo18(garbiOracle.getLatestPrice(address(base)), oraclePriceDecimal);
    }

    function withdrawBaseToRepositoryManager(uint256 baseOutAmount) public onlyRepositoryManager {
        require(baseOutAmount > 0, 'INVALID_DATA');
        uint256 repoCapacityInToken = getCapacityByToken();
        
        if(baseOutAmount > repoCapacityInToken) {
            baseOutAmount = repoCapacityInToken;
        }
        
        baseOutAmount = convertToBaseDecimal(baseOutAmount, 18);
        base.transfer(repositoryManagerAddress, baseOutAmount);

        emit onWithdrawBase(repositoryManagerAddress, baseOutAmount);
    }

    function convertDecimalTo18(uint256 number, uint256 numberDecimal) public pure returns (uint256) { 
        number = number.mul(1e18).div(10**numberDecimal);
        return number;
    }

    function convertToBaseDecimal(uint256 number, uint256 numberDecimal) public view returns (uint256) { 
        number = number.mul(10**baseDecimal).div(10**numberDecimal);
        return number;
    }
}