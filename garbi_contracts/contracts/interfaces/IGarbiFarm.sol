// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IGarbiFarm {

   uint256 public totalShare;

   IERC20 public want;

   mapping(address => uint256) public shareOf; 
}