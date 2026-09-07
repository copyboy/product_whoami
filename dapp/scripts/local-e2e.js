// 本地端到端冒烟脚本：复刻 dapp/frontend/index.html 的数据流，全程无浏览器
//   provider 连 http://127.0.0.1:8545 → 读 count 基线 → 以 Hardhat #0 开发账户
//   签名 increment → 等 1 个确认 → 复读 count = 基线+1 → 从 receipt 日志回读
//   CountChanged(who, newValue) → 全部断言通过 exit 0，任一步失败非零退出并打印差异。
//
// 用法（先起节点并部署）：
//   npx hardhat node                                                # 终端 1
//   npx hardhat run scripts/deploy.js --network localhost           # 终端 2，记下合约地址
//   node scripts/local-e2e.js 0x<部署输出的合约地址>
//
// 密钥说明：下面的私钥是 Hardhat 文档公开的内置开发账户 #0 的测试夹具，
// 对应本地模拟网络账户，全网公开且无任何真实资产——真实私钥永远只进 .env。
const { ethers } = require("ethers");

const HARDHAT_ACCOUNT0_PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const LOCAL_RPC_URL = "http://127.0.0.1:8545";

// 与 dapp/contracts/Counter.sol 及 frontend/config.js 一致的最小 human ABI
const COUNTER_ABI = [
  "function increment() external",
  "function decrement() external",
  "function getCount() view returns (uint256)",
  "function count() view returns (uint256)",
  "event CountChanged(address indexed who, uint256 newValue)",
];

const steps = [];
function assert(cond, label, detail) {
  steps.push([cond, label, detail]);
  if (!cond) {
    console.error("FAIL  " + label + (detail ? "  → " + detail : ""));
    for (const [ok, name, d] of steps) {
      console.error((ok ? "  ok  " : "FAIL  ") + name + (d ? "  → " + d : ""));
    }
    process.exit(1);
  }
  console.log("  ok  " + label + (detail ? "  → " + detail : ""));
}

async function main() {
  const contractAddress = process.argv[2];
  if (!contractAddress || !ethers.isAddress(contractAddress)) {
    console.error("用法: node scripts/local-e2e.js <合约地址>");
    process.exit(1);
  }

  // 1. provider 连本地节点（等价于前端里 MetaMask 注入的 window.ethereum）
  const provider = new ethers.JsonRpcProvider(LOCAL_RPC_URL);
  const network = await provider.getNetwork();
  assert(
    Number(network.chainId) === 31337,
    "provider 连上本地节点 (chainId 31337)",
    "chainId = " + network.chainId
  );

  // 2. 实例化合约（Hardhat #0 公开夹具账户签名）
  const signer = new ethers.Wallet(HARDHAT_ACCOUNT0_PRIVATE_KEY, provider);
  console.log("签名账户 (Hardhat #0):", signer.address);
  const counter = new ethers.Contract(contractAddress, COUNTER_ABI, signer);

  // 3. 读 count 基线（view 调用，不发交易）
  const baseline = await counter.getCount();
  assert(true, "读取 count 基线", "count = " + baseline);

  // 4. 发 increment 写交易并等待 1 个确认
  const tx = await counter.increment();
  console.log("交易 hash:", tx.hash);
  const receipt = await tx.wait(1);
  assert(
    receipt.status === 1,
    "increment 交易已确认 (1 block)",
    "block = " + receipt.blockNumber + ", status = " + receipt.status
  );

  // 5. 复读 count = 基线 + 1
  const after = await counter.getCount();
  assert(
    after === baseline + 1n,
    "确认后复读 count = 基线 + 1",
    baseline + " → " + after
  );

  // 6. 从 receipt 日志回读 CountChanged(who, newValue)
  let event = null;
  for (const log of receipt.logs) {
    try {
      const parsed = counter.interface.parseLog(log);
      if (parsed && parsed.name === "CountChanged") {
        event = { who: parsed.args.who, newValue: parsed.args.newValue };
      }
    } catch {
      /* 非本合约话题的日志，跳过 */
    }
  }
  assert(event !== null, "receipt 日志解析出 CountChanged 事件");
  assert(
    event && ethers.getAddress(event.who) === signer.address,
    "事件参数 who == 签名账户",
    event ? event.who + " == " + signer.address : "无事件"
  );
  assert(
    event && event.newValue === after,
    "事件参数 newValue == 复读值",
    event ? event.newValue + " == " + after : "无事件"
  );

  console.log("ALL PASS: 读 → 写 → 确认 → 事件回读 全链路验证通过");
}

main().catch((error) => {
  console.error("E2E 执行异常:", error.message || error);
  process.exit(1);
});
