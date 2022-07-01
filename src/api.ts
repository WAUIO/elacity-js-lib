import { CHAIN_ID } from "./network/chainId";

export const API_URL: Record<CHAIN_ID, string> = {
  [CHAIN_ID.MAINNET]: "https://ela.city/api",
  [CHAIN_ID.TESTNET]: "https://staging.ela.city/api",
};
