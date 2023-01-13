// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract BalanceInfo {
        struct TokenBALANCE {
                address token;
                uint256 amount;
        }
	function getData(address _account, IERC20[] memory _tokens) public view returns(TokenBALANCE[] memory tokensBal_, uint256 nativeBal_)
	{
		nativeBal_ = address(_account).balance;
		tokensBal_ = new TokenBALANCE[](_tokens.length);
		for (uint256 idx = 0; idx < _tokens.length; idx++) {
			tokensBal_[idx].token = address(_tokens[idx]);
			tokensBal_[idx].amount = _tokens[idx].balanceOf(_account);
		}
	}
}