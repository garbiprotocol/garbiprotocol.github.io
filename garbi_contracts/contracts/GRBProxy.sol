// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IGRB {
	function mint(address _user, uint256 _amount) external;
}

contract GRBProxy is Ownable {
	using SafeMath for uint256;
	IGRB public GRB;
	uint public constant DELAY = 14 days;
	bool public queued = false;
	uint public timeOfExecute;
	address public userMint;
    uint256 public amountMint;

    event onQueuedMint(address _user, uint256 _amount);
    event onCancelQueuedMint(address _user, uint256 _amount);

	constructor(IGRB _grbToken) {
		GRB = _grbToken;
    }
    /**
     *  OWNER ACTION
     */
    function cancelMint() public onlyOwner
    {
    	require(queued == true, "INVALID_QUEUED");
    	queued = false;
    	emit onCancelQueuedMint(userMint, amountMint);
    }
    function queuedMint(address _user, uint256 _amount) public onlyOwner 
    {
    	require(queued == false, "INVALID_QUEUED");
        queued = true;
        timeOfExecute = block.timestamp.add(DELAY);
        userMint = _user;
        amountMint = _amount;
        emit onQueuedMint(_user, _amount);
    }
    function delayMint() public onlyOwner
    {
    	// verify timelock
    	require(queued == true, "Transaction hasn't been queued.");
        require(timeOfExecute <= block.timestamp, "Transaction hasn't surpassed time lock.");
        // mint
        GRB.mint(userMint, amountMint);
        // cancel timelock
        queued = false;
        delete userMint;
        delete amountMint;
    }
}