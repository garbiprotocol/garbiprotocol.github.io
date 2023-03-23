// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

import './interfaces/IGarbiMining.sol';

contract GarbiFarmUniV3 is IERC721Receiver, ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    
    IERC721 public want; // GRBWETH UNI V3 NFT

    address public poolToken0; //GRB
    address public poolToken1; //WETH

    INonfungiblePositionManager public positionManager;

    IUniswapV3Pool public uniswapV3Pool;

    int24 public poolTickLower;
    int24 public poolTickUpper;
    
    mapping(address => uint256) public userInfoTokenId;

    IGarbiMining public miningMachine;

    uint256 public pidOfMining;
    uint256 public totalShare = 0;
    mapping(address => uint256) public shareOf;

    event onDeposit(address _user, uint256 tokenId);
    event onWithdraw(address _user, uint256 tokenId);

    constructor(
        IGarbiMining _miningMachine,
        IERC721 _want,
        address _uniswapV3Pool,
        uint256 _pidOfMining,
        address _positionManager,
        address _token0,
        address _token1,
        int24 _tickLower, 
        int24 _tickUpper
        ) {
        want = _want;
        miningMachine = _miningMachine;
        uniswapV3Pool = IUniswapV3Pool(_uniswapV3Pool);
        pidOfMining = _pidOfMining;
        positionManager = INonfungiblePositionManager(_positionManager);
        poolToken0 = _token0;
        poolToken1 = _token1;
        poolTickLower = _tickLower;
        poolTickUpper = _tickUpper;
    }

    function setPoolTicks(int24 newTickLower, int24 newTickUpper) public onlyOwner 
    {
        require(newTickLower > 0, "INVALID_TICK");
        require(newTickUpper >= newTickLower, "INVALID_TICK");
        poolTickLower = newTickLower;
        poolTickUpper = newTickUpper;
    }

    function setUniswapV3Pool(address newAddress) public onlyOwner 
    {
        require(newAddress != address(0), "INVALID_ADDRESS");
        uniswapV3Pool = IUniswapV3Pool(newAddress);
    }

    function setTokens(address newToken0, address newToken1) public onlyOwner 
    {
        require(newToken0 != address(0), "INVALID_ADDRESS");
        require(newToken1 != address(0), "INVALID_ADDRESS");
        poolToken0 = newToken0;
        poolToken1 = newToken1;
    }

    function setPositionManager(address newAddress) public onlyOwner 
    {
        require(newAddress != address(0), "INVALID_ADDRESS");
        positionManager = INonfungiblePositionManager(newAddress);
    }

    function setMiningMachine(address newAddress) public onlyOwner 
    {
        require(newAddress != address(0), "INVALID_ADDRESS");
        miningMachine = IGarbiMining(newAddress);
    }

    function setWantToken(address newAddress) public onlyOwner
    {
        require(newAddress != address(0), "INVALID_ADDRESS");
        want = IERC721(newAddress);
    }

    function setPidOfMining(uint256 newPidOfMining) public onlyOwner 
    {
        pidOfMining = newPidOfMining;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        // Return the expected value to indicate that the transfer was handled successfully.
        return this.onERC721Received.selector;
    }

    function deposit(uint256 tokenId) external nonReentrant 
    {
        require(tokenId > 0, 'INVALID_INPUT');
        require(want.ownerOf(tokenId) == msg.sender, 'INVALID_INPUT');
        require(userInfoTokenId[msg.sender] == 0, 'NEED_WITHDRAW_TOKEN_ID');
        (, , address token0, address token1, , int24 tickLower , int24 tickUpper , uint128 liquidity, , , , ) = positionManager.positions(tokenId);
        require(tickLower >= poolTickLower && tickUpper <= poolTickUpper, 'INVALID_PRICE_RANGE');
        require((poolToken0 == token0 && poolToken1 == token1) || (poolToken0 == token1 && poolToken1 == token0), 'INVALID_TOKENS');

        harvest(msg.sender);
    	want.safeTransferFrom(msg.sender, address(this), tokenId);
        userInfoTokenId[msg.sender] = tokenId;
        
        uint256 wantAmt = liquidity;
        shareOf[msg.sender] = shareOf[msg.sender].add(wantAmt);
        totalShare = totalShare.add(wantAmt);
        miningMachine.updateUser(pidOfMining, msg.sender);
        emit onDeposit(msg.sender, tokenId);
    }

    function withdraw() external nonReentrant 
    {
        require(userInfoTokenId[msg.sender] != 0, 'NO_TOKEN_ID_TO_WITHDRAW');
        harvest(msg.sender);

        uint256 _share = shareOf[msg.sender];
        shareOf[msg.sender] = 0;
        totalShare = totalShare.sub(_share);
        
        uint256 tokenId = userInfoTokenId[msg.sender];
        want.safeTransferFrom(address(this), msg.sender, tokenId);
        userInfoTokenId[msg.sender] = 0;

        miningMachine.updateUser(pidOfMining, msg.sender);
        emit onWithdraw(msg.sender, tokenId);
    }

    function harvest(address _user) public returns(uint256 _pendingVeGRB) {
        if(isCurrentPriceInRange()) {
            return miningMachine.harvest(pidOfMining, _user);
        }
        else {
            return 0;
        }
    }

    function isCurrentPriceInRange() public view returns (bool) {
        // Get the current price (square root price) from the Uniswap v3 pool
        (uint160 sqrtPriceX96, , , , , , ) = uniswapV3Pool.slot0();

        // Convert the tickLower and tickUpper to their corresponding square root prices
        uint160 sqrtPriceLowerX96 = TickMath.getSqrtRatioAtTick(poolTickLower);
        uint160 sqrtPriceUpperX96 = TickMath.getSqrtRatioAtTick(poolTickUpper);

        // Check if the current price is within the tick range
        return sqrtPriceX96 >= sqrtPriceLowerX96 && sqrtPriceX96 < sqrtPriceUpperX96;
    }

    function getNFTTokensWithPair(address user) external view returns (uint256[] memory) {
        uint256 tokenCount = positionManager.balanceOf(user);
        uint256[] memory tokenIds = new uint256[](tokenCount);

        uint256 validTokenCount = 0;
        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = positionManager.tokenOfOwnerByIndex(user, i);
            (, , address nftToken0, address nftToken1, , , , , , , , ) = positionManager.positions(tokenId);

            if ((nftToken0 == poolToken0 && nftToken1 == poolToken1) || (nftToken0 == poolToken1 && nftToken1 == poolToken0)) {
                tokenIds[validTokenCount] = tokenId;
                validTokenCount++;
            }
        }

        uint256[] memory validTokenIds = new uint256[](validTokenCount);
        for (uint256 i = 0; i < validTokenCount; i++) {
            validTokenIds[i] = tokenIds[i];
        }

        return validTokenIds;
    }

    function getNFTTokenInfo(uint256 tokenId) external view returns(address token0, address token1, uint256 token0Amount, uint256 token1Amount) {
        (, , address tokenAddress0, address tokenAddress1, , int24 tickLower , int24 tickUpper , uint128 liquidity, , , , ) = positionManager.positions(tokenId);
        token0 = tokenAddress0;
        token1 = tokenAddress1;
        uint160 sqrtRatioX96 = TickMath.getSqrtRatioAtTick(uniswapV3Pool.tickSpacing());
        token0Amount = uniswapV3Pool.liquidityToAmount0(tickLower, tickUpper, liquidity, sqrtRatioX96);
        token1Amount = uniswapV3Pool.liquidityToAmount1(tickLower, tickUpper, liquidity, sqrtRatioX96);
    }

    function getData(
        address _user
    ) 
    public 
    view
    returns(
        uint256 miningSpeed_,
        uint256 totalMintPerDay_, 
        uint256 userGRBPending_, 
        uint256 tvl_,
        uint256 tokenId
    ) {
        if(isCurrentPriceInRange()) {
            (userGRBPending_, , ) = miningMachine.getUserInfo(pidOfMining, _user);
            totalMintPerDay_ = miningMachine.getTotalMintPerDayOf(pidOfMining);
            miningSpeed_ = miningMachine.getMiningSpeedOf(pidOfMining);
        }
        else {
            userGRBPending_ = 0;
            totalMintPerDay_ = 0;
            miningSpeed_ = 0;
        }
        
        tvl_ = totalShare;
        tokenId = userInfoTokenId[msg.sender];
    } 
}