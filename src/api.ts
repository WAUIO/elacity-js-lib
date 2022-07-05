import { ChainID } from "./network/chainId";

export const API_URL: Record<ChainID, string> = {
  [ChainID.MAINNET]: "https://ela.city/api",
  [ChainID.TESTNET]: "https://staging.ela.city/api",
};
