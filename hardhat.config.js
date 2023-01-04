require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL=process.env.RPC_URL||"key"
const PRIVATE_KEY=process.env.PRIVATE_KEY||"key"
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY||"key"
const CMC_API_KEY=process.env.CMC_API_KEY||"key"
module.exports = {
  solidity:{
    compilers:[ {version:"0.8.17"},{version:"0.6.6"}],
  },
  defaultNetwork:"hardhat",
  defaultGasPrice:21000000,
  networks:{
    goerli:{
      url:RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:5,
      blockConfirmations:6,
      timeout:100000,
      gas:2100000,
      gasPrice:800000000,
    },
    localhost:{
      gas:21000000,
      gasPrice:800000000,
    }
  },
    etherscan:{
      apiKey:{
        goerli:ETHERSCAN_API_KEY
      }
    },
    gasReporter:{
      enabled:true,
      outputFile:"gas-report.txt",
      noColors:true,
      currency:"USD",
      coinmarketcap:CMC_API_KEY,
      token:"ETH",
    },
    namedAccounts:{
      deployer:{
        default:0,
      },
      user:{
        defalut:1
      }
  },
  mocha:{
    timeout:100000
  }
};
