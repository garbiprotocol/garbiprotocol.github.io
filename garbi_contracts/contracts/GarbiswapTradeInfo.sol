// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IGarbiswapTrade {
	function base() external view returns (address);
	function token() external view returns (address);
	function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
	function getTotalReserve() external view returns (uint256, uint256);
}
contract GarbiswapTradeInfo {
	struct LP {
		uint256 baseReserve;
		uint256 tokenReserve;
		uint256 totalLP;
		uint256 uLPBal;
		uint256 uBaseAllowedToPair;
		uint256 uTokenAllowedToPair; 
		uint256 uBaseAllowedToTradeMachine;
		uint256 uTokenAllowedToTradeMachine; 
	}
	function getData(address _owner, address _tradeMachine, IGarbiswapTrade[] calldata _lps) public view returns(LP[] memory data_)
	{
		data_ = new LP[](_lps.length);
		address _base;
		address _token;
		for (uint256 idx = 0; idx < _lps.length; idx++) {
			_base = _lps[idx].base();
			_token = _lps[idx].token();
            data_[idx].baseReserve = IERC20(_base).balanceOf(address(_lps[idx]));
            data_[idx].tokenReserve = IERC20(_token).balanceOf(address(_lps[idx]));
			data_[idx].totalLP = _lps[idx].totalSupply();
			data_[idx].uLPBal = _lps[idx].balanceOf(_owner);
			data_[idx].uBaseAllowedToPair = IERC20(_base).allowance(_owner, address(_lps[idx]));
			data_[idx].uTokenAllowedToPair = IERC20(_token).allowance(_owner, address(_lps[idx]));
			data_[idx].uBaseAllowedToTradeMachine = IERC20(_base).allowance(_owner, _tradeMachine);
			data_[idx].uTokenAllowedToTradeMachine = IERC20(_token).allowance(_owner, _tradeMachine);
		}
	}
}