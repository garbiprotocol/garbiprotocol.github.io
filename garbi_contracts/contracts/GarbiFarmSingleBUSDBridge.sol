// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "./GarbiFarmSingleERC20Bridge.sol";

contract GarbiFarmSingleBUSDBridge is GarbiFarmSingleERC20Bridge
{
    constructor(
        IGarbiMining _miningMachine,
        IERC20HandleBridge _ERC20HandleBridge,
        IERC20 _busdAdress,
        uint256 _pidOfMining) 
        GarbiFarmSingleERC20Bridge(
            _miningMachine, 
            _ERC20HandleBridge, 
            _busdAdress,
            _pidOfMining){}
}