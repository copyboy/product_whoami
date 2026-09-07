const { ethers } = require("hardhat");

// 部署脚本：网络由 --network 参数决定（不传则用默认 hardhat 本地网络）
//   本地验证：npx hardhat run scripts/deploy.js
//   测试网：  npx hardhat run scripts/deploy.js --network sepolia（需先配置 dapp/.env）
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();

  console.log("Counter deployed to:", await counter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
