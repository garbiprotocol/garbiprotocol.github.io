// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiRepositoryManager {
    function repoAddresses(uint256) external view returns(address);
    function getGarbiECPrice() external view returns(uint256);
}