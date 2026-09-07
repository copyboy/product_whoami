export interface ConceptMeta {
  name: string;
  nameEn: string;
  description?: string;
  phaseId?: number;
  color?: string;
}

export const conceptMeta: Record<string, ConceptMeta> = {
  'web3':        { name: 'Web3',           nameEn: 'Decentralized Web',                    phaseId: 0 },
  'blockchain':  { name: '区块链',          nameEn: 'Blockchain',                           phaseId: 1 },
  'bitcoin':     { name: '比特币',          nameEn: 'Bitcoin',                              phaseId: 1, color: 'indigo' },
  'ethereum':     { name: '以太坊',          nameEn: 'Ethereum',                             phaseId: 2, color: 'purple' },
  'defi':        { name: 'DeFi',           nameEn: 'Decentralized Finance',                 phaseId: 4, color: 'amber' },
  'nft':         { name: 'NFT',            nameEn: 'Non-Fungible Token',                   phaseId: 3, color: 'emerald' },
  'dao':         { name: 'DAO',            nameEn: 'Decentralized Autonomous Organization', phaseId: 5, color: 'pink' },
  'layer1':      { name: 'Layer1',         nameEn: 'Layer 1 Blockchain',                   phaseId: 1 },
  'layer2':      { name: 'Layer2',         nameEn: 'Layer 2 Scaling',                      phaseId: 2 },
  'solidity':    { name: 'Solidity',       nameEn: 'Solidity Language',                    phaseId: 3 },
  'evm':         { name: 'EVM',           nameEn: 'Ethereum Virtual Machine',              phaseId: 2 },
  'smart-contract': { name: '智能合约',     nameEn: 'Smart Contract',                       phaseId: 2 },
  'gas':         { name: 'Gas',            nameEn: 'Gas Fee',                              phaseId: 2 },
  'depin':       { name: 'DePIN',          nameEn: 'Decentralized Physical Infrastructure', phaseId: 0 },
  'rwa':         { name: 'RWA',            nameEn: 'Real World Assets',                    phaseId: 0 },
  'solana':      { name: 'Solana',          nameEn: 'Solana Blockchain',                    phaseId: 1 },
  'polygon':     { name: 'Polygon',        nameEn: 'Polygon',                              phaseId: 2 },
  'arbitrum':    { name: 'Arbitrum',       nameEn: 'Arbitrum',                             phaseId: 2 },
  'base':        { name: 'Base',           nameEn: 'Base',                                 phaseId: 2 },
  'optimism':    { name: 'Optimism',       nameEn: 'Optimism',                             phaseId: 2 },
  'wallet':      { name: '钱包',           nameEn: 'Wallet',                               phaseId: 0 },
  'metamask':    { name: 'MetaMask',       nameEn: 'MetaMask',                             phaseId: 0 },
  'uniswap':     { name: 'Uniswap',        nameEn: 'Uniswap',                              phaseId: 4 },
  'aave':        { name: 'Aave',           nameEn: 'Aave',                                 phaseId: 4 },
  'amm':         { name: 'AMM',            nameEn: 'Automated Market Maker',                phaseId: 4 },
  'consensus':   { name: '共识机制',       nameEn: 'Consensus Mechanism',                  phaseId: 1 },
  'pow':         { name: 'PoW',            nameEn: 'Proof of Work',                        phaseId: 1 },
  'pos':         { name: 'PoS',            nameEn: 'Proof of Stake',                        phaseId: 2 },
  'utxo':        { name: 'UTXO',           nameEn: 'Unspent Transaction Output',            phaseId: 1, color: 'indigo' },
  '节点':        { name: '节点',            nameEn: 'Bitcoin Network Nodes',                 phaseId: 1, color: 'indigo' },
};

export function getConceptMeta(slug: string): ConceptMeta | undefined {
  return conceptMeta[slug.toLowerCase()];
}

export function getPhaseColor(phaseId: number | undefined): string {
  const colors: Record<number, string> = {
    1: 'indigo',
    2: 'purple',
    3: 'emerald',
    4: 'amber',
    5: 'pink',
  };
  return phaseId ? colors[phaseId] || 'indigo' : 'indigo';
}
