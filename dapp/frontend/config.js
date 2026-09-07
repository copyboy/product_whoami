// 合约地址配置位 —— 整个前端唯一需要改的地方
//
// 填法：在 dapp/ 目录跑本地节点和部署
//   npx hardhat node                                              # 起 127.0.0.1:8545 (chainId 31337)
//   npx hardhat run scripts/deploy.js --network localhost         # 输出 Counter deployed to: 0x...
// 把输出的那个 0x... 地址填到下面的 CONTRACT_ADDRESS。
//
// 换网络（如 Sepolia）只改这一处：填测试网部署得到的合约地址，
// 并在 MetaMask 里切换到对应网络即可。
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// 与 dapp/contracts/Counter.sol 对应的最小 human ABI
// （increment/decrement/getCount/count 状态变量/CountChanged 事件，够前端用）
const COUNTER_ABI = [
  "function increment() external",
  "function decrement() external",
  "function getCount() view returns (uint256)",
  "function count() view returns (uint256)",
  "event CountChanged(address indexed who, uint256 newValue)",
];
