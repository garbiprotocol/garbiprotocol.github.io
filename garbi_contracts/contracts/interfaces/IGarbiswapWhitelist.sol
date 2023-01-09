// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiswapWhitelist {
	function whitelisted(address _address) external view returns (bool);
}