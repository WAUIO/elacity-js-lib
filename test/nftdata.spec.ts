import { createNFTFromRaw } from "../src";

describe("Testing `createNFTData` helper", () => {
  describe("Create NFT data from raw json", () => {
    it("should result into correct tokenID", () => {
      const t = createNFTFromRaw({ tokenID: 1, anotherKey: 'test' });
      expect(t.tokenID.toJSON()).toEqual(
        expect.objectContaining({
          tokenID: 1,
          hexTokenID: '0x01',
        })
      );
    });

    it("should result into correct siblings data (no loss)", () => {
      expect(createNFTFromRaw({ tokenID: 1, anotherKey: 'test' })).toEqual(
        expect.objectContaining({
          anotherKey: 'test',
        })
      );
    });
  });
});
