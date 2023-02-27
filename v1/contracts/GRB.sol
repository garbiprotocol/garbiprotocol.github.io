// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GRP is ERC20Burnable, Ownable {
    using SafeMath for uint256;
    mapping(address => bool) public isMinter;
    uint256 public immutable MAX_SUPPLY;

    uint256 public totalBurned = 0;

    event MinterRoleAssigned(address indexed _user, address indexed _account);
    event MinterRoleRevoked(address indexed _user, address indexed _account);

    constructor(
        uint256 _maxSupply,
        uint256 _initialSupply
    ) ERC20("GRB Token", "GRB") {
        require(_initialSupply <= _maxSupply, "GRB: The _initialSupply should not exceed the _maxSupply");
        MAX_SUPPLY = _maxSupply;

        if (_initialSupply > 0) {
            _mint(_msgSender(), _initialSupply);
        }
    }
    modifier hasMinterRole() {
        require(isMinter[_msgSender()], "GRB: You don't have the permission!");
        _;
    }
    /************************************************************************/

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        totalBurned = totalBurned.add(amount);
    }
    /************************************************************************/

    function mint(address _user, uint256 _amount) external hasMinterRole {
        uint256 _totalSupply = totalSupply();
        require(_totalSupply.add(_amount) <= MAX_SUPPLY, "GRB: No more minting allowed!");

        _mint(_user, _amount);
    }

    /**************************************************************************/

    function assignMinterRole(address _account) public onlyOwner {
        isMinter[_account] = true;

        emit MinterRoleAssigned(_msgSender(), _account);
    }

    function revokeMinterRole(address _account) public onlyOwner {
        isMinter[_account] = false;

        emit MinterRoleRevoked(_msgSender(), _account);
    }
}