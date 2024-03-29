$.GARBI_BRIDGE_ABI = function() {};
$.GARBI_BRIDGE_ABI.prototype = (function() {
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
        },

        GetCyberCreditTokenABI() {
            return [{
                    "inputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
                            "indexed": false,
                            "internalType": "address",
                            "name": "addressReceive",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "EventClaimToken",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
                            "internalType": "address",
                            "name": "addressRecieve",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "ClaimToken",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "addressRecieve",
                        "type": "address"
                    }],
                    "name": "DeleteRecieveAddress",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "recieveAddress",
                        "type": "address"
                    }],
                    "name": "SetRecieveAddress",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }],
                    "name": "burn",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "name": "burnFrom",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "decimals",
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "isRecieve",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "name",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "renounceOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "symbol",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        },

        GetVeGRBTokenABI() {
            return [{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_maxSupply",
                        "type": "uint256"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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

                    ],
                    "name": "MAX_SUPPLY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }],
                    "name": "burn",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "name": "burnFrom",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "decimals",
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "miningMachine",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "mint",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "name",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "renounceOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_miningMachine",
                        "type": "address"
                    }],
                    "name": "setMiningMachine",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "symbol",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalBurned",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        },

        GetGRBTokenABI() {
            return [{
                    "inputs": [{
                            "internalType": "uint256",
                            "name": "_maxSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_initialSupply",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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

                    ],
                    "name": "MAX_SUPPLY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }],
                    "name": "burn",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "name": "burnFrom",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "decimals",
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "mint",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "name",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "renounceOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "symbol",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalBurned",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        },

        GetBridgeContractABI() {
            return [{
                    "inputs": [{
                            "internalType": "uint256",
                            "name": "domainID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address[]",
                            "name": "initialRelayers",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialRelayerThreshold",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "fee",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expiry",
                            "type": "uint256"
                        },
                        {
                            "internalType": "contract IERC20",
                            "name": "GRBcontract",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "uint8",
                            "name": "destinationDomainID",
                            "type": "uint8"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes",
                            "name": "handlerResponse",
                            "type": "bytes"
                        }
                    ],
                    "name": "Deposit",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "lowLevelData",
                        "type": "bytes"
                    }],
                    "name": "FailedHandlerExecution",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "Paused",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "uint8",
                            "name": "originDomainID",
                            "type": "uint8"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "indexed": false,
                            "internalType": "enum GarbiBridge.ProposalStatus",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes32",
                            "name": "dataHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "ProposalEvent",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "uint8",
                            "name": "originDomainID",
                            "type": "uint8"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "indexed": false,
                            "internalType": "enum GarbiBridge.ProposalStatus",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes32",
                            "name": "dataHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "ProposalVote",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "address",
                        "name": "relayer",
                        "type": "address"
                    }],
                    "name": "RelayerAdded",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "address",
                        "name": "relayer",
                        "type": "address"
                    }],
                    "name": "RelayerRemoved",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "newThreshold",
                        "type": "uint256"
                    }],
                    "name": "RelayerThresholdChanged",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        }
                    ],
                    "name": "RoleGranted",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        }
                    ],
                    "name": "RoleRevoked",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "Unpaused",
                    "type": "event"
                },
                {
                    "inputs": [

                    ],
                    "name": "DEFAULT_ADMIN_ROLE",
                    "outputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "GRB",
                    "outputs": [{
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "MAX_RELAYERS",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "RELAYER_ROLE",
                    "outputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "name": "_depositCounts",
                    "outputs": [{
                        "internalType": "uint64",
                        "name": "",
                        "type": "uint64"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "_domainID",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "_expiry",
                    "outputs": [{
                        "internalType": "uint40",
                        "name": "",
                        "type": "uint40"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "_fee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint72",
                            "name": "destNonce",
                            "type": "uint72"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "dataHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "relayer",
                            "type": "address"
                        }
                    ],
                    "name": "_hasVotedOnProposal",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "_relayerThreshold",
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "name": "_resourceIDToHandlerAddress",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "_totalRelayers",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "relayerAddress",
                        "type": "address"
                    }],
                    "name": "adminAddRelayer",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "newFee",
                        "type": "uint256"
                    }],
                    "name": "adminChangeFee",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "newThreshold",
                        "type": "uint256"
                    }],
                    "name": "adminChangeRelayerThreshold",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "adminPauseTransfers",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "relayerAddress",
                        "type": "address"
                    }],
                    "name": "adminRemoveRelayer",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "handlerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "tokenAddress",
                            "type": "address"
                        }
                    ],
                    "name": "adminSetBurnable",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "domainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint64",
                            "name": "nonce",
                            "type": "uint64"
                        }
                    ],
                    "name": "adminSetDepositNonce",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "forwarder",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "valid",
                            "type": "bool"
                        }
                    ],
                    "name": "adminSetForwarder",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "handlerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "contractAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes4",
                            "name": "depositFunctionSig",
                            "type": "bytes4"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depositFunctionDepositerOffset",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes4",
                            "name": "executeFunctionSig",
                            "type": "bytes4"
                        }
                    ],
                    "name": "adminSetGenericResource",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "handlerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "tokenAddress",
                            "type": "address"
                        }
                    ],
                    "name": "adminSetResource",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "adminUnpauseTransfers",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "handlerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "adminWithdraw",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "domainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "dataHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "cancelProposal",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "destinationDomainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "deposit",
                    "outputs": [

                    ],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "domainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bool",
                            "name": "revertOnFail",
                            "type": "bool"
                        }
                    ],
                    "name": "executeProposal",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "originDomainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "dataHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "getProposal",
                    "outputs": [{
                        "components": [{
                                "internalType": "enum GarbiBridge.ProposalStatus",
                                "name": "_status",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint200",
                                "name": "_yesVotes",
                                "type": "uint200"
                            },
                            {
                                "internalType": "uint8",
                                "name": "_yesVotesTotal",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint40",
                                "name": "_proposedBlock",
                                "type": "uint40"
                            }
                        ],
                        "internalType": "struct GarbiBridge.Proposal",
                        "name": "",
                        "type": "tuple"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "role",
                        "type": "bytes32"
                    }],
                    "name": "getRoleAdmin",
                    "outputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "getRoleMember",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "role",
                        "type": "bytes32"
                    }],
                    "name": "getRoleMemberCount",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "getRoleMemberIndex",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "grantRole",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "hasRole",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "relayer",
                        "type": "address"
                    }],
                    "name": "isRelayer",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "isValidForwarder",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "paused",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newAdmin",
                        "type": "address"
                    }],
                    "name": "renounceAdmin",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "renounceRole",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "role",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "revokeRole",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IERC20",
                        "name": "newGRBcontract",
                        "type": "address"
                    }],
                    "name": "setGRBContract",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "transferFee",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint8",
                            "name": "domainID",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint64",
                            "name": "depositNonce",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "voteProposal",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        },

        GetErc20HandleContratABI() {
            return [{
                    "inputs": [{
                        "internalType": "address",
                        "name": "bridgeAddress",
                        "type": "address"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [

                    ],
                    "name": "_bridgeAddress",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "_burnList",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "_contractWhitelist",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "name": "_resourceIDToTokenContractAddress",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "_tokenContractAddressToResourceID",
                    "outputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "depositer",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "deposit",
                    "outputs": [{
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "executeProposal",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "contractAddress",
                        "type": "address"
                    }],
                    "name": "setBurnable",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "bytes32",
                            "name": "resourceID",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "address",
                            "name": "contractAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setResource",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }],
                    "name": "withdraw",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        },

        GetERC20BaseABI() {
            return [{
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [{
                        "name": "",
                        "type": "string"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [{
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [{
                        "name": "",
                        "type": "bool"
                    }],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [{
                        "name": "",
                        "type": "uint256"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [{
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [{
                        "name": "",
                        "type": "bool"
                    }],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [{
                        "name": "",
                        "type": "uint8"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [{
                        "name": "_owner",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "name": "balance",
                        "type": "uint256"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [{
                        "name": "",
                        "type": "string"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [{
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [{
                        "name": "",
                        "type": "bool"
                    }],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [{
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "name": "_spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [{
                        "name": "",
                        "type": "uint256"
                    }],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "fallback"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
            ]
        },

        GetGarbiFarmSingleWETHBridgeABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract IGarbiMining",
                            "name": "_miningMachine",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IETHHandleBridge",
                            "name": "_ETHHandlerBridge",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IWETH",
                            "name": "_want",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_pidOfMining",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "OwnershipTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": false,
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
                    "name": "onCancelTransactions",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "onDeposit",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "onEmergencyWithdraw",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "string",
                            "name": "_functionName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "_fieldName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "_value",
                            "type": "address"
                        }
                    ],
                    "name": "onQueuedTransactionsChangeAddress",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "string",
                            "name": "_functionName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "_fieldName",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "onQueuedTransactionsChangeUint",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "onWithdraw",
                    "type": "event"
                },
                {
                    "inputs": [

                    ],
                    "name": "ETHHandlerBridge",
                    "outputs": [{
                        "internalType": "contract IETHHandleBridge",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "GRACE_PERIOD",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "MAXIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "MINIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "PLATFORM_FEE",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
                    "name": "cancelTransactions",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "changeTokenAddress",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "delay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "emergencyWithdraw",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                            "internalType": "uint256",
                            "name": "miningSpeed_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userWantBal_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalMintPerDay_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userETHBal_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userGRBPending_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userWantShare_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tvl_",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "_pendingVeGRB",
                        "type": "uint256"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "miningMachine",
                    "outputs": [{
                        "internalType": "contract IGarbiMining",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "platformFundAddress",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "string",
                            "name": "_functionName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_fieldName",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "_newAddr",
                            "type": "address"
                        }
                    ],
                    "name": "queuedTransactionsChangeAddress",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "string",
                            "name": "_functionName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_fieldName",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "queuedTransactionsChangeUint",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "renounceOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "delay_",
                        "type": "uint256"
                    }],
                    "name": "setDelay",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "setETHHandlerBridge",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "setMiningMachine",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "setPidOfMining",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_platformFee",
                        "type": "uint256"
                    }],
                    "name": "setPlatformFee",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newAddress",
                        "type": "address"
                    }],
                    "name": "setPlatformFundAdress",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "name": "timeLockOf",
                    "outputs": [{
                            "internalType": "bool",
                            "name": "queuedTransactions",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timeOfExecute",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [

                    ],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IWETH",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "withdraw",
                    "outputs": [

                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                }
            ]
        }
    }
}(jQuery));