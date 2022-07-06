import { TokenID } from './tokenid'

/**
 * Create rich NFT data from a raw json data (from API for example)
 * 
 * @param param0 
 * @returns 
 */
export const createNFTFromRaw = <T extends { tokenID?: number; hexTokenID?: string }>({
  tokenID,
  hexTokenID,
  ...rawData
}: T): Omit<T, 'tokenID' | 'hexTokenID'> & { tokenID: TokenID } => ({
  tokenID: TokenID.fromObject({ tokenID, hexTokenID }),
  ...rawData,
}) 