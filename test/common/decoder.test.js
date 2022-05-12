import { expect } from '@esm-bundle/chai';
import { Percent } from "../../dist/index.js";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

describe("Percent.Decoder.prototype.decode", () => {
  it("Percent.Decoder()/decode", () => {
    const decoder = new Percent.Decoder();

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded13])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded21])).to.equal("[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded22])).to.equal("[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded23])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded41])).to.equal("[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded42])).to.equal("[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    expect(JSON.stringify([...decoded43])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).to.equal("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    const decoded55 = decoder.decode("%%65A");
    expect(JSON.stringify([...decoded55])).to.equal("[37,101,65]");

    const decoded56 = decoder.decode("%41");
    expect(JSON.stringify([...decoded56])).to.equal("[65]");

    const decoded57 = decoder.decode("%ff");
    expect(JSON.stringify([...decoded57])).to.equal("[255]");

    const decoded57b = decoder.decode("%FF");
    expect(JSON.stringify([...decoded57b])).to.equal("[255]");

    const decoded57c = decoder.decode("%f");
    expect(JSON.stringify([...decoded57c])).to.equal("[37,102]");

    const decoded57d = decoder.decode("%fff");
    expect(JSON.stringify([...decoded57d])).to.equal("[255,102]");

  });

  it("Percent.Decoder({spaceAsPlus:true})/decode", () => {
    const decoder = new Percent.Decoder({spaceAsPlus:true});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded13])).to.equal(JSON.stringify([...utf8Bytes1]));
    const decoded13b = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded13b])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded31 = decoder.decode("%03+%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded31])).to.equal("[3,32,2,1,0,255,254,253,252]");
    const decoded32 = decoder.decode("%03+%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded32])).to.equal("[3,32,2,1,0,255,254,253,43,252]");
    const decoded33 = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded33])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).to.equal("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("Percent.Decoder({encodeSet:[...]})/decode", () => {
    const decoder = new Percent.Decoder({encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded13])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded21])).to.equal("[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded22])).to.equal("[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded23])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded41])).to.equal("[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded42])).to.equal("[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    expect(JSON.stringify([...decoded43])).to.equal(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).to.equal("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    const decoded55 = decoder.decode("%%65A");
    expect(JSON.stringify([...decoded55])).to.equal("[37,101,65]");

    const decoded56 = decoder.decode("%41");
    expect(JSON.stringify([...decoded56])).to.equal("[65]");

    const decoded57 = decoder.decode("%ff");
    expect(JSON.stringify([...decoded57])).to.equal("[255]");

    const decoded57b = decoder.decode("%FF");
    expect(JSON.stringify([...decoded57b])).to.equal("[255]");

    const decoded57c = decoder.decode("%f");
    expect(JSON.stringify([...decoded57c])).to.equal("[37,102]");

    const decoded57d = decoder.decode("%fff");
    expect(JSON.stringify([...decoded57d])).to.equal("[255,102]");

  });

});
