// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IGarbiswapFeeMachine {
    function processTradeFee(IERC20 token, address trader) external;
}