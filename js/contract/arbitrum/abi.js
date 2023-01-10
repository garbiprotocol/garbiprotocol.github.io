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
			return [
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_account",
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
							"internalType": "struct BalanceInfo.TokenBALANCE[]",
							"name": "tokensBal_",
							"type": "tuple[]"
						},
						{
							"internalType": "uint256",
							"name": "nativeBal_",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				}
			];
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
			return [
				{
					"inputs": [
						{
							"internalType": "string",
							"name": "name_",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "symbol_",
							"type": "string"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "spender",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "value",
							"type": "uint256"
						}
					],
					"name": "Approval",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "value",
							"type": "uint256"
						}
					],
					"name": "Transfer",
					"type": "event"
				},
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
						}
					],
					"name": "allowance",
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
							"name": "_spender",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_amount",
							"type": "uint256"
						}
					],
					"name": "approve",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_addr",
							"type": "address"
						}
					],
					"name": "balanceOf",
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
							"name": "account",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"name": "burn",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "decimals",
					"outputs": [
						{
							"internalType": "uint8",
							"name": "",
							"type": "uint8"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "account",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"name": "mint",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "name",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
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
					"name": "symbol",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "totalSupply",
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
							"name": "_to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_amount",
							"type": "uint256"
						}
					],
					"name": "transfer",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_from",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "_to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_amount",
							"type": "uint256"
						}
					],
					"name": "transferFrom",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "nonpayable",
					"type": "function"
				}
			];
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
									"name": "uBaseAllowed",
									"type": "uint256"
								},
								{
									"internalType": "uint256",
									"name": "uTokenAllowed",
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
		getGarbiSwapABI() {
			return [{"inputs":[{"internalType":"contract IERC20","name":"_base","type":"address"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"contract IGarbiTimeLock","name":"_garbiTimeLockContract","type":"address"},{"internalType":"contract IGarbiswapFeeMachine","name":"_feeMachineContract","type":"address"},{"internalType":"contract IGarbiswapWhitelist","name":"_whitelistContract","type":"address"},{"internalType":"contract IGarbiOracle","name":"_garbiOracle","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintLP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onAddLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmout","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onRemoveLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapBaseToTokenWithBaseInput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"maxBaseInput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapBaseToTokenWithTokenOutput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"maxTokenInput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapTokenToBaseWithBaseOutput","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolBaseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"poolTokenBalance","type":"uint256"}],"name":"onSwapTokenToBaseWithTokenInput","type":"event"},{"inputs":[],"name":"TRADE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minLP","type":"uint256"},{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"maxTokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"base","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeMachineContract","outputs":[{"internalType":"contract IGarbiswapFeeMachine","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"garbiOracle","outputs":[{"internalType":"contract IGarbiOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"garbiTimeLockContract","outputs":[{"internalType":"contract IGarbiTimeLock","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getBaseInputAmountFromTokenOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getBaseOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getBaseOutputAmountFromTokenInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"}],"name":"getDataFromBaseInputToAddLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"}],"name":"getDataFromTokenInputToAddLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountLP","type":"uint256"}],"name":"getDataToRemoveLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getTokenInputAmountFromBaseOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"}],"name":"getTokenOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"tokenReserve","type":"uint256"}],"name":"getTokenOutputAmountFromBaseInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountLP","type":"uint256"},{"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setFeeMachineContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setTradeFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWhitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseInputAmount","type":"uint256"},{"internalType":"uint256","name":"minTokenOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapBaseToTokenWithBaseInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxBaseInput","type":"uint256"},{"internalType":"uint256","name":"tokenOutputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapBaseToTokenWithTokenOutput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxTokenInput","type":"uint256"},{"internalType":"uint256","name":"baseOutputAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokenToBaseWithBaseOutput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenInputAmount","type":"uint256"},{"internalType":"uint256","name":"minBaseOutput","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokenToBaseWithTokenInput","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistContract","outputs":[{"internalType":"contract IGarbiswapWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
		}

	};
}(jQuery));
