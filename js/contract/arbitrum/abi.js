$.ABI = function() {
};
$.ABI.prototype = (function() {
	var setting = {};
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			setting = $.extend({}, setting, options);
		},
		getBalanceInfoABI() {
			return [{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"contract IERC20[]","name":"_tokens","type":"address[]"}],"name":"getData","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct BalanceInfo.TokenBALANCE[]","name":"tokensBal_","type":"tuple[]"},{"internalType":"uint256","name":"nativeBal_","type":"uint256"}],"stateMutability":"view","type":"function"}];
		},
		getPriceInfoABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_token",
							"type": "address"
						},
						{
							"internalType": "contract IChainlinkAggregatorV3",
							"name": "_chainlinkAggregator",
							"type": "address"
						}
					],
					"name": "setChainlinkAggregator",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"name": "chainlinkAggregatorOf",
					"outputs": [
						{
							"internalType": "contract IChainlinkAggregatorV3",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address[]",
							"name": "_tokens",
							"type": "address[]"
						}
					],
					"name": "getData",
					"outputs": [
						{
							"components": [
								{
									"internalType": "address",
									"name": "token",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "price",
									"type": "uint256"
								}
							],
							"internalType": "struct PriceInfo.Price[]",
							"name": "data_",
							"type": "tuple[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_token",
							"type": "address"
						}
					],
					"name": "getPrice",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "owner",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];
		},
		getAllowTransferABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_owner",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "_spender",
							"type": "address"
						},
						{
							"internalType": "contract IERC20[]",
							"name": "_tokens",
							"type": "address[]"
						}
					],
					"name": "getData",
					"outputs": [
						{
							"components": [
								{
									"internalType": "address",
									"name": "token",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"internalType": "struct AllowTransferInfo.Allow[]",
							"name": "data_",
							"type": "tuple[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];
		},
		getTokenABI() {
			return [{"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
		},
		getProtocolLiquidityLaunchABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_payAmt",
							"type": "uint256"
						}
					],
					"name": "buy",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "disable",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "enable",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract IERC20",
							"name": "_token",
							"type": "address"
						}
					],
					"name": "moveFund",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract IERC20",
							"name": "_grb",
							"type": "address"
						}
					],
					"name": "setGRBToken",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "setHardCapPerUser",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "setTotalPrivateSale",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_newOwner",
							"type": "address"
						}
					],
					"name": "transferOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract IERC20",
							"name": "_grb",
							"type": "address"
						},
						{
							"internalType": "contract IERC20",
							"name": "_usdc",
							"type": "address"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": false,
							"internalType": "address",
							"name": "_user",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_payAmt",
							"type": "uint256"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_grbReceive",
							"type": "uint256"
						}
					],
					"name": "onBuy",
					"type": "event"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_user",
							"type": "address"
						},
						{
							"internalType": "uint8",
							"name": "_status",
							"type": "uint8"
						}
					],
					"name": "setIsPrivateSale",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "setMinBuy",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "setSalePrice",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract IERC20",
							"name": "_usdc",
							"type": "address"
						}
					],
					"name": "setUSDCToken",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"stateMutability": "payable",
					"type": "receive"
				},
				{
					"inputs": [],
					"name": "ENABLE",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_user",
							"type": "address"
						}
					],
					"name": "getData",
					"outputs": [
						{
							"internalType": "uint256[9]",
							"name": "data_",
							"type": "uint256[9]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_user",
							"type": "address"
						}
					],
					"name": "getMaxBuyOf",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "getTotalSale",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "getUSDCBalance",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "GRB",
					"outputs": [
						{
							"internalType": "contract IERC20",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "HARD_CAP_PER_USER",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"name": "isPrivateSale",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "MIN_BUY",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "owner",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "salePrice",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"name": "totalBoughtOf",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "totalPrivateSale",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "totalPurchased",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "USDC",
					"outputs": [
						{
							"internalType": "contract IERC20",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "VERSION",
					"outputs": [
						{
							"internalType": "uint8",
							"name": "",
							"type": "uint8"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];
		},
		getLaunchDataABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "contract ISaleLaunch",
							"name": "_cPrivateSale",
							"type": "address"
						},
						{
							"internalType": "contract ISaleLaunch",
							"name": "_cPublicSale",
							"type": "address"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"inputs": [],
					"name": "ContractPrivateSale",
					"outputs": [
						{
							"internalType": "contract ISaleLaunch",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "ContractPublicSale",
					"outputs": [
						{
							"internalType": "contract ISaleLaunch",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_user",
							"type": "address"
						}
					],
					"name": "getData",
					"outputs": [
						{
							"components": [
								{
									"internalType": "uint256",
									"name": "uUSDCBal",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uMaxGrbBuy",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uMaxUSDCPay",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "cUSDCBal",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "totalSale",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "salePrice",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "totalPurchased",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "allowed",
									"type": "uint256"
								}
							],
							"internalType": "struct ProtocolLaunchData.SaleLaunch[2]",
							"name": "data_",
							"type": "tuple[2]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "owner",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract ISaleLaunch",
							"name": "_cPrivateSale",
							"type": "address"
						}
					],
					"name": "setContractPrivateSale",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract ISaleLaunch",
							"name": "_cPublicSale",
							"type": "address"
						}
					],
					"name": "setContractPublicSale",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_newOwner",
							"type": "address"
						}
					],
					"name": "transferOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				}
			];
		},
		getGarbiSwapInfoABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_owner",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "_tradeMachine",
							"type": "address"
						},
						{
							"internalType": "contract IGarbiswapTrade[]",
							"name": "_lps",
							"type": "address[]"
						}
					],
					"name": "getData",
					"outputs": [
						{
							"components": [
								{
									"internalType": "uint256",
									"name": "baseReserve",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "tokenReserve",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "totalLP",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uLPBal",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uBaseAllowedToPair",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uTokenAllowedToPair",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uBaseAllowedToTradeMachine",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uTokenAllowedToTradeMachine",
									"type": "uint256"
								}
							],
							"internalType": "struct GarbiswapTradeInfo.LP[]",
							"name": "data_",
							"type": "tuple[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];
		},
		getGecExchangeInfoABI() {
			return [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"contract IGarbiRepositoryManager","name":"repositoryManager","type":"address"},{"internalType":"contract IERC20","name":"GECTOKEN","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"contract IGarbiRepository","name":"usdtRepo","type":"address"},{"internalType":"contract IGarbiRepository","name":"usdcRepo","type":"address"},{"internalType":"contract IGarbiRepository","name":"daiRepo","type":"address"}],"name":"getData","outputs":[{"internalType":"uint256","name":"gecPrice","type":"uint256"},{"internalType":"uint256","name":"gecTotalSupply","type":"uint256"},{"internalType":"uint256","name":"gecInUserWallet","type":"uint256"},{"internalType":"uint256","name":"repoUSDTPrice","type":"uint256"},{"internalType":"uint256","name":"repoDAIPrice","type":"uint256"},{"internalType":"uint256","name":"repoUSDCPrice","type":"uint256"},{"internalType":"uint256","name":"repoUSDTTotalToken","type":"uint256"},{"internalType":"uint256","name":"repoUSDCTotalToken","type":"uint256"},{"internalType":"uint256","name":"repoDAITotalToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gecInputAmount","type":"uint256"},{"internalType":"contract IGarbiRepositoryManager","name":"repositoryManager","type":"address"},{"internalType":"contract IGarbiRepository","name":"usdtRepo","type":"address"},{"internalType":"contract IGarbiRepository","name":"usdcRepo","type":"address"},{"internalType":"contract IGarbiRepository","name":"daiRepo","type":"address"}],"name":"getSellGECFees","outputs":[{"internalType":"uint256","name":"repoUSDTSellGECFee","type":"uint256"},{"internalType":"uint256","name":"repoUSDCSellGECFee","type":"uint256"},{"internalType":"uint256","name":"repoDAISellGECFee","type":"uint256"}],"stateMutability":"view","type":"function"}]
		},
		getGarbiOracleABI() {
			return [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getLatestPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"priceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"contract AggregatorV3Interface","name":"_priceFeed","type":"address"}],"name":"setPriceFeedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
		},
		getGarbiSwapABI() {
			return [{"inputs":[{"internalType":"contract IERC20","name":"_base","type":"address"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"contract IGarbiTimeLock","name":"_garbiTimeLockContract","type":"address"},{"internalType":"contract IGarbiswapFeeMachine","name":"_feeMachineContract","type":"address"},{"internalType":"contract IGarbiswapWhitelist","name":"_whitelistContract","type":"address"},{"internalType":"contract IGarbiOracle","name":"_garbiOracle","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintLP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onAddLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmout","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onRemoveLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapBaseToTokenWithBaseInput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"maxBaseInput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapBaseToTokenWithTokenOutput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"maxTokenInput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapTokenToBaseWithBaseOutput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapTokenToBaseWithTokenInput","type":"event"},{"inputs":[],"name":"PLATFORM_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRADE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minLP","type":"uint256"},{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"maxTokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"base","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"convertDecimal18to6","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"convertDecimal6to18","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeMachineContract","outputs":[{"internalType":"contract IGarbiswapFeeMachine","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"garbiOracle","outputs":[{"internalType":"contract IGarbiOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"garbiTimeLockContract","outputs":[{"internalType":"contract IGarbiTimeLock","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getBaseInputAmountFromTokenOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getBaseOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getBaseOutputAmountFromTokenInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"}],"name":"getDataFromBaseInputToAddLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getDataFromTokenInputToAddLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountLP","type":"uint256"}],"name":"getDataToRemoveLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getTokenInputAmountFromBaseOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"}],"name":"getTokenOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getTokenOutputAmountFromBaseInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platformFundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountLP","type":"uint256"},{"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setFeeMachineContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPlatformFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setPlatformFundAdress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setTradeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWhitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapBaseToTokenWithBaseInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxBaseInput","type":"uint256"},{"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapBaseToTokenWithTokenOutput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxTokenInput","type":"uint256"},{"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokenToBaseWithBaseOutput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokenToBaseWithTokenInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistContract","outputs":[{"internalType":"contract IGarbiswapWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
		},
		getTradeMachineABI() {
			return [{"inputs":[{"internalType":"contract IERC20","name":"_vegrb","type":"address"},{"internalType":"contract IGarbiswapWhitelist","name":"_whitelistContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onDistributeGarbi","type":"event"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"addPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"contract IGarbiswapTradePair","name":"pair","type":"address"}],"name":"approveWithPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"token1InputAmount","type":"uint256"},{"internalType":"contract IGarbiswapTradePair","name":"token1Pair","type":"address"},{"internalType":"contract IGarbiswapTradePair","name":"token2Pair","type":"address"}],"name":"getTokenOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"removePair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IGarbiswapWhitelist","name":"_whitelistContract","type":"address"}],"name":"setWhitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"token1InputAmount","type":"uint256"},{"internalType":"uint256","name":"minToken2Output","type":"uint256"},{"internalType":"contract IGarbiswapTradePair","name":"token1Pair","type":"address"},{"internalType":"contract IGarbiswapTradePair","name":"token2Pair","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokenToTokenWithTokenInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"veGRB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistContract","outputs":[{"internalType":"contract IGarbiswapWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
		},
		getGarbiFarmPoolABI() {
			return [{"inputs":[{"internalType":"contract IGarbiMining","name":"_miningMachine","type":"address"},{"internalType":"contract IERC20","name":"_want","type":"address"},{"internalType":"uint256","name":"_pidOfMining","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"}],"name":"onCancelTransactions","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onEmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"},{"indexed":false,"internalType":"string","name":"_fieldName","type":"string"},{"indexed":false,"internalType":"address","name":"_value","type":"address"}],"name":"onQueuedTransactionsChangeAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"},{"indexed":false,"internalType":"string","name":"_fieldName","type":"string"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"onQueuedTransactionsChangeUint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[],"name":"GRACE_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"}],"name":"cancelTransactions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"delay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getData","outputs":[{"internalType":"uint256","name":"miningSpeed_","type":"uint256"},{"internalType":"uint256","name":"userWantBal_","type":"uint256"},{"internalType":"uint256","name":"totalMintPerDay_","type":"uint256"},{"internalType":"uint256","name":"userETHBal_","type":"uint256"},{"internalType":"uint256","name":"userGRBPending_","type":"uint256"},{"internalType":"uint256","name":"userWantShare_","type":"uint256"},{"internalType":"uint256","name":"tvl_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"_pendingVeGRB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"miningMachine","outputs":[{"internalType":"contract IGarbiMining","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pidOfMining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"},{"internalType":"string","name":"_fieldName","type":"string"},{"internalType":"address","name":"_newAddr","type":"address"}],"name":"queuedTransactionsChangeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"},{"internalType":"string","name":"_fieldName","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"queuedTransactionsChangeUint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"delay_","type":"uint256"}],"name":"setDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setMiningMachine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPidOfMining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"shareOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"timeLockOf","outputs":[{"internalType":"bool","name":"queuedTransactions","type":"bool"},{"internalType":"uint256","name":"timeOfExecute","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
		},
        getGarbiVestGRBABI() {
                return [{"inputs":[{"internalType":"contract IERC20","name":"_grb","type":"address"},{"internalType":"contract IERC20withBurn","name":"_veGrb","type":"address"},{"internalType":"contract IGarbiswapWhitelist","name":"_whitelistContract","type":"address"},{"internalType":"contract IGarbiTimeLock","name":"_garbiTimeLockContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onDeposit","type":"event"},{"inputs":[],"name":"GRB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTAGE_GRB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claimGRB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_veGRBAmount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"garbiTimeLockContract","outputs":[{"internalType":"contract IGarbiTimeLock","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getBlockFrom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"userVeGRBBalance","type":"uint256"},{"internalType":"uint256","name":"userGRBCanClaim","type":"uint256"},{"internalType":"uint256","name":"vestFinished","type":"uint256"},{"internalType":"uint256","name":"lastVestCaculated","type":"uint256"},{"internalType":"uint256","name":"veGRBDeposited","type":"uint256"},{"internalType":"uint256","name":"blocknow","type":"uint256"},{"internalType":"uint256","name":"contractGRBBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserPendingGRB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserVeGRBBalance","outputs":[{"internalType":"uint256","name":"userVeGRBBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWhitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"updateUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userGRBAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLastVestCaculated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVeGRBConvertToGRB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVeGRBDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVestFinished","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veGRB","outputs":[{"internalType":"contract IERC20withBurn","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistContract","outputs":[{"internalType":"contract IGarbiswapWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        },
        getGarbiStakeGRBABI() {
            return [{"inputs":[{"internalType":"contract IGarbiMining","name":"_miningMachine","type":"address"},{"internalType":"contract IERC20","name":"_want","type":"address"},{"internalType":"uint256","name":"_pidOfMining","type":"uint256"},{"internalType":"uint256","name":"_blockToUnlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"}],"name":"onCancelTransactions","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onEmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"},{"indexed":false,"internalType":"string","name":"_fieldName","type":"string"},{"indexed":false,"internalType":"address","name":"_value","type":"address"}],"name":"onQueuedTransactionsChangeAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_functionName","type":"string"},{"indexed":false,"internalType":"string","name":"_fieldName","type":"string"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"onQueuedTransactionsChangeUint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[],"name":"BLOCK_TO_UNLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GRACE_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"}],"name":"cancelTransactions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"delay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getData","outputs":[{"internalType":"uint256","name":"miningSpeed_","type":"uint256"},{"internalType":"uint256","name":"userWantBal_","type":"uint256"},{"internalType":"uint256","name":"totalMintPerDay_","type":"uint256"},{"internalType":"uint256","name":"userETHBal_","type":"uint256"},{"internalType":"uint256","name":"userVeGRBPending_","type":"uint256"},{"internalType":"uint256","name":"userWantShare_","type":"uint256"},{"internalType":"uint256","name":"tvl_","type":"uint256"},{"internalType":"uint256","name":"userWithdrawalTime","type":"uint256"},{"internalType":"uint256","name":"blockNow","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"_pendingVeGRB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"miningMachine","outputs":[{"internalType":"contract IGarbiMining","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pidOfMining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platformFundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"},{"internalType":"string","name":"_fieldName","type":"string"},{"internalType":"address","name":"_newAddr","type":"address"}],"name":"queuedTransactionsChangeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_functionName","type":"string"},{"internalType":"string","name":"_fieldName","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"queuedTransactionsChangeUint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blockToUnlock","type":"uint256"}],"name":"setBlockToUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"delay_","type":"uint256"}],"name":"setDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setMiningMachine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPidOfMining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_platformFee","type":"uint256"}],"name":"setPlatformFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setPlatformFundAdress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"shareOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"timeLockOf","outputs":[{"internalType":"bool","name":"queuedTransactions","type":"bool"},{"internalType":"uint256","name":"timeOfExecute","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"withdrawalAvailabilityBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        },
        getGarbiRepositoryManagerABI() {
            return [{"inputs":[{"internalType":"contract IERC20withBurnAndMint","name":"garbiECContract","type":"address"},{"internalType":"contract IGarbiswapWhitelist","name":"whitelistContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"repoAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"repoShare","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repoMaxCapacityLimit","type":"uint256"}],"name":"onAddRepository","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"repoInAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"assetInAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"garbiECOutAmount","type":"uint256"}],"name":"onBuyGarbiEC","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"repoOutAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"assetOutAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"garbiECInAmount","type":"uint256"}],"name":"onSellGarbiEC","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"repoInAddress","type":"address"},{"indexed":false,"internalType":"address","name":"repoOutAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"}],"name":"onSwapTokenToToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"repoAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"repoShare","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repoMaxCapacityLimit","type":"uint256"}],"name":"onUpdateRepository","type":"event"},{"inputs":[],"name":"GarbiEC","outputs":[{"internalType":"contract IERC20withBurnAndMint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoAddress","type":"address"},{"internalType":"uint256","name":"repoShare","type":"uint256"},{"internalType":"uint256","name":"repoMaxCapacityLimit","type":"uint256"}],"name":"addRepository","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"baseToRepo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoInAddress","type":"address"},{"internalType":"uint256","name":"assetInAmount","type":"uint256"}],"name":"buyGarbiEquityCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"repoInAddress","type":"address"},{"internalType":"uint256","name":"assetInAmount","type":"uint256"}],"name":"getDataToBuyGarbiEC","outputs":[{"internalType":"uint256","name":"garbiECOutAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"garbiECInAmount","type":"uint256"}],"name":"getDataToSellGarbiEC","outputs":[{"internalType":"uint256","name":"assetOutAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"garbiECInAmount","type":"uint256"}],"name":"getDataToSellGarbiECWithFee","outputs":[{"internalType":"uint256","name":"assetOutAmountAfterFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"assetOutAmount","type":"uint256"}],"name":"getFeeWithOutAmount","outputs":[{"internalType":"uint256","name":"sellGarbiECfee","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGarbiECPrice","outputs":[{"internalType":"uint256","name":"garbiECPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"assetOutAmount","type":"uint256"},{"internalType":"uint256","name":"baseFee","type":"uint256"}],"name":"getSellGarbiECDynamicFee","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IGarbiRepository","name":"repoIn","type":"address"},{"internalType":"contract IGarbiRepository","name":"repoOut","type":"address"},{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getTokenOutputAmountFromTokenInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoInAddress","type":"address"},{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getTokenOutputWithFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalAllRepoCapacityByUSD","outputs":[{"internalType":"uint256","name":"totalCapacityByUSD","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platformFundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"repoAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"repoList","outputs":[{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"uint256","name":"maxCapacityLimit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"garbiECInAmount","type":"uint256"}],"name":"sellGarbiEquityCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20withBurnAndMint","name":"newGarbiECContract","type":"address"}],"name":"setGarbiEquityCertificateContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setPlatformFundAdress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSellGarbiECFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newTotalShares","type":"uint256"}],"name":"setTotalShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"repoInAddress","type":"address"},{"internalType":"address","name":"repoOutAddress","type":"address"},{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"minTokenOutputAmount","type":"uint256"}],"name":"swapTokenToTokenWithTokenInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"repoAddress","type":"address"},{"internalType":"uint256","name":"repoShare","type":"uint256"},{"internalType":"uint256","name":"repoMaxCapacityLimit","type":"uint256"}],"name":"updateRepository","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelist","outputs":[{"internalType":"contract IGarbiswapWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        },
        getNonfungiblePositionManagerABI() {
        	return [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManager.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"createAndInitializePoolIfNecessary","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
        },
        getGarbiFarmUniV3ABI() {
        	return [{"inputs":[{"internalType":"contract IGarbiMining","name":"_miningMachine","type":"address"},{"internalType":"contract IERC721","name":"_want","type":"address"},{"internalType":"address","name":"_uniswapV3Pool","type":"address"},{"internalType":"uint256","name":"_pidOfMining","type":"uint256"},{"internalType":"address","name":"_positionManager","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickLower","type":"int24"},{"internalType":"int24","name":"_tickUpper","type":"int24"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"onDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getData","outputs":[{"internalType":"uint256","name":"miningSpeed_","type":"uint256"},{"internalType":"uint256","name":"totalMintPerDay_","type":"uint256"},{"internalType":"uint256","name":"userGRBPending_","type":"uint256"},{"internalType":"uint256","name":"tvl_","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalBalance0","type":"uint256"},{"internalType":"uint256","name":"totalBalance1","type":"uint256"},{"internalType":"uint160","name":"currentPrice","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getNFTTokenInfo","outputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"token0Amount","type":"uint256"},{"internalType":"uint256","name":"token1Amount","type":"uint256"},{"internalType":"bool","name":"inPriceRange","type":"bool"},{"internalType":"string","name":"tokenURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNFTTokensWithPair","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"_pendingVeGRB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isCurrentPriceInRange","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"miningMachine","outputs":[{"internalType":"contract IGarbiMining","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pidOfMining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolTickLower","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolTickUpper","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"positionManager","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setMiningMachine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPidOfMining","type":"uint256"}],"name":"setPidOfMining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int24","name":"newTickLower","type":"int24"},{"internalType":"int24","name":"newTickUpper","type":"int24"}],"name":"setPoolTicks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setPositionManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newToken0","type":"address"},{"internalType":"address","name":"newToken1","type":"address"}],"name":"setTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setUniswapV3Pool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setWantToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"shareOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV3Pool","outputs":[{"internalType":"contract IUniswapV3Pool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfoTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        },
        getERC20ABI() {
            return [{"inputs":[{"internalType":"uint256","name":"_maxSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"miningMachine","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_miningMachine","type":"address"}],"name":"setMiningMachine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        },
        getBridgeABI() {
        	return [{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"address[]","name":"initialRelayers","type":"address[]"},{"internalType":"uint256","name":"initialRelayerThreshold","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"destinationDomainID","type":"uint8"},{"indexed":false,"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"handlerResponse","type":"bytes"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"lowLevelData","type":"bytes"}],"name":"FailedHandlerExecution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"originDomainID","type":"uint8"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"},{"indexed":false,"internalType":"enum Bridge.ProposalStatus","name":"status","type":"uint8"},{"indexed":false,"internalType":"bytes32","name":"dataHash","type":"bytes32"}],"name":"ProposalEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"originDomainID","type":"uint8"},{"indexed":false,"internalType":"uint64","name":"depositNonce","type":"uint64"},{"indexed":false,"internalType":"enum Bridge.ProposalStatus","name":"status","type":"uint8"},{"indexed":false,"internalType":"bytes32","name":"dataHash","type":"bytes32"}],"name":"ProposalVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"relayer","type":"address"}],"name":"RelayerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"relayer","type":"address"}],"name":"RelayerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newThreshold","type":"uint256"}],"name":"RelayerThresholdChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_RELAYERS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RELAYER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"_depositCounts","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_domainID","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_expiry","outputs":[{"internalType":"uint40","name":"","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_fee","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint72","name":"destNonce","type":"uint72"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"address","name":"relayer","type":"address"}],"name":"_hasVotedOnProposal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_relayerThreshold","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_resourceIDToHandlerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_totalRelayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"relayerAddress","type":"address"}],"name":"adminAddRelayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"adminChangeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newThreshold","type":"uint256"}],"name":"adminChangeRelayerThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminPauseTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"relayerAddress","type":"address"}],"name":"adminRemoveRelayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"adminSetBurnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"name":"adminSetDepositNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"},{"internalType":"bool","name":"valid","type":"bool"}],"name":"adminSetForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"bytes4","name":"depositFunctionSig","type":"bytes4"},{"internalType":"uint256","name":"depositFunctionDepositerOffset","type":"uint256"},{"internalType":"bytes4","name":"executeFunctionSig","type":"bytes4"}],"name":"adminSetGenericResource","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"adminSetResource","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminUnpauseTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handlerAddress","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"adminWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"}],"name":"cancelProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"destinationDomainID","type":"uint8"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bool","name":"revertOnFail","type":"bool"}],"name":"executeProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"originDomainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"}],"name":"getProposal","outputs":[{"components":[{"internalType":"enum Bridge.ProposalStatus","name":"_status","type":"uint8"},{"internalType":"uint200","name":"_yesVotes","type":"uint200"},{"internalType":"uint8","name":"_yesVotesTotal","type":"uint8"},{"internalType":"uint40","name":"_proposedBlock","type":"uint40"}],"internalType":"struct Bridge.Proposal","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"getRoleMemberIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"relayer","type":"address"}],"name":"isRelayer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isValidForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"renounceAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable[]","name":"addrs","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"transferFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"domainID","type":"uint8"},{"internalType":"uint64","name":"depositNonce","type":"uint64"},{"internalType":"bytes32","name":"resourceID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"voteProposal","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        },
        getCyberCreditABI() {
        	return [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addressReceive","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EventClaimToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"addressRecieve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressRecieve","type":"address"}],"name":"DeleteRecieveAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recieveAddress","type":"address"}],"name":"SetRecieveAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isRecieve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        },
	};
}(jQuery));
