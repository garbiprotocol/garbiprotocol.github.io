// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Bridge 
{
        function farmWithdraw(address handlerAddress, bytes memory data) external;

    
}