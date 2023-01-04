// imports
//main function
//calling of main function

const { verifyMessage } = require("ethers/lib/utils");
const { network } = require("hardhat");
const { verify } = require("../utils/verify.js");
// function deployFunc(){
//     console.log("HI!!")
// }

// module.exports.default = deployFunc
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  let args = [ethUsdPriceFeedAddress];

  //if the contract doesn't exist, we deploy a minimal version for our loacl testing

  //when going for localhost or hardhat network we want to use a mock
  //mock is hardcoding the complex objects which are needed by some objects
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //put price fedd address,
    log: true,
    waitConfirmations: network.config.blockConfirmations||1
  });
  log("************************************************************");
  if (!developmentChains.includes(network.name)) {
    await verify(fundMe.address,args);
  }
};
module.exports.tags = ["all", "fundme"];
