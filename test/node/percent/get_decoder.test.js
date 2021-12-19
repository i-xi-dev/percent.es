import assert from "node:assert";
import { Percent } from "../../../node/index.mjs";

describe("Percent.getDecoder", () => {
  it("getDecoder()", () => {
    const decoder = Percent.getDecoder();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

  });

  it("getDecoder(Object)", () => {
    const decoder1 = Percent.getDecoder({spaceAsPlus:false});
    const decoder2 = Percent.getDecoder({spaceAsPlus:false});
    assert.notStrictEqual(decoder1, decoder2);

    const op = Percent.resolveOptions({spaceAsPlus:false});
    const decoder21 = Percent.getDecoder(op);
    const decoder22 = Percent.getDecoder(op);
    assert.strictEqual(decoder21, decoder22);

  });

});
