const ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "pool",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"name": "customerIdCard",
				"type": "uint256"
			},
			{
				"name": "customerAddr",
				"type": "address"
			},
			{
				"name": "distance",
				"type": "uint256"
			},
			{
				"name": "goods",
				"type": "string"
			},
			{
				"name": "eth",
				"type": "uint256"
			},
			{
				"name": "payIfFail",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"name": "customerIdCard",
				"type": "uint256"
			},
			{
				"name": "customerAddr",
				"type": "address"
			},
			{
				"name": "distance",
				"type": "uint256"
			},
			{
				"name": "goods",
				"type": "string"
			},
			{
				"name": "estimatePrice",
				"type": "uint256"
			}
		],
		"name": "core",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "compensate",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "customerIdCard",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "customerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "distance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "goods",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "eth",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "payIfFail",
				"type": "uint256"
			}
		],
		"name": "onCreateOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "customerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "payIfFail",
				"type": "uint256"
			}
		],
		"name": "onCompensateOrder",
		"type": "event"
	}
]

module.exports = ABI;