require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  default_network: "goerli",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
