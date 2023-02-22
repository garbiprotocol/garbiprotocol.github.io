// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiRepository {
    function getTwoTokenDecimals() external view returns(uint256, uint256);
}