export enum ChainID {
  TESTNET = 3,
  MAINNET = 20,
}

export interface ChainInfo {
  collection?: string;
  network: string;
  chainId: number;
}