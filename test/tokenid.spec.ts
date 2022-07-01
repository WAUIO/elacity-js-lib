import { TokenID, tokenIDQueryFilter } from "../src";

describe("Testing `TokenID`", () => {
  describe("Parsing value to TokenID", () => {
    it("should parse from Hex value", () => {
      const t = TokenID.from("0x7b");
      expect(t.tokenID).toEqual(123);
      expect(t.isBig).toBe(false);
    });

    it("should parse from string", () => {
      const t = TokenID.from("123");
      expect(t.tokenID).toEqual(123);
      expect(t.hexTokenID).toEqual("0x7b");
      expect(t.isBig).toBe(false);
    });

    it("should parse from int number (< Number.MAX_SAFE_INTEGER)", () => {
      const t = TokenID.from(123);
      expect(t.tokenID).toEqual(123);
      expect(t.hexTokenID).toEqual("0x7b");
      expect(t.isBig).toBe(false);
    });

    it("should resurrect TokenID object from number value in object", () => {
      const t = TokenID.fromObject({ tokenID: 123 });
      expect(t.tokenID).toEqual(123);
      expect(t.hexTokenID).toEqual("0x7b");
      expect(t.isBig).toBe(false);
    });

    it("should resurrect TokenID object from hex value in object", () => {
      const t = TokenID.fromObject({ hexTokenID: "0x7b" });
      expect(t.tokenID).toEqual(123);
      expect(t.hexTokenID).toEqual("0x7b");
      expect(t.isBig).toBe(false);
    });

    it("should overflow for larger number", () => {
      const t = TokenID.from("11111111111111111111111111111");
      expect(t.tokenID).toEqual(0);
      expect(t.hexTokenID).toEqual("0x23e6e54c450cad4f671c71c7");
      expect(t.isBig).toBe(true);
    });
  });

  describe("Build query from a give tokenID object", () => {
    it("should build query with only `tokenID` set", () => {
      expect(tokenIDQueryFilter(1)).toEqual(
        expect.objectContaining({ tokenID: 1 })
      );
    });

    it("should build query with only `tokenID` set even using hex input", () => {
      expect(tokenIDQueryFilter("0x7b")).toEqual(
        expect.objectContaining({ tokenID: 123 })
      );
    });

    it("should build query with only `hexTokenID` set using hex input", () => {
      expect(tokenIDQueryFilter("0x23e6e54c450cad4f671c71c7")).toEqual(
        expect.objectContaining({ hexTokenID: "0x23e6e54c450cad4f671c71c7" })
      );
    });

    it("should build query with only `hexTokenID` set using long int input (as string)", () => {
      expect(tokenIDQueryFilter("11111111111111111111111111111")).toEqual(
        expect.objectContaining({ hexTokenID: "0x23e6e54c450cad4f671c71c7" })
      );
    });
  });
});
