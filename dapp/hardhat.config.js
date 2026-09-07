require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ quiet: true });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // 本地外部节点别名：npx hardhat node 起的 127.0.0.1:8545（chainId 31337）
    // 供 --network localhost 部署/脚本/前端联调使用；默认 hardhat network 行为不变
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
