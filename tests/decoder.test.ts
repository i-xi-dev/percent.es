import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Percent } from "../src/percent.ts";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

Deno.test("Percent.Decoder.prototype.decode", () => {
  // Percent.Decoder()/decode
  const decoder1 = new Percent.Decoder();

  const decoded11 = decoder1.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder1.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

  const decoded13 = decoder1.decode("1%00 !~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decoded13]), JSON.stringify([...utf8Bytes1]));

  const decoded21 = decoder1.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded21]), "[3,2,1,0,255,254,253,252]");
  const decoded22 = decoder1.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded22]), "[3,32,2,1,0,255,254,253,252]");
  const decoded23 = decoder1.decode("1%00%20!~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decoded23]), JSON.stringify([...utf8Bytes1]));

  const decoded41 = decoder1.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded41]), "[3,32,2,1,0,255,254,253,252]");
  const decoded42 = decoder1.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
  assertStrictEquals(JSON.stringify([...decoded42]), "[3,32,2,1,0,255,254,253,43,252]");
  const decoded43 = decoder1.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
  assertStrictEquals(JSON.stringify([...decoded43]), JSON.stringify([...utf8Bytes1]));

  const decoded52b = decoder1.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
  assertStrictEquals(JSON.stringify([...decoded52b]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    decoder1.decode("あ");
  }, TypeError, "decode error (1)");

  const decoded55 = decoder1.decode("%%65A");
  assertStrictEquals(JSON.stringify([...decoded55]), "[37,101,65]");

  const decoded56 = decoder1.decode("%41");
  assertStrictEquals(JSON.stringify([...decoded56]), "[65]");

  const decoded57 = decoder1.decode("%ff");
  assertStrictEquals(JSON.stringify([...decoded57]), "[255]");

  const decoded57b = decoder1.decode("%FF");
  assertStrictEquals(JSON.stringify([...decoded57b]), "[255]");

  const decoded57c = decoder1.decode("%f");
  assertStrictEquals(JSON.stringify([...decoded57c]), "[37,102]");

  const decoded57d = decoder1.decode("%fff");
  assertStrictEquals(JSON.stringify([...decoded57d]), "[255,102]");

  // Percent.Decoder({spaceAsPlus:true})/decode
  const decoder2 = new Percent.Decoder({spaceAsPlus:true});

  const decoded11b = decoder2.decode("");
  assertStrictEquals(JSON.stringify([...decoded11b]), "[]");

  const decoded12b = decoder2.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

  const decoded13b = decoder2.decode("1%00 !~%7F%E3%81%82%2B");
  assertStrictEquals(JSON.stringify([...decoded13b]), JSON.stringify([...utf8Bytes1]));
  const decoded13bb = decoder2.decode("1%00+!~%7F%E3%81%82%2B");
  assertStrictEquals(JSON.stringify([...decoded13bb]), JSON.stringify([...utf8Bytes1]));

  const decoded31b = decoder2.decode("%03+%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded31b]), "[3,32,2,1,0,255,254,253,252]");
  const decoded32b = decoder2.decode("%03+%02%01%00%FF%FE%FD%2B%FC");
  assertStrictEquals(JSON.stringify([...decoded32b]), "[3,32,2,1,0,255,254,253,43,252]");
  const decoded33b = decoder2.decode("1%00+!~%7F%E3%81%82%2B");
  assertStrictEquals(JSON.stringify([...decoded33b]), JSON.stringify([...utf8Bytes1]));

  const decoded52bb = decoder2.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
  assertStrictEquals(JSON.stringify([...decoded52bb]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    decoder2.decode("あ");
  }, TypeError, "decode error (1)");

  // Percent.Decoder({encodeSet:[...]})/decode
  const decoder3 = new Percent.Decoder({encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]});

  const decoded11c = decoder3.decode("");
  assertStrictEquals(JSON.stringify([...decoded11c]), "[]");

  const decoded12c = decoder3.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded12c]), "[3,2,1,0,255,254,253,252]");

  const decoded13c = decoder3.decode("1%00 !~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decoded13c]), JSON.stringify([...utf8Bytes1]));

  const decoded21c = decoder3.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded21c]), "[3,2,1,0,255,254,253,252]");
  const decoded22c = decoder3.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded22c]), "[3,32,2,1,0,255,254,253,252]");
  const decoded23c = decoder3.decode("1%00%20!~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decoded23c]), JSON.stringify([...utf8Bytes1]));

  const decoded41c = decoder3.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decoded41c]), "[3,32,2,1,0,255,254,253,252]");
  const decoded42c = decoder3.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
  assertStrictEquals(JSON.stringify([...decoded42c]), "[3,32,2,1,0,255,254,253,43,252]");
  const decoded43c = decoder3.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
  assertStrictEquals(JSON.stringify([...decoded43c]), JSON.stringify([...utf8Bytes1]));

  const decoded52cb = decoder3.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
  assertStrictEquals(JSON.stringify([...decoded52cb]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    decoder3.decode("あ");
  }, TypeError, "decode error (1)");

  const decoded55c = decoder3.decode("%%65A");
  assertStrictEquals(JSON.stringify([...decoded55c]), "[37,101,65]");

  const decoded56c = decoder3.decode("%41");
  assertStrictEquals(JSON.stringify([...decoded56c]), "[65]");

  const decoded57ca = decoder3.decode("%ff");
  assertStrictEquals(JSON.stringify([...decoded57ca]), "[255]");

  const decoded57cb = decoder3.decode("%FF");
  assertStrictEquals(JSON.stringify([...decoded57cb]), "[255]");

  const decoded57cc = decoder3.decode("%f");
  assertStrictEquals(JSON.stringify([...decoded57cc]), "[37,102]");

  const decoded57cd = decoder3.decode("%fff");
  assertStrictEquals(JSON.stringify([...decoded57cd]), "[255,102]");

});
