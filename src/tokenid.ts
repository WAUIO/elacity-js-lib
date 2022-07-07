import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ObjectTokenID } from "src/types/tokenid";

export interface ITokenID {
  toString(): string;
}

/**
 * Represents a tokenID overall the system
 */
export class TokenID implements ITokenID {
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
   * Output a bignumber value, we mainly use .hexTokenID as its value 
   * is always ensured except if it's null (0x00)
   * 
   * @returns 
   */
  toBigNumber(): BigNumberish {
    return BigNumber.from(this.hexTokenID)
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
   * Ouput the hexadecimal value
   * 
   * @returns 
   */
  toHex() {
    return this.hexTokenID;
  }

  /**
   * Convert tokenID into interger as string
   * 
   * @returns 
   */
  toString(): string {
    return this.toBigNumber().toString();
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
