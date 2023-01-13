// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IGarbiswapTradePair.sol';
import './interfaces/IGarbiswapWhitelist.sol';

contract GarbiswapTradeMachine is Ownable{
    
    using SafeMath for uint256;
    
    mapping (address => bool) public pairs;

    IGarbiswapWhitelist public whitelistContract; 

    IERC20 public veGRB; // veGRB
   
    modifier onlyWhitelist()
    {
        if (msg.sender != tx.origin) {
            require(whitelistContract.whitelisted(msg.sender) == true, 'INVALID_WHITELIST');
        }
        _;
    }
    event onDistributeGarbi(address _trader, uint256 _amount);
    
    constructor(
        IERC20 _vegrb,
        IGarbiswapWhitelist _whitelistContract
        ) {
         veGRB = _vegrb;
         whitelistContract = _whitelistContract;
    }

    function setWhitelistContract(IGarbiswapWhitelist _whitelistContract) public onlyOwner {
        whitelistContract = _whitelistContract;
    }
    
    function approveWithPair(IERC20 token, IGarbiswapTradePair pair) public onlyOwner {
        token.approve(address(pair), type(uint256).max);
    }

    function getTokenOutput(uint256 token1InputAmount, IGarbiswapTradePair token1Pair, IGarbiswapTradePair token2Pair) public view returns (uint256) {
        //get token1 to base
        uint256 baseAmount = token1Pair.getBaseOutput(token1InputAmount);
        //get base to token2
        uint256 token2OutputAmount = token2Pair.getTokenOutput(baseAmount);
        return token2OutputAmount;
    }
    
    function addPair(address _pair) public onlyOwner {
        require(pairs[_pair] != true, "IN_THE_LIST");
        pairs[_pair] = true;
    }

    function removePair(address _pair) public onlyOwner {
        require(pairs[_pair] == true, "NOT_IN_THE_LIST");
        pairs[_pair] = false;
    }

    function swapTokenToTokenWithTokenInput(uint256 token1InputAmount, uint256 minToken2Output, IGarbiswapTradePair token1Pair, IGarbiswapTradePair token2Pair, uint256 deadline) public onlyWhitelist {
        require(token1Pair != token2Pair, 'SAME_PAIR');
        require(pairs[address(token1Pair)] == true, "PAIR1_NOT_CORRECT");
        require(pairs[address(token2Pair)] == true, "PAIR2_NOT_CORRECT");
        IERC20 token1 = IERC20(token1Pair.token());
        IERC20 token2 = IERC20(token2Pair.token());
        //get token1 to base
        uint256 baseAmount = token1Pair.getBaseOutput(token1InputAmount);
        //get base to token2
        uint256 token2OutputAmount = token2Pair.getTokenOutput(baseAmount);
        require(token2OutputAmount >= minToken2Output, 'CAN_NOT_MAKE_TRADE');
        //
        uint256 _vegrbBalBefore = veGRB.balanceOf(address(this));
        //make trade token1 to base
        token1.transferFrom(msg.sender, address(this), token1InputAmount);
        token1Pair.swapTokenToBaseWithTokenInput(token1InputAmount, baseAmount, deadline);

        //make trade base to token2
        token2Pair.swapBaseToTokenWithBaseInput(baseAmount, token2OutputAmount, deadline);
        token2.transfer(msg.sender, token2OutputAmount);

        uint256 _vegrbBalAfter = veGRB.balanceOf(address(this));

        if (_vegrbBalAfter > _vegrbBalBefore) {
            veGRB.transfer(msg.sender, _vegrbBalAfter.sub(_vegrbBalBefore));
            emit onDistributeGarbi(msg.sender, _vegrbBalAfter.sub(_vegrbBalBefore));
        }
    }
}