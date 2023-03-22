// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestTimeLockController is Ownable {

    uint256 public myValue;

    constructor() 
    {
    }

    function setMyValue(uint256 _newValue) public onlyOwner {
        myValue = _newValue;
    }
}
