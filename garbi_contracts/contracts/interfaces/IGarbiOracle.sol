// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiOracle {
    function getLatestPrice(address token) external view returns (uint256);
}