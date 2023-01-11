// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract veGRB is ERC20Burnable, Ownable {
    using SafeMath for uint256;

    uint256 public immutable MAX_SUPPLY;

    uint256 public totalBurned = 0;

    address public miningMachine;

    constructor(
        uint256 _maxSupply
    ) ERC20("veGRB", "veGRB"){
        MAX_SUPPLY = _maxSupply;
    }

    modifier onlyMiningMachine()
    {
        require(msg.sender == miningMachine, 'INVALID_MINING_MACHINE');
        _;
    }

    function setMiningMachine(address _miningMachine) public onlyOwner 
    {
        miningMachine = _miningMachine;
    }

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        totalBurned = totalBurned.add(amount);
    }

    function mint(address _user, uint256 _amount) external onlyMiningMachine {
        uint256 _totalSupply = totalSupply();
        require(_totalSupply.add(_amount) <= MAX_SUPPLY, "veGRB: No more minting allowed!");

        _mint(_user, _amount);
    }

}