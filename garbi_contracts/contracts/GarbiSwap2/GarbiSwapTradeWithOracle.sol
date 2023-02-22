// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import '../interfaces/IGarbiRepositoryManager.sol';
import '../interfaces/IGarbiswapFeeMachine.sol';
import '../interfaces/IGarbiswapWhitelist.sol';
import '../interfaces/IGarbiTimeLock.sol';
import '../interfaces/IGarbiOracle.sol';

contract GarbiSwapTradeWithOracle is Ownable, Pausable {
    
    using SafeMath for uint256;

    IGarbiRepositoryManager public repositoryManager;

    IGarbiswapWhitelist public whitelist; 

    IGarbiOracle public garbiOracle;

    uint256 public TRADE_FEE = 10; //0.01% 10/100000

    address public platformFundAddress;

    modifier onlyWhitelist()
    {
        if (msg.sender != tx.origin) {
            require(whitelist.whitelisted(msg.sender) == true, 'INVALID_WHITELIST');
        }
        _;
    }

    constructor(
        IGarbiRepositoryManager repositoryManagerContract,
        IGarbiswapWhitelist whitelistContract
    ) {
        repositoryManager = repositoryManagerContract;
        whitelist = whitelistContract;
    }

    function swapTokenToTokenWithTokenInput(address tokenInputAddress, address tokenOutputAddress, uint256 tokenInputAmount, uint256 minTokenOutputAmount, uint256 deadline) public onlyWhitelist whenNotPaused{
        require(deadline >= block.timestamp, 'INVALID_DEADLINE');
        require(tokenInputAddress != tokenOutputAddress, 'INVALID_PAIR');
        require(tokenInputAmount > 0, 'INVALID_TOKEN_INPUT_AMOUNT');
        require(minTokenOutputAmount > 0, 'INVALID_MIN_TOKEN_OUTPUT_AMOUNT');

        uint256 tokenOutputAmount = getTokenOutputAmountFromTokenInput(tokenInputAddress, tokenOutputAddress, tokenInputAmount);
        require(tokenOutputAmount >= minTokenOutputAmount, 'CAN_NOT_MAKE_TRADE');
        
        uint256 tokenInputDecimal = 0;
        uint256 tokenOutputDecimal = 0;
        (tokenInputDecimal, tokenOutputDecimal) = repositoryManager.getTwoTokenDecimals(tokenInputAddress, tokenOutputAddress);

        //make trade
        IERC20 token1 = IERC20(tokenInputAddress);
        IERC20 token2 = IERC20(tokenOutputAddress);
        tokenInputAmount = convertDecimal18ToTokenDecimal(tokenInputAmount, tokenInputDecimal);
        token1.transferFrom(msg.sender, address(this), tokenInputAmount);
        address repoIn = repositoryManager.baseToRepo(tokenInputAddress);
        token1.transfer(repoIn, tokenInputAmount);
        repositoryManager.withdrawTokenToTradeContract(tokenOutputAddress, tokenOutputAmount);
        token2.transfer(msg.sender, tokenOutputAmount);
        
        
    }

    function getTokenOutputAmountFromTokenInput(address tokenInputAddress, address tokenOutputAddress, uint256 tokenInputAmount) public view returns (uint256) {
        uint256 tokenInputPriceFromOracle = garbiOracle.getLatestPrice(address(tokenInputAddress));
        uint256 tokenOuputPriceFromOracle = garbiOracle.getLatestPrice(address(tokenOutputAddress));
        uint256 tokenOutputAmount = tokenInputAmount.mul(tokenInputPriceFromOracle).div(tokenOuputPriceFromOracle);
        return tokenOutputAmount;
    }

    function convertDecimal6to18(uint256 number) public pure returns (uint256) { 
        number = number.mul(1e18).div(1e6);
        return number;
    }

    function convertDecimal18ToTokenDecimal(uint256 number, uint256 tokenDecimal) public pure returns (uint256) { 
        number = number.mul(10**tokenDecimal).div(10**18);
        return number;
    }

    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
}