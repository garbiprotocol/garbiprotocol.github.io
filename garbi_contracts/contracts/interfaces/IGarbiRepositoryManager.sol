// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiRepositoryManager {
    function repoAddresses(uint256) external view returns(address);
    function getGarbiECPrice() external view returns(uint256);
    function getDataToSellGarbiEC(address repoOutAddress, uint256 garbiECInAmount) external view returns(uint256);
    function getFeeWithOutAmount(address repoOutAddress, uint256 assetOutAmount) external view returns(uint256);
}