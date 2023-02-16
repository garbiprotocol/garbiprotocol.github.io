// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20withBurnAndMint is IERC20 {
    function burn(uint256 amount) external;
    function mint(address _user, uint256 _amount) external; 
}