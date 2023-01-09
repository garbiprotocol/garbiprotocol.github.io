// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiswapFarmAavev3 {
    function getReserve() external view returns (uint256, uint256);
    function moveOutBaseToTradeContract(uint256 _amountBase) external;
    function moveOutTokenToTradeContract(uint256 _amountToken) external; 
    function releaseFundToTradeContract() external;
}