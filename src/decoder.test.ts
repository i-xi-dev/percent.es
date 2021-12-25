import { PercentDecoder } from "./decoder";
import { Percent } from "./percent";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

describe("PercentDecoder.prototype.decode", () => {
  it("PercentDecoder()/decode", () => {
    const decoder = new PercentDecoder();

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded13])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded21])).toBe("[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded22])).toBe("[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded23])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded41])).toBe("[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded42])).toBe("[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    expect(JSON.stringify([...decoded43])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).toBe("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)"
    });

    const decoded55 = decoder.decode("%%65A");
    expect(JSON.stringify([...decoded55])).toBe("[37,101,65]");

    const decoded56 = decoder.decode("%41");
    expect(JSON.stringify([...decoded56])).toBe("[65]");

    const decoded57 = decoder.decode("%ff");
    expect(JSON.stringify([...decoded57])).toBe("[255]");

    const decoded57b = decoder.decode("%FF");
    expect(JSON.stringify([...decoded57b])).toBe("[255]");

    const decoded57c = decoder.decode("%f");
    expect(JSON.stringify([...decoded57c])).toBe("[37,102]");

    const decoded57d = decoder.decode("%fff");
    expect(JSON.stringify([...decoded57d])).toBe("[255,102]");

  });

  it("PercentDecoder({spaceAsPlus:true})/decode", () => {
    const decoder = new PercentDecoder({spaceAsPlus:true});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded13])).toBe(JSON.stringify([...utf8Bytes1]));
    const decoded13b = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded13b])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded31 = decoder.decode("%03+%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded31])).toBe("[3,32,2,1,0,255,254,253,252]");
    const decoded32 = decoder.decode("%03+%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded32])).toBe("[3,32,2,1,0,255,254,253,43,252]");
    const decoded33 = decoder.decode("1%00+!~%7F%E3%81%82%2B");
    expect(JSON.stringify([...decoded33])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).toBe("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)"
    });

  });

  it("PercentDecoder({encodeSet:[...]})/decode", () => {
    const decoder = new PercentDecoder({encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded13 = decoder.decode("1%00 !~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded13])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded21 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded21])).toBe("[3,2,1,0,255,254,253,252]");
    const decoded22 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded22])).toBe("[3,32,2,1,0,255,254,253,252]");
    const decoded23 = decoder.decode("1%00%20!~%7F%E3%81%82+");
    expect(JSON.stringify([...decoded23])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded41 = decoder.decode("%03%20%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded41])).toBe("[3,32,2,1,0,255,254,253,252]");
    const decoded42 = decoder.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
    expect(JSON.stringify([...decoded42])).toBe("[3,32,2,1,0,255,254,253,43,252]");
    const decoded43 = decoder.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
    expect(JSON.stringify([...decoded43])).toBe(JSON.stringify([...utf8Bytes1]));

    const decoded52b = decoder.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
    expect(JSON.stringify([...decoded52b])).toBe("[3,2,1,0,255,254,253,252,32,65]");

    expect(() => {
      decoder.decode("あ");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)"
    });

    const decoded55 = decoder.decode("%%65A");
    expect(JSON.stringify([...decoded55])).toBe("[37,101,65]");

    const decoded56 = decoder.decode("%41");
    expect(JSON.stringify([...decoded56])).toBe("[65]");

    const decoded57 = decoder.decode("%ff");
    expect(JSON.stringify([...decoded57])).toBe("[255]");

    const decoded57b = decoder.decode("%FF");
    expect(JSON.stringify([...decoded57b])).toBe("[255]");

    const decoded57c = decoder.decode("%f");
    expect(JSON.stringify([...decoded57c])).toBe("[37,102]");

    const decoded57d = decoder.decode("%fff");
    expect(JSON.stringify([...decoded57d])).toBe("[255,102]");

  });

});

describe("PercentDecoder.get", () => {
  it("get()", () => {
    const decoder = PercentDecoder.get();

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = decoder.decode("%03%02%01%00%FF%FE%FD%FC");
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

  });

  it("get(Object)", () => {
    const decoder1 = PercentDecoder.get({spaceAsPlus:false});
    const decoder2 = PercentDecoder.get({spaceAsPlus:false});
    expect(decoder1).not.toBe(decoder2);

    const op = Percent.resolveOptions({spaceAsPlus:false});
    const decoder21 = PercentDecoder.get(op);
    const decoder22 = PercentDecoder.get(op);
    expect(decoder21).toBe(decoder22);

  });

});
