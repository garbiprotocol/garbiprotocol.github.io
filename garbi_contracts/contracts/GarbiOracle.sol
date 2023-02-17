// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GarbiOracle is Ownable {

    using SafeMath for uint256;

    mapping(address => AggregatorV3Interface) public priceFeed;

    function setPriceFeedContract(address token, AggregatorV3Interface _priceFeed) public onlyOwner {
        require(token != address(0), "INVALID_TOKEN");
        priceFeed[token] = AggregatorV3Interface(
            _priceFeed
        );
    }

    function getLatestPrice(address token) public view returns (uint256) {
        (
            ,
            /*uint80 roundID*/ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
            ,
            ,

        ) = priceFeed[token].latestRoundData();
        return uint256(price);
    }

    function getPriceDecimals(address token) public view returns (uint256 priceDecimals) {
        priceDecimals = priceFeed[token].decimals();
        return priceDecimals;
    }
}