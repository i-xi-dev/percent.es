import assert from "node:assert";
import { Percent } from "../../../node/index.mjs";

describe("Percent.getEncoder", () => {
  it("getEncoder()", () => {
    const encoder = Percent.getEncoder();

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC)), "%03%02%01%00%FF%FE%FD%FC");

  });

  it("getEncoder(Object)", () => {
    const encoder1 = Percent.getEncoder({spaceAsPlus:false});
    const encoder2 = Percent.getEncoder({spaceAsPlus:false});
    assert.notStrictEqual(encoder1, encoder2);

    const op = Percent.resolveOptions({spaceAsPlus:false});
    const encoder21 = Percent.getEncoder(op);
    const encoder22 = Percent.getEncoder(op);
    assert.strictEqual(encoder21, encoder22);

  });

});
