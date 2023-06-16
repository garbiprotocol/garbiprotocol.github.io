// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IETHBridge {
    function farmWithdraw(address handlerAddress, bytes memory data) external;
}