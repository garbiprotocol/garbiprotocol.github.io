// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockERC20Handle is Ownable
{

    address public grabiFarmSingleWERC20BrigdeAddress;
    IERC20 public erc20Token;

    function SetGrabiFarmSingleERC20BrigdeAddress(address _address) public onlyOwner
    {
        grabiFarmSingleWERC20BrigdeAddress = _address;
    }

    function withdraw(uint256 _amount) public 
    {
        require(grabiFarmSingleWERC20BrigdeAddress == msg.sender, "INVALID_ADDRESS_WITHDRAW");

        uint256 erc20TokenBalance = erc20Token.balanceOf(address(this));
        require(_amount <= erc20TokenBalance, "INVALID_BALANCE");

        erc20Token.transfer(grabiFarmSingleWERC20BrigdeAddress, _amount);
    }

    receive() external payable {}
}