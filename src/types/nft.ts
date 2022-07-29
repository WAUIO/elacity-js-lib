interface INFTUploadResult {
  jsonHash: string;
  fileHash?: string;
  status?: 'success' | 'failed'
}

export interface INFTUploader {
  /**
   * Process the upload of a NFT
   * 
   * @param data 
   */
  uploadNFT(data: FormData): Promise<INFTUploadResult>;
}