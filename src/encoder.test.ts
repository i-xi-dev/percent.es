import { expect } from '@esm-bundle/chai';
import { Percent } from "./index";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

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

describe("Percent.Encoder.prototype.encode", () => {
  it("Percent.Encoder()/encode", () => {
    const encoder = new Percent.Encoder();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC))).to.equal("%03%02%01%00%FF%FE%FD%FC");
    expect(encoder.encode(utf8Bytes1)).to.equal("%31%00%20%21%7E%7F%E3%81%82%2B");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");
    expect(encoder.encode(Uint8Array.of(0))).to.equal("%00");
    expect(encoder.encode(Uint8Array.of(0,32,65))).to.equal("%00%20%41");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");

  });

  it("Percent.Encoder({encodeSet:[]})/encode", () => {
    const encoder = new Percent.Encoder({encodeSet:[]});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC))).to.equal("%03%02%01%00%FF%FE%FD%FC");
    expect(encoder.encode(utf8Bytes1)).to.equal("1%00 !~%7F%E3%81%82+");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");
    expect(encoder.encode(Uint8Array.of(0))).to.equal("%00");
    expect(encoder.encode(Uint8Array.of(0,32,65))).to.equal("%00 A");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");

  });

  it("Percent.Encoder({encodeSet:[...]})/encode", () => {
    const encoder = new Percent.Encoder({encodeSet:[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(utf8Bytes1)).to.equal("1%00%20!~%7F%E3%81%82+");

  });

  it("Percent.Encoder({encodeSet:[...]})/encode", () => {
    const encoder = new Percent.Encoder({encodeSet:[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(utf8Bytes1)).to.equal("1%00%20!~%7F%E3%81%82%2B");
    expect(encoder.encode(Uint8Array.of(0,32,65))).to.equal("%00%20A");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");

    expect(encoder.encode(utf8Bytes1)).to.equal(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));

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
    expect(encoder.encode(x1)).to.equal(globalThis.encodeURIComponent(x1b));

    expect(encoder.encode(x2bUtf8)).to.equal(globalThis.encodeURIComponent(x2b));

  });

  it("Percent.Encoder({encodeSet:[...],spaceAsPlus:true})/encode", () => {
    const encoder = new Percent.Encoder({encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ],spaceAsPlus:true});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(utf8Bytes1)).to.equal("1%00+%21%7E%7F%E3%81%82%2B");
    expect(encoder.encode(Uint8Array.of(0,32,65))).to.equal("%00+A");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("%FF");

    const usp = new URLSearchParams();
    usp.set("p1", "1\u{0} !~\u{7F}あ+");
    expect(encoder.encode(utf8Bytes1)).to.equal(usp.toString().substring(3));

    const u = new URL("http://example.com/");
    u.searchParams.set("p1", x2b);
    const e = u.search.replace("?p1=", "");
    expect(encoder.encode(x2bUtf8)).to.equal(e);

  });

  it("Percent.Encoder({encodeSet:[],spaceAsPlus:true})/encode", () => {

    expect(() => {
      const encoder = new Percent.Encoder({encodeSet:[],spaceAsPlus:true});
      encoder.encode(Uint8Array.of());
    }).to.throw(RangeError, "options.encodeSet, options.spaceAsPlus").with.property("name", "RangeError");

  });

});

describe("Percent.Encoder.get", () => {
  it("get()", () => {
    const encoder = Percent.Encoder.get();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC))).to.equal("%03%02%01%00%FF%FE%FD%FC");

  });

  it("get(Object)", () => {
    const encoder1 = Percent.Encoder.get({spaceAsPlus:true});
    const encoder2 = Percent.Encoder.get({spaceAsPlus:false});
    expect(encoder1).to.not.equal(encoder2);

    const encoder21 = Percent.Encoder.get({spaceAsPlus:false});
    const encoder22 = Percent.Encoder.get({spaceAsPlus:false});
    expect(encoder21).to.equal(encoder22);

  });

});
