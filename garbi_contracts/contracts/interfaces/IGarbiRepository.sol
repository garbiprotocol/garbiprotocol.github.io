// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiRepository {
    function base() external view returns(address);
    function getCapacityByToken() external view returns(uint256);
    function getCapacityByUSD() external view returns(uint256);
    function getBasePrice() external view returns(uint256);
    function withdrawBaseToRepositoryManager(uint256 baseOutAmount) external;
    function oraclePriceDecimal() external view returns (uint256);
}