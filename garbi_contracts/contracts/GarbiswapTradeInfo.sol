// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
interface IERC20 {
        function totalSupply() external view returns (uint256);
        function balanceOf(address account) external view returns (uint256);
        function allowance(address _owner, address spender) external view returns (uint256);
}
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
		uint256 uBaseAllowed;
		uint256 uTokenAllowed;
	}
	function getData(address _owner, IGarbiswapTrade[] calldata _lps) public view returns(LP[] memory data_)
	{
		data_ = new LP[](_lps.length);
		address _base;
		address _token;
		for (uint256 idx = 0; idx < _lps.length; idx++) {
			_base = _lps[idx].base();
			_token = _lps[idx].token();
			(data_[idx].baseReserve, data_[idx].tokenReserve) = _lps[idx].getTotalReserve();
			data_[idx].totalLP = _lps[idx].totalSupply();
			data_[idx].uLPBal = _lps[idx].balanceOf(_owner);
			data_[idx].uBaseAllowed = IERC20(_base).allowance(_owner, address(_lps[idx]));
			data_[idx].uTokenAllowed = IERC20(_token).allowance(_owner, address(_lps[idx]));
		}
	}
}