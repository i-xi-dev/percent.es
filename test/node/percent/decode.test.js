import assert from "node:assert";
import { Percent } from "../../../node/index.mjs";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

describe("Percent.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Percent.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = Percent.decode("1%00 !~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));

    const decoded21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded21]), "[3,2,1,0,255,254,253,252]");
    const decoded22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded22]), "[3,32,2,1,0,255,254,253,252]");
    const decoded23 = Percent.decode("1%00%20!~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded23]), JSON.stringify([...utf8Bytes1]));

    const decoded41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded41]), "[3,32,2,1,0,255,254,253,252]");
    const decoded42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    assert.strictEqual(JSON.stringify([...decoded42]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = Percent.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    assert.strictEqual(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      Percent.decode("あ");
    }, {
      message: "decode error (1)"
    });

    const decoded55 = Percent.decode("%%65A");
    assert.strictEqual(JSON.stringify([...decoded55]), "[37,101,65]");

    const decoded56 = Percent.decode("%41");
    assert.strictEqual(JSON.stringify([...decoded56]), "[65]");

    const decoded57 = Percent.decode("%ff");
    assert.strictEqual(JSON.stringify([...decoded57]), "[255]");

    const decoded57b = Percent.decode("%FF");
    assert.strictEqual(JSON.stringify([...decoded57b]), "[255]");

    const decoded57c = Percent.decode("%f");
    assert.strictEqual(JSON.stringify([...decoded57c]), "[37,102]");

    const decoded57d = Percent.decode("%fff");
    assert.strictEqual(JSON.stringify([...decoded57d]), "[255,102]");

  });

  it("decode(string, {spaceAsPlus:true})", () => {
    const decoded11 = Percent.decode("", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = Percent.decode("1%00 !~%7F%E3%81%82%2B", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));
    const decoded13b = Percent.decode("1%00+!~%7F%E3%81%82%2B", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded13b]), JSON.stringify([...utf8Bytes1]));

    const decoded31 = Percent.decode("%03+%02%01%00%FF%FE%FD%FC", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded31]), "[3,32,2,1,0,255,254,253,252]");
    const decoded32 = Percent.decode("%03+%02%01%00%FF%FE%FD%2B%FC", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded32]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded33 = Percent.decode("1%00+!~%7F%E3%81%82%2B", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded33]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", {spaceAsPlus:true});
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      Percent.decode("あ", {spaceAsPlus:true});
    }, {
      message: "decode error (1)"
    });

  });

  it("decode(string, {encodeSet:[...]})", () => {
    const op = {encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]};

    const decoded11 = Percent.decode("", op);
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", op);
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = Percent.decode("1%00 !~%7F%E3%81%82+", op);
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));

    const decoded21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", op);
    assert.strictEqual(JSON.stringify([...decoded21]), "[3,2,1,0,255,254,253,252]");
    const decoded22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", op);
    assert.strictEqual(JSON.stringify([...decoded22]), "[3,32,2,1,0,255,254,253,252]");
    const decoded23 = Percent.decode("1%00%20!~%7F%E3%81%82+", op);
    assert.strictEqual(JSON.stringify([...decoded23]), JSON.stringify([...utf8Bytes1]));

    const decoded41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", op);
    assert.strictEqual(JSON.stringify([...decoded41]), "[3,32,2,1,0,255,254,253,252]");
    const decoded42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC", op);
    assert.strictEqual(JSON.stringify([...decoded42]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = Percent.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+", op));
    assert.strictEqual(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", op);
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      Percent.decode("あ", op);
    }, {
      message: "decode error (1)"
    });

    const decoded55 = Percent.decode("%%65A", op);
    assert.strictEqual(JSON.stringify([...decoded55]), "[37,101,65]");

    const decoded56 = Percent.decode("%41", op);
    assert.strictEqual(JSON.stringify([...decoded56]), "[65]");

    const decoded57 = Percent.decode("%ff", op);
    assert.strictEqual(JSON.stringify([...decoded57]), "[255]");

    const decoded57b = Percent.decode("%FF", op);
    assert.strictEqual(JSON.stringify([...decoded57b]), "[255]");

    const decoded57c = Percent.decode("%f", op);
    assert.strictEqual(JSON.stringify([...decoded57c]), "[37,102]");

    const decoded57d = Percent.decode("%fff", op);
    assert.strictEqual(JSON.stringify([...decoded57d]), "[255,102]");

  });

});
