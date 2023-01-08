// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface IGarbiTimeLock {
	function doneTransactions(string memory _functionName) external;
	function clearFieldValue(string memory _functionName, string memory _fieldName, uint8 _typeOfField) external;
	function getAddressChangeOnTimeLock(address _contractCall, string memory _functionName, string memory _fieldName) external view returns(address); 
	function getUintChangeOnTimeLock(address _contractCall, string memory _functionName, string memory _fieldName) external view returns(uint256);
	function isQueuedTransaction(address _contractCall, string memory _functionName) external view returns(bool);
}
