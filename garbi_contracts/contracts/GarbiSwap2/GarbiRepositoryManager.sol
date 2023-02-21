// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import '../interfaces/IERC20withBurnAndMint.sol';
import '../interfaces/IGarbiRepository.sol';
import '../interfaces/IGarbiswapWhitelist.sol';

contract GarbiRepositoryManager is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    IGarbiswapWhitelist public whitelistContract; 

    uint256 public totalShares = 1000;

    struct RepoInfo {
        uint256 share;
        uint256 maxCapacityLimit;
    }

    // Array of repo addresses
    address[] public repoAddresses;

    mapping(address => RepoInfo) public repoList;    

    IERC20withBurnAndMint public GarbiEC;

    uint256 SELL_GARBIEC_FEE = 35; //35/10000 = 0.35%

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
            require(whitelistContract.whitelisted(msg.sender) == true, 'INVALID_WHITELIST');
        }
        _;
    }

    // Events
    event onAddRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit);
    event onUpdateRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit); 
    event onBuyGarbiEC(address user, address repoInAddress, uint256 assetInAmount, uint256 garbiECOutAmount);
    event onSellGarbiEC(address user, address repoOutAddress, uint256 assetOutAmount, uint256 garbiECInAmount);

    constructor(
        IERC20withBurnAndMint garbiECContract
    ){
        GarbiEC = garbiECContract;
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

        if(assetInAmount > baseUserBalance) {
            assetInAmount = baseUserBalance;
        }
        
        uint256 garbiECOutAmount = getDataToBuyGarbiEC(repoInAddress, assetInAmount);

        //make trade
        base.transferFrom(msg.sender, address(this), assetInAmount);
        GarbiEC.mint(address(this), garbiECOutAmount);
        base.transfer(repoInAddress, assetInAmount);
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
        uint256 fee = baseOutAmount.mul(getSellGarbiECDynamicFee(repoOutAddress, baseOutAmount)).div(10000);
        uint256 baseOutAmountAfterFee = baseOutAmount.sub(fee);

        //make trade
        GarbiEC.transferFrom(msg.sender, address(this), garbiECInAmount);
        GarbiEC.burn(garbiECInAmount);
        repoOut.withdrawBaseToRepositoryManager(baseOutAmount);
        base.transfer(msg.sender, baseOutAmountAfterFee);
        //transfer fee
        base.transfer(platformFundAddress, fee);

        emit onSellGarbiEC(msg.sender, repoOutAddress, baseOutAmountAfterFee, garbiECInAmount);
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
      
    }

    function getSellGarbiECDynamicFee(address repoOutAddress, uint256 assetOutAmount) public view returns (uint256 fee) {
        uint256 totalCapacityByUSD = 0;
        uint256 repoOutTotalCapacityByUSD = 0;
        IGarbiRepository repoOut;
        for (uint i = 0; i < repoAddresses.length; i++) {
            if(repoList[repoAddresses[i]].share > 0) {
                IGarbiRepository repo = IGarbiRepository(repoAddresses[i]);
                totalCapacityByUSD = totalCapacityByUSD.add(repo.getCapacityByUSD());
                if(repoAddresses[i] == repoOutAddress) {
                    repoOutTotalCapacityByUSD = repo.getCapacityByUSD();
                    repoOut = repo;
                }
            }
        }
        uint256 assetPrice = repoOut.getBasePrice();
        uint256 assetOutAmountByUSD = assetOutAmount.mul(assetPrice).div(10**18);
        uint256 repoShareAfterOut = repoOutTotalCapacityByUSD.sub(assetOutAmountByUSD).mul(totalShares).div(totalCapacityByUSD.sub(assetOutAmountByUSD));
        uint256 shareDiff = 0;
        shareDiff = repoList[repoOutAddress].share.mul(totalShares).div(repoShareAfterOut);
        fee = SELL_GARBIEC_FEE.mul(shareDiff).div(totalShares);
    }
}