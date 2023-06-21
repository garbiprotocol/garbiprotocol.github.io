// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockETHHandle is Ownable
{
    address public grabiFarmSingleWETHBrigdeAddress;

    function SetGrabiFarmSingleWETHBrigdeAddress(address _address) public onlyOwner
    {
        grabiFarmSingleWETHBrigdeAddress = _address;
    }

    function withdraw(uint256 _amount) public 
    {
        require(grabiFarmSingleWETHBrigdeAddress == msg.sender, "INVALID_ADDRESS_WITHDRAW");
        uint256 ethBalance = address(this).balance;
        require(_amount <= ethBalance, "INVALID_ETH_BALANCE");
        (bool success, ) = grabiFarmSingleWETHBrigdeAddress.call{value: _amount}("");
        require(success, "Error withdraw");
    }

    receive() external payable {}
}