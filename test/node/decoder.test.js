import assert from "node:assert";
import { PercentDecoder, Percent } from "../../node/index.mjs";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

describe("PercentDecoder.prototype.decode", () => {
  it("PercentDecoder()/decode", () => {
    const decoder = new PercentDecoder();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded21]), "[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded22]), "[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded23]), JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded41]), "[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    assert.strictEqual(JSON.stringify([...decoded42]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    assert.strictEqual(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      message: "decode error (1)"
    });

    const decoded55 = decoder.decode("%%65A");
    assert.strictEqual(JSON.stringify([...decoded55]), "[37,101,65]");

    const decoded56 = decoder.decode("%41");
    assert.strictEqual(JSON.stringify([...decoded56]), "[65]");

    const decoded57 = decoder.decode("%ff");
    assert.strictEqual(JSON.stringify([...decoded57]), "[255]");

    const decoded57b = decoder.decode("%FF");
    assert.strictEqual(JSON.stringify([...decoded57b]), "[255]");

    const decoded57c = decoder.decode("%f");
    assert.strictEqual(JSON.stringify([...decoded57c]), "[37,102]");

    const decoded57d = decoder.decode("%fff");
    assert.strictEqual(JSON.stringify([...decoded57d]), "[255,102]");

  });

  it("PercentDecoder({spaceAsPlus:true})/decode", () => {
    const decoder = new PercentDecoder({spaceAsPlus:true});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82%2B");
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));
    const decoded13b = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    assert.strictEqual(JSON.stringify([...decoded13b]), JSON.stringify([...utf8Bytes1]));

    const decoded31 = decoder.decode("%03+%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded31]), "[3,32,2,1,0,255,254,253,252]");
    const decoded32 = decoder.decode("%03+%02%01%00%FF%FE%FD%2B%FC");
    assert.strictEqual(JSON.stringify([...decoded32]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded33 = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    assert.strictEqual(JSON.stringify([...decoded33]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      message: "decode error (1)"
    });

  });

  it("PercentDecoder({encodeSet:[...]})/decode", () => {
    const decoder = new PercentDecoder({encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded21]), "[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded22]), "[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    assert.strictEqual(JSON.stringify([...decoded23]), JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded41]), "[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    assert.strictEqual(JSON.stringify([...decoded42]), "[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    assert.strictEqual(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      message: "decode error (1)"
    });

    const decoded55 = decoder.decode("%%65A");
    assert.strictEqual(JSON.stringify([...decoded55]), "[37,101,65]");

    const decoded56 = decoder.decode("%41");
    assert.strictEqual(JSON.stringify([...decoded56]), "[65]");

    const decoded57 = decoder.decode("%ff");
    assert.strictEqual(JSON.stringify([...decoded57]), "[255]");

    const decoded57b = decoder.decode("%FF");
    assert.strictEqual(JSON.stringify([...decoded57b]), "[255]");

    const decoded57c = decoder.decode("%f");
    assert.strictEqual(JSON.stringify([...decoded57c]), "[37,102]");

    const decoded57d = decoder.decode("%fff");
    assert.strictEqual(JSON.stringify([...decoded57d]), "[255,102]");

  });

});

describe("PercentDecoder.get", () => {
  it("get()", () => {
    const decoder = PercentDecoder.get();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

  });

  it("get(Object)", () => {
    const decoder1 = PercentDecoder.get({spaceAsPlus:false});
    const decoder2 = PercentDecoder.get({spaceAsPlus:false});
    assert.notStrictEqual(decoder1, decoder2);

    const op = Percent.resolveOptions({spaceAsPlus:false});
    const decoder21 = PercentDecoder.get(op);
    const decoder22 = PercentDecoder.get(op);
    assert.strictEqual(decoder21, decoder22);

  });

});
