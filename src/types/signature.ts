import { Bytes } from '@ethersproject/bytes';

export interface SignatureResult {
  address?: string;
  signature?: string;
}

export type Message = string| Bytes | ((nonce: string | number) => string);
