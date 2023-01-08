// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiswapTradePair {
    function token() external view returns(address);
    function swapBaseToTokenWithBaseInput(uint256 baseInputAmount, uint256 minTokenOutput, uint256 deadline) external;
    function swapTokenToBaseWithTokenInput(uint256 tokenInputAmount, uint256 minBaseOutput, uint256 deadline) external;
    function getBaseOutput(uint256 tokenInputAmount) external view returns (uint256);
    function getTokenOutput(uint256 baseInputAmount) external view returns (uint256);
}