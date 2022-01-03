import assert from "node:assert";
import { Percent } from "./percent";

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
      name: "TypeError",
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
      name: "TypeError",
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
    const decoded43 = Percent.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"), op);
    assert.strictEqual(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

    const decoded52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", op);
    assert.strictEqual(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

    assert.throws(() => {
      Percent.decode("あ", op);
    }, {
      name: "TypeError",
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

const x2 = Uint8Array.of(
  0,1,2,3,4,5,6,7,8,9,
  10,11,12,13,14,15,16,17,18,19,
  20,21,22,23,24,25,26,27,28,29,
  30,31,32,33,34,35,36,37,38,39,
  40,41,42,43,44,45,46,47,48,49,
  50,51,52,53,54,55,56,57,58,59,
  60,61,62,63,64,65,66,67,68,69,
  70,71,72,73,74,75,76,77,78,79,
  80,81,82,83,84,85,86,87,88,89,
  90,91,92,93,94,95,96,97,98,99,
  100,101,102,103,104,105,106,107,108,109,
  110,111,112,113,114,115,116,117,118,119,
  120,121,122,123,124,125,126,127,128,129,
  130,131,132,133,134,135,136,137,138,139,
  140,141,142,143,144,145,146,147,148,149,
  150,151,152,153,154,155,156,157,158,159,
  160,161,162,163,164,165,166,167,168,169,
  170,171,172,173,174,175,176,177,178,179,
  180,181,182,183,184,185,186,187,188,189,
  190,191,192,193,194,195,196,197,198,199,
  200,201,202,203,204,205,206,207,208,209,
  210,211,212,213,214,215,216,217,218,219,
  220,221,222,223,224,225,226,227,228,229,
  230,231,232,233,234,235,236,237,238,239,
  240,241,242,243,244,245,246,247,248,249,
  250,251,252,253,254,255
);
const x2b = Array.from(x2, (i)=>String.fromCharCode(i)).join("");
const x2bUtf8 = new TextEncoder().encode(x2b);

describe("Percent.encode", () => {
  it("encode(Uint8Array)", () => {
    assert.strictEqual(Percent.encode(Uint8Array.of()), "");
    assert.strictEqual(Percent.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC)), "%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(Percent.encode(utf8Bytes1), "%31%00%20%21%7E%7F%E3%81%82%2B");
    assert.strictEqual(Percent.encode(Uint8Array.of(255)), "%FF");
    assert.strictEqual(Percent.encode(Uint8Array.of(0)), "%00");
    assert.strictEqual(Percent.encode(Uint8Array.of(0,32,65)), "%00%20%41");
    assert.strictEqual(Percent.encode(Uint8Array.of(255)), "%FF");

  });

  it("encode(Uint8Array, {encodeSet:[]})", () => {
    assert.strictEqual(Percent.encode(Uint8Array.of(), {encodeSet:[]}), "");
    assert.strictEqual(Percent.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC), {encodeSet:[]}), "%03%02%01%00%FF%FE%FD%FC");
    assert.strictEqual(Percent.encode(utf8Bytes1, {encodeSet:[]}), "1%00 !~%7F%E3%81%82+");
    assert.strictEqual(Percent.encode(Uint8Array.of(255), {encodeSet:[]}), "%FF");
    assert.strictEqual(Percent.encode(Uint8Array.of(0), {encodeSet:[]}), "%00");
    assert.strictEqual(Percent.encode(Uint8Array.of(0,32,65), {encodeSet:[]}), "%00 A");
    assert.strictEqual(Percent.encode(Uint8Array.of(255), {encodeSet:[]}), "%FF");

  });

  it("encode(Uint8Array, {encodeSet:[...]})", () => {
    const op = {encodeSet:[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]};

    assert.strictEqual(Percent.encode(Uint8Array.of(), op), "");
    assert.strictEqual(Percent.encode(utf8Bytes1, op), "1%00%20!~%7F%E3%81%82+");

  });

  it("encode(Uint8Array, {encodeSet:[...]})", () => {
    const op = {encodeSet:[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]};

    assert.strictEqual(Percent.encode(Uint8Array.of(), op), "");
    assert.strictEqual(Percent.encode(utf8Bytes1, op), "1%00%20!~%7F%E3%81%82%2B");
    assert.strictEqual(Percent.encode(Uint8Array.of(0,32,65), op), "%00%20A");
    assert.strictEqual(Percent.encode(Uint8Array.of(255), op), "%FF");

    assert.strictEqual(Percent.encode(utf8Bytes1, op), globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));

    const x1 = Uint8Array.of(
      0,1,2,3,4,5,6,7,8,9,
      10,11,12,13,14,15,16,17,18,19,
      20,21,22,23,24,25,26,27,28,29,
      30,31,32,33,34,35,36,37,38,39,
      40,41,42,43,44,45,46,47,48,49,
      50,51,52,53,54,55,56,57,58,59,
      60,61,62,63,64,65,66,67,68,69,
      70,71,72,73,74,75,76,77,78,79,
      80,81,82,83,84,85,86,87,88,89,
      90,91,92,93,94,95,96,97,98,99,
      100,101,102,103,104,105,106,107,108,109,
      110,111,112,113,114,115,116,117,118,119,
      120,121,122,123,124,125,126,127
    );
    const x1b = Array.from(x1, (i)=>String.fromCharCode(i)).join("");
    assert.strictEqual(Percent.encode(x1, op), globalThis.encodeURIComponent(x1b));

    assert.strictEqual(Percent.encode(x2bUtf8, op), globalThis.encodeURIComponent(x2b));

  });

  it("encode(Uint8Array, {encodeSet:[...],spaceAsPlus:true})", () => {
    const op = {encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ],spaceAsPlus:true};

    assert.strictEqual(Percent.encode(Uint8Array.of(), op), "");
    assert.strictEqual(Percent.encode(utf8Bytes1, op), "1%00+%21%7E%7F%E3%81%82%2B");
    assert.strictEqual(Percent.encode(Uint8Array.of(0,32,65), op), "%00+A");
    assert.strictEqual(Percent.encode(Uint8Array.of(255), op), "%FF");

    const usp = new URLSearchParams();
    usp.set("p1", "1\u{0} !~\u{7F}あ+");
    assert.strictEqual(Percent.encode(utf8Bytes1, op), usp.toString().substring(3));

    const u = new URL("http://example.com/");
    u.searchParams.set("p1", x2b);
    const e = u.search.replace("?p1=", "");
    assert.strictEqual(Percent.encode(x2bUtf8, op), e);

  });

  it("encode(Uint8Array, {encodeSet:[],spaceAsPlus:true})", () => {
    const op = {encodeSet:[],spaceAsPlus:true};

    assert.throws(() => {
      Percent.encode(Uint8Array.of(), op);
    }, {
      name: "RangeError",
      message: "options.encodeSet, options.spaceAsPlus"
    });

  });

});
