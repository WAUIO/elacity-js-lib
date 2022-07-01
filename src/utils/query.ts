import { TokenID } from "../tokenid";
import { ObjectTokenID } from "../types";

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

export const tokenIDQueryFilter = (tokenID: string | number) => {
  const t = TokenID.from(tokenID);

  if (t.isBig) {
    return tokenIDHexQueryFilter(t.hexTokenID);
  }

  return tokenIDNumberQueryFilter(t.tokenID);
};
