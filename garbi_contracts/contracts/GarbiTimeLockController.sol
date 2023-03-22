// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract GarbiTimeLockController is TimelockController {
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors, address admin) 
        TimelockController(minDelay, proposers, executors, admin) 
    {}
}
