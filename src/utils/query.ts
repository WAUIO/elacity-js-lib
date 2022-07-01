import { TokenID } from "../tokenid";

export const tokenIDNumberQueryFilter = (tokenID: number) => {
  return {
    tokenID,
  };
};

export const tokenIDHexQueryFilter = (hexTokenID: string) => {
  return {
    hexTokenID,
  };
};

export const tokenIDObjectQueryFilter = (t: TokenID) => {
  if (t.isBig) {
    return tokenIDHexQueryFilter(t.hexTokenID);
  }

  return tokenIDNumberQueryFilter(t.tokenID);
};

export const tokenIDQueryFilter = (tokenID: string | number) => {
  return tokenIDObjectQueryFilter(TokenID.from(tokenID));
};
