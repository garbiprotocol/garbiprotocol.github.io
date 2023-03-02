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
}