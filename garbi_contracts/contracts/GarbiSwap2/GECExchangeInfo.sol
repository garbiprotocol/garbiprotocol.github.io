// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import '../interfaces/IGarbiRepositoryManager.sol';
import '../interfaces/IGarbiRepository.sol';

contract GECExchangeInfo{
    using SafeMath for uint256;
    constructor(
        
    ) {
        
    }

    function getData(IGarbiRepositoryManager repositoryManager, IERC20 GECTOKEN, address user, IGarbiRepository usdtRepo, IGarbiRepository usdcRepo, IGarbiRepository daiRepo) public view returns (uint256 gecPrice, uint256 gecTotalSupply, uint256 gecInUserWallet, uint256 repoUSDTPrice, uint256 repoDAIPrice, uint256 repoUSDCPrice, uint256 repoUSDTTotalToken, uint256 repoUSDCTotalToken, uint256 repoDAITotalToken) {
        gecPrice = repositoryManager.getGarbiECPrice();
        gecTotalSupply = GECTOKEN.totalSupply();
        gecInUserWallet = GECTOKEN.balanceOf(user);
        repoUSDTPrice = usdtRepo.getBasePrice();
        repoUSDCPrice = usdcRepo.getBasePrice();
        repoDAIPrice = daiRepo.getBasePrice();
        repoUSDTTotalToken = usdtRepo.getCapacityByToken();
        repoUSDCTotalToken = usdcRepo.getCapacityByToken();
        repoDAITotalToken = daiRepo.getCapacityByToken();
    }

    function getSellGECFees(uint256 gecInputAmount, IGarbiRepositoryManager repositoryManager, IGarbiRepository usdtRepo, IGarbiRepository usdcRepo, IGarbiRepository daiRepo) public view returns (uint256 repoUSDTSellGECFee, uint256 repoUSDCSellGECFee, uint256 repoDAISellGECFee)  {
        uint256 usdtOutAmount = repositoryManager.getDataToSellGarbiEC(address(usdtRepo), gecInputAmount);
        repoUSDTSellGECFee = repositoryManager.getFeeWithOutAmount(address(usdtRepo), usdtOutAmount);
        uint256 usdcOutAmount = repositoryManager.getDataToSellGarbiEC(address(usdcRepo), gecInputAmount);
        repoUSDCSellGECFee = repositoryManager.getFeeWithOutAmount(address(usdcRepo), usdcOutAmount);
        uint256 daiOutAmount = repositoryManager.getDataToSellGarbiEC(address(daiRepo), gecInputAmount);
        repoDAISellGECFee = repositoryManager.getFeeWithOutAmount(address(daiRepo), daiOutAmount);
    }
}