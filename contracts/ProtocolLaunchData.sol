// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

interface ISaleLaunch {
	function getData(address _user) external view returns(
        uint256 uUSDCBal_,
        uint256 uMaxGrbBuy_,
        uint256 uMaxUSDCPay_,
        uint256 cUSDCBal_,
        uint256 totalSale_,
        uint256 salePrice_,
        uint256 totalPurchased_,
        uint256 allowed_
    );
}

contract ProtocolLaunchData {
	address public owner;

	struct SaleLaunch {
		uint256 uUSDCBal;
        uint256 uMaxGrbBuy;
        uint256 uMaxUSDCPay;
        uint256 cUSDCBal;
        uint256 totalSale;
        uint256 salePrice;
        uint256 totalPurchased;
        uint256 allowed;
	}

	ISaleLaunch public ContractPrivateSale;
	ISaleLaunch public ContractPublicSale;

	modifier onlyOwner() {
        require(msg.sender == owner, "INVALID_PERMISSION");
        _;
    }
    constructor(
    	ISaleLaunch _cPrivateSale,
    	ISaleLaunch _cPublicSale
    ) {
        ContractPrivateSale = _cPrivateSale;
        ContractPublicSale = _cPublicSale;

        owner = msg.sender;
    }
    function setContractPrivateSale(ISaleLaunch _cPrivateSale) public onlyOwner {
    	ContractPrivateSale = _cPrivateSale;
    }
    function setContractPublicSale(ISaleLaunch _cPublicSale) public onlyOwner {
    	ContractPublicSale = _cPublicSale;
    }
    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
    /**
     * data_[0] private sale
     * data_[1] public sale
     */
    function getData(address _user) external view returns(SaleLaunch[2] memory data_) {
    	(
    		data_[0].uUSDCBal,
	        data_[0].uMaxGrbBuy,
	        data_[0].uMaxUSDCPay,
	        data_[0].cUSDCBal,
	        data_[0].totalSale,
	        data_[0].salePrice,
	        data_[0].totalPurchased,
	        data_[0].allowed
    	) = ContractPrivateSale.getData(_user);
    	(
    		data_[1].uUSDCBal,
	        data_[1].uMaxGrbBuy,
	        data_[1].uMaxUSDCPay,
	        data_[1].cUSDCBal,
	        data_[1].totalSale,
	        data_[1].salePrice,
	        data_[1].totalPurchased,
	        data_[1].allowed
    	) = ContractPublicSale.getData(_user);
    }
}