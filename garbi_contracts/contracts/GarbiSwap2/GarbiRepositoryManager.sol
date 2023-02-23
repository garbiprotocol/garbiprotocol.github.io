// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import '../interfaces/IERC20withBurnAndMint.sol';
import '../interfaces/IGarbiRepository.sol';
import '../interfaces/IGarbiswapWhitelist.sol';

contract GarbiRepositoryManager is ReentrancyGuard, Ownable, Pausable {
    using SafeMath for uint256;

    IGarbiswapWhitelist public whitelist; 

    uint256 public totalShares = 1000;

    struct RepoInfo {
        uint256 share;
        uint256 maxCapacityLimit;
    }

    // Array of repo addresses
    address[] public repoAddresses;

    mapping(address => RepoInfo) public repoList;  

    mapping(address => address) public baseToRepo;  

    IERC20withBurnAndMint public GarbiEC;

    uint256 SELL_GARBIEC_FEE = 35; //35/10000 = 0.35%

    uint256 SWAP_FEE = 1; //1/10000 = 0.01%

    address public platformFundAddress;

    modifier onlyRepoInTheList(address repoAddress)
    {
        require(repoAddress != address(0), 'INVALID_REPO_ADDRESS');
        uint flag = 0;
        for (uint i = 0; i < repoAddresses.length; i++) {
            if(repoAddresses[i] == repoAddress) {
                flag = 1;
                break;
            }
        }
        require(flag == 1, "INVALID_PERMISSION");
        _;
    }

    modifier onlyWhitelist()
    {
        if (msg.sender != tx.origin) {
            require(whitelist.whitelisted(msg.sender) == true, 'INVALID_WHITELIST');
        }
        _;
    }

    // Events
    event onAddRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit);
    event onUpdateRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit); 
    event onBuyGarbiEC(address user, address repoInAddress, uint256 assetInAmount, uint256 garbiECOutAmount);
    event onSellGarbiEC(address user, address repoOutAddress, uint256 assetOutAmount, uint256 garbiECInAmount);
    event onSwapTokenToToken(address user, address repoInAddress, address repoOutAddress, uint256 tokenInputAmount, uint256 tokenOutputAmount);

    constructor(
        IERC20withBurnAndMint garbiECContract,
        IGarbiswapWhitelist whitelistContract
    ){
        GarbiEC = garbiECContract;
        whitelist = whitelistContract;
        platformFundAddress = _msgSender();
    }
    
    function addRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit) public onlyOwner {
        require(repoAddress != address(0), 'INVALID_REPO_ADDRESS');
        require(repoShare > 0, 'INVALID_REPO_SHARE');
        require(repoMaxCapacityLimit > 0, 'INVALID_REPO_CAPACITY');

        repoList[repoAddress] = RepoInfo({
            share : repoShare,
            maxCapacityLimit : repoMaxCapacityLimit
        });

        repoAddresses.push(repoAddress);

        IGarbiRepository repo = IGarbiRepository(repoAddress);

        baseToRepo[repo.base()] = repoAddress;

        emit onAddRepository(repoAddress, repoShare, repoMaxCapacityLimit);
    }

    function updateRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit) public onlyOwner {
        require(repoAddress != address(0), 'INVALID_REPO_ADDRESS');
        require(repoShare > 0, 'INVALID_REPO_SHARE');
        require(repoMaxCapacityLimit > 0, 'INVALID_REPO_CAPACITY');

        repoList[repoAddress] = RepoInfo({
            share : repoShare,
            maxCapacityLimit : repoMaxCapacityLimit
        });

        emit onUpdateRepository(repoAddress, repoShare, repoMaxCapacityLimit);
    }

    function setTotalShares(uint256 newTotalShares) public onlyOwner {
        require(newTotalShares > 0, 'INVALID_DATA');
        totalShares = newTotalShares;
    }

    function setSellGarbiECFee(uint256 newFee) public onlyOwner {
        require(newFee > 0, 'INVALID_DATA');
        SELL_GARBIEC_FEE = newFee;
    }

    function setPlatformFundAdress(address newAddress) public onlyOwner {
        platformFundAddress = newAddress;
    }

    function setGarbiEquityCertificateContract(IERC20withBurnAndMint newGarbiECContract) public onlyOwner {
        require(address(newGarbiECContract) != address(0), 'INVALID_DATA');
        GarbiEC = newGarbiECContract;
    }

    function buyGarbiEquityCertificate(address repoInAddress, uint256 assetInAmount) public nonReentrant onlyRepoInTheList(repoInAddress) onlyWhitelist {
        require(assetInAmount > 0, 'INVALID_ASSET_AMOUNT');
        require(repoList[repoInAddress].share > 0, 'INVALID_REPO');
        
        IGarbiRepository repoIn = IGarbiRepository(repoInAddress);

        require(repoIn.getCapacityByToken().add(assetInAmount) <= repoList[repoInAddress].maxCapacityLimit, 'INVALID_ASSET_CAPACITY');

        IERC20 base = IERC20(repoIn.base());

        uint256 baseUserBalance = base.balanceOf(msg.sender);
        baseUserBalance = repoIn.convertDecimalTo18(baseUserBalance, repoIn.baseDecimal());

        if(assetInAmount > baseUserBalance) {
            assetInAmount = baseUserBalance;
        }
        
        uint256 garbiECOutAmount = getDataToBuyGarbiEC(repoInAddress, assetInAmount);

        //make trade
        uint256 assetInAmountAtAssetDecimal = repoIn.convertToBaseDecimal(assetInAmount, 18);
        base.transferFrom(msg.sender, address(this), assetInAmountAtAssetDecimal);
        GarbiEC.mint(address(this), garbiECOutAmount);
        base.transfer(repoInAddress, assetInAmountAtAssetDecimal);
        GarbiEC.transfer(msg.sender, garbiECOutAmount);

        emit onBuyGarbiEC(msg.sender, repoInAddress, assetInAmount, garbiECOutAmount);
    }

    function sellGarbiEquityCertificate(address repoOutAddress, uint256 garbiECInAmount) public nonReentrant onlyRepoInTheList(repoOutAddress) onlyWhitelist {
        require(garbiECInAmount > 0, 'INVALID_GARBIEC_AMOUNT');
        require(repoList[repoOutAddress].share > 0, 'INVALID_REPO');
        
        IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);

        IERC20 base = IERC20(repoOut.base());

        uint256 garbiECUserBalance = GarbiEC.balanceOf(msg.sender);

        if(garbiECInAmount > garbiECUserBalance) {
            garbiECInAmount = garbiECUserBalance;
        }

        uint256 baseOutAmount = getDataToSellGarbiEC(repoOutAddress, garbiECInAmount);
        
        require(baseOutAmount > 0, 'INVALID_OUT_AMUNT_ZERO');
        require(baseOutAmount <= repoOut.getCapacityByToken(), 'INVALID_OUT_AMOUNT');

        uint256 fee = baseOutAmount.mul(getSellGarbiECDynamicFee(repoOutAddress, baseOutAmount, SELL_GARBIEC_FEE)).div(10000);
        uint256 baseOutAmountAfterFee = baseOutAmount.sub(fee);

        //make trade
        GarbiEC.transferFrom(msg.sender, address(this), garbiECInAmount);
        GarbiEC.burn(garbiECInAmount);
        repoOut.withdrawBaseToRepositoryManager(baseOutAmount);
        base.transfer(msg.sender, repoOut.convertToBaseDecimal(baseOutAmountAfterFee, 18));
        //transfer fee
        base.transfer(platformFundAddress, repoOut.convertToBaseDecimal(fee, 18));

        emit onSellGarbiEC(msg.sender, repoOutAddress, baseOutAmountAfterFee, garbiECInAmount);
    }

    function swapTokenToTokenWithTokenInput(address repoInAddress, address repoOutAddress, uint256 tokenInputAmount, uint256 minTokenOutputAmount) public onlyRepoInTheList(repoInAddress) onlyRepoInTheList(repoOutAddress) nonReentrant onlyWhitelist whenNotPaused {
        require(repoInAddress != repoOutAddress, 'INVALID_PAIR');
        require(tokenInputAmount > 0, 'INVALID_TOKEN_INPUT_AMOUNT');
        require(minTokenOutputAmount > 0, 'INVALID_MIN_TOKEN_OUTPUT_AMOUNT');

        IGarbiRepository repoIn = IGarbiRepository(repoInAddress);
        IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);
        
        uint256 tokenOutputAmount = getTokenOutputAmountFromTokenInput(repoIn, repoOut, tokenInputAmount);
        require(tokenOutputAmount <= repoOut.getCapacityByToken(), 'INVALID_OUT_AMOUNT');
        require(tokenOutputAmount >= minTokenOutputAmount, 'CAN_NOT_MAKE_TRADE');

        IERC20 baseIn = IERC20(repoIn.base());

        uint256 baseInUserBalance = repoIn.convertDecimalTo18(baseIn.balanceOf(msg.sender), repoIn.baseDecimal());

        require(tokenInputAmount <= baseInUserBalance, 'TOKEN_INPUT_AMOUNT_HIGHER_USER_BALANCE');
        
        //make trade
        makeTradeOnTwoRepos(repoIn, repoOut, tokenInputAmount, tokenOutputAmount);

        emit onSwapTokenToToken(msg.sender, repoInAddress, repoOutAddress, tokenInputAmount, tokenOutputAmount);
    }

    function makeTradeOnTwoRepos(IGarbiRepository repoIn, IGarbiRepository repoOut, uint256 tokenInputAmount, uint256 tokenOutputAmount) private {
        IERC20 baseIn = IERC20(repoIn.base());
        IERC20 baseOut = IERC20(repoOut.base());
        uint256 tokenInputAmountAtTokenDecimal = repoIn.convertToBaseDecimal(tokenInputAmount, 18);
        baseIn.transferFrom(msg.sender, address(this), tokenInputAmountAtTokenDecimal);
        baseIn.transfer(address(repoIn), tokenInputAmountAtTokenDecimal);
        repoOut.withdrawBaseToRepositoryManager(tokenOutputAmount);
        uint256 fee = tokenOutputAmount.mul(getSellGarbiECDynamicFee(address(repoOut), tokenOutputAmount, SWAP_FEE)).div(10000);
        uint256 tokenOutputAmountAfterFee = tokenOutputAmount.sub(fee);
        baseOut.transfer(msg.sender, repoOut.convertToBaseDecimal(tokenOutputAmountAfterFee, 18));
        //transfer fee
        baseOut.transfer(platformFundAddress, repoOut.convertToBaseDecimal(fee, 18));
    }

    function getTokenOutputAmountFromTokenInput(IGarbiRepository repoIn, IGarbiRepository repoOut, uint256 tokenInputAmount) public view returns (uint256) {
        uint256 tokenInputPriceFromOracle = repoIn.getBasePrice();
        uint256 tokenOuputPriceFromOracle = repoOut.getBasePrice();
        uint256 tokenOutputAmount = tokenInputAmount.mul(tokenInputPriceFromOracle).div(tokenOuputPriceFromOracle);
        return tokenOutputAmount;
    }

    function getTokenOutputWithFee(address repoInAddress, address repoOutAddress, uint256 tokenInputAmount) public view returns (uint256) {
        IGarbiRepository repoIn = IGarbiRepository(repoInAddress);
        IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);
        uint256 tokenInputPriceFromOracle = repoIn.getBasePrice();
        uint256 tokenOuputPriceFromOracle = repoOut.getBasePrice();
        uint256 tokenOutputAmount = tokenInputAmount.mul(tokenInputPriceFromOracle).div(tokenOuputPriceFromOracle);
        uint256 fee = tokenOutputAmount.mul(getSellGarbiECDynamicFee(repoOutAddress, tokenOutputAmount, SWAP_FEE)).div(10000);
        uint256 tokenOutputAmountAfterFee = tokenOutputAmount.sub(fee);
        return tokenOutputAmountAfterFee;
    }

    function getGarbiECPrice() public view returns(uint256 garbiECPrice) {
        uint256 totalCapacityByUSD = 0;
        for (uint i = 0; i < repoAddresses.length; i++) {
            if(repoList[repoAddresses[i]].share > 0) {
                IGarbiRepository repo = IGarbiRepository(repoAddresses[i]);
                totalCapacityByUSD = totalCapacityByUSD.add(repo.getCapacityByUSD());
            }
        }

        uint256 garbiECTotalSupply = GarbiEC.totalSupply();

        if(garbiECTotalSupply == 0) {
            garbiECPrice = 1e18;
        }
        else {
            garbiECPrice = totalCapacityByUSD.mul(1e18).div(garbiECTotalSupply);
        }
    }

    function getDataToBuyGarbiEC(address repoInAddress, uint256 assetInAmount) public view returns (uint256 garbiECOutAmount) {
       uint256 garbiECPrice = getGarbiECPrice();
       IGarbiRepository repoIn = IGarbiRepository(repoInAddress);

       uint256 assetPrice = repoIn.getBasePrice();

       garbiECOutAmount = assetInAmount.mul(assetPrice).div(garbiECPrice);
    }

    function getDataToSellGarbiEC(address repoOutAddress, uint256 garbiECInAmount) public view returns (uint256 assetOutAmount) {
       uint256 garbiECPrice = getGarbiECPrice();
       IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);

       uint256 assetPrice = repoOut.getBasePrice();

       assetOutAmount = garbiECInAmount.mul(garbiECPrice).div(assetPrice);
       
       if(assetOutAmount > repoOut.getCapacityByToken()) {
            assetOutAmount = 0;
       }
    }

    function getDataToSellGarbiECWithFee(address repoOutAddress, uint256 garbiECInAmount) public view returns (uint256 assetOutAmountAfterFee) {
       uint256 garbiECPrice = getGarbiECPrice();
       IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);

       uint256 assetPrice = repoOut.getBasePrice();

       uint256 assetOutAmount = garbiECInAmount.mul(garbiECPrice).div(assetPrice);

       uint256 fee = assetOutAmount.mul(getSellGarbiECDynamicFee(repoOutAddress, assetOutAmount, SELL_GARBIEC_FEE)).div(10000);
       assetOutAmountAfterFee = assetOutAmount.sub(fee);
       
       if(assetOutAmount > repoOut.getCapacityByToken()) {
            assetOutAmountAfterFee = 0;
       }
    }

    function getTotalAllRepoCapacityByUSD() public view returns (uint256 totalCapacityByUSD) {
        for (uint i = 0; i < repoAddresses.length; i++) {
            if(repoList[repoAddresses[i]].share > 0) {
                IGarbiRepository repo = IGarbiRepository(repoAddresses[i]);
                totalCapacityByUSD = totalCapacityByUSD.add(repo.getCapacityByUSD());
            }
        }
    }

    function getSellGarbiECDynamicFee(address repoOutAddress, uint256 assetOutAmount, uint256 baseFee) public view returns (uint256 fee) {
        uint256 totalCapacityByUSD = getTotalAllRepoCapacityByUSD();
        IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);
        uint256 repoOutTotalCapacityByUSD = repoOut.getCapacityByUSD();
        uint256 assetOutAmountByUSD = assetOutAmount.mul(repoOut.getBasePrice()).div(10**18);
        uint256 repoShareAfterOut = repoOutTotalCapacityByUSD.sub(assetOutAmountByUSD).mul(totalShares).div(totalCapacityByUSD.sub(assetOutAmountByUSD));
        uint256 shareDiff = repoList[repoOutAddress].share.mul(totalShares).div(repoShareAfterOut);
        fee = baseFee.mul(shareDiff).div(totalShares);
    }
}