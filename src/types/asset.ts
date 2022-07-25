import { TokenID } from "src/tokenid";

/**
 * Represents an items (from database) that can be liked
 */
export interface LikableNFTAsset {
  name: string;
  imageURL?: string;
  liked: number;
  isLiked?: boolean;
}

export interface RawNFTMinimal {
  _id: string;
  name: string;
  contractAddress: string;
  tokenID?: number;
  hexTokenID: string;
  tokenURI?: string;
  imageURL?: string;
  price?: number;
  paymentToken?: string;
}

export interface NFTMinimal extends Omit<RawNFTMinimal, 'tokenID' | 'hexTokenID'> {
  _id: string;
  name: string;
  contractAddress: string;
  tokenID: TokenID;
  tokenURI?: string;
  imageURL?: string;
  price?: number;
  paymentToken?: string;
}

export interface OwnerInfo {
  address: string;
  _id?: string;
  avatar?: string;
  alias?: string;
  did?: string;
  trustLevel?: number;
  kycOk?: boolean;
}