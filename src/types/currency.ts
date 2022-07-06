export interface SwapConvert {
  address: string;
  rate: number;
}

export interface Currency {
  address: string;
  symbol: string;
  decimals: number;
  isWrapped?: boolean;
  preferred?: boolean;
  logo?: string;
  chainId: number;
  swapSupports?: SwapConvert[];
}

export interface SwapableTokenPrompt {
  swap?: boolean;
}