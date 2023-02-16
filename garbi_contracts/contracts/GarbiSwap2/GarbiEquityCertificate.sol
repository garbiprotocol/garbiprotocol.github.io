// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GarbiEquityCertificate is ERC20Burnable, Ownable {
    using SafeMath for uint256;

    uint256 public totalBurned = 0;
    
    address public repositoryManagerAddress;

    modifier onlyRepositoryManager()
    {
        require(repositoryManagerAddress == msg.sender, "INVALID_PERMISSION");
        _;
    }

    constructor(
    ) ERC20("Garbi Equity Cert", "GarbiEC"){
    }

    function setRepositoryManagerAddress(address newAddress) public onlyOwner {
        repositoryManagerAddress = newAddress;
    }

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        totalBurned = totalBurned.add(amount);
    }

    function mint(address user, uint256 amount) external onlyRepositoryManager {
        _mint(user, amount);
    }

}