import { BigNumber } from "@ethersproject/bignumber";
import { ObjectTokenID } from "./types";

/**
 * Represents a tokenID overall the system
 */
export class TokenID {
  readonly tokenID: number;
  readonly hexTokenID: string;
  readonly isBig: boolean;

  constructor(hexValue: string, numValue: number) {
    this.hexTokenID = hexValue ?? BigNumber.from(numValue || 0).toHexString();
    this.tokenID = numValue ?? 0;
    this.isBig = BigNumber.from(hexValue).gt(
      Number.MAX_SAFE_INTEGER.toString()
    );
    if (!this.tokenID && !this.isBig) {
      // console.warn('[TokenID] num value not defined, trying to build from hex value');
      this.tokenID = parseInt(this.hexTokenID, 16);
    }
  }

  /**
   * Output a JSON value
   *
   * @returns
   */
  toJSON(): ObjectTokenID {
    return {
      tokenID: this.tokenID,
      hexTokenID: this.hexTokenID,
    };
  }

  /**
   * Create from a generic value hex, string, number (coming from blockchain events especially)
   *
   * @param input
   * @returns
   */
  static from(input: string | number): TokenID {
    const num = BigNumber.from(input);
    if (num.lte(Number.MAX_SAFE_INTEGER.toString())) {
      return new TokenID(num.toHexString(), num.toNumber());
    }

    return new TokenID(num.toHexString(), 0);
  }

  /**
   * Resurrect a TokenID from an object representation (from DB for example)
   *
   * tokenID could be empty or Zero, in that case hex value will be most accurate (.isBig = true)
   * hexTokenID could be empty (for those one set before 2022-06-23), number value is most accurate (.isBig = false)
   *
   * @param ObjectTokenID param0
   * @returns
   */
  static fromObject({ hexTokenID, tokenID: id }: ObjectTokenID) {
    return new TokenID(BigNumber.from(hexTokenID || id).toHexString(), id);
  }
}
