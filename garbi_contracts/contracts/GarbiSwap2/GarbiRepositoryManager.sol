// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import '../interfaces/IERC20withBurnAndMint.sol';
import '../interfaces/IGarbiRepository.sol';

contract GarbiRepositoryManager is Ownable {
    using SafeMath for uint256;

    uint256 public totalShares = 1000;

    struct RepoInfo {
        uint256 share;
        uint256 maxCapacityLimit;
    }

    // Array of repo addresses
    address[] public repoAddresses;

    mapping(address => RepoInfo) public repoList;    

    IERC20withBurnAndMint public GarbiEC;

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

    // Events
    event onAddRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit);
    event onUpdateRepository(address repoAddress, uint256 repoShare, uint256 repoMaxCapacityLimit); 
    event onBuyGarbiEC(address user, address repoInAddress, uint256 assetInAmount, uint256 garbiECOutAmount);
    event onSellGarbiEC(address user, address repoOutAddress, uint256 assetOutAmount, uint256 garbiECInAmount);

    constructor(
        IERC20withBurnAndMint garbiECContract
    ){
        GarbiEC = garbiECContract;
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

    function setGarbiEquityCertificateContract(IERC20withBurnAndMint newGarbiECContract) public onlyOwner {
        require(address(newGarbiECContract) != address(0), 'INVALID_DATA');
        GarbiEC = newGarbiECContract;
    }

    function buyGarbiEquityCertificate(address repoInAddress, uint256 assetInAmount) public onlyRepoInTheList(repoInAddress) {
        require(assetInAmount > 0, 'INVALID_ASSET_AMOUNT');
        
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

    function sellGarbiEquityCertificate(address repoOutAddress, uint256 garbiECInAmount) public onlyRepoInTheList(repoOutAddress) {
        require(garbiECInAmount > 0, 'INVALID_GARBIEC_AMOUNT');
        
        IGarbiRepository repoOut = IGarbiRepository(repoOutAddress);

        IERC20 base = IERC20(repoOut.base());

        uint256 garbiECUserBalance = GarbiEC.balanceOf(msg.sender);

        if(garbiECInAmount > garbiECUserBalance) {
            garbiECInAmount = garbiECUserBalance;
        }

        uint256 baseOutAmount = getDataToSellGarbiEC(repoOutAddress, garbiECInAmount);

        //make trade
        GarbiEC.transferFrom(msg.sender, address(this), garbiECInAmount);
        GarbiEC.burn(garbiECInAmount);
        repoOut.withdrawBaseToRepositoryManager(baseOutAmount);
        base.transfer(msg.sender, baseOutAmount);

        emit onSellGarbiEC(msg.sender, repoOutAddress, baseOutAmount, garbiECInAmount);
    }

    function getGarbiECPrice() public view returns(uint256 garbiECPrice) {
        uint256 totalCapacityByUSD = 0;
        for (uint i = 0; i < repoAddresses.length; i++) {
            IGarbiRepository repo = IGarbiRepository(repoAddresses[i]);
            totalCapacityByUSD = totalCapacityByUSD.add(repo.getCapacityByUSD());
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
}