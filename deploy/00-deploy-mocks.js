//this is used to deploy the mockV3Aggregator so that we can get the price feed on loacl network and hardhat network as well
const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");
module.exports = async () => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let fundMe;
  if (developmentChains.includes(network.name)) {
    log("LOCAL NETWORK DETECTED!!! DEPLOYING MOCKS>>>>>>>>>>");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("MOCKS DEPLOYED>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    log("*****************************************************************")
  }
};

module.exports.tags=["all","mocks"]