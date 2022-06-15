import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Percent } from "../src/percent.ts";

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+");

Deno.test("Percent.decode", () => {
  // decode(string)
  const decodedA11 = Percent.decode("");
  assertStrictEquals(JSON.stringify([...decodedA11]), "[]");

  const decodedA12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decodedA12]), "[3,2,1,0,255,254,253,252]");

  const decodedA13 = Percent.decode("1%00 !~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decodedA13]), JSON.stringify([...utf8Bytes1]));

  const decodedA21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decodedA21]), "[3,2,1,0,255,254,253,252]");
  const decodedA22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decodedA22]), "[3,32,2,1,0,255,254,253,252]");
  const decodedA23 = Percent.decode("1%00%20!~%7F%E3%81%82+");
  assertStrictEquals(JSON.stringify([...decodedA23]), JSON.stringify([...utf8Bytes1]));

  const decodedA41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(JSON.stringify([...decodedA41]), "[3,32,2,1,0,255,254,253,252]");
  const decodedA42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
  assertStrictEquals(JSON.stringify([...decodedA42]), "[3,32,2,1,0,255,254,253,43,252]");
  const decodedA43 = Percent.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));
  assertStrictEquals(JSON.stringify([...decodedA43]), JSON.stringify([...utf8Bytes1]));

  const decodedA52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
  assertStrictEquals(JSON.stringify([...decodedA52b]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    Percent.decode("あ");
  }, TypeError, "decode error (1)");

  const decodedA55 = Percent.decode("%%65A");
  assertStrictEquals(JSON.stringify([...decodedA55]), "[37,101,65]");

  const decodedA56 = Percent.decode("%41");
  assertStrictEquals(JSON.stringify([...decodedA56]), "[65]");

  const decodedA57 = Percent.decode("%ff");
  assertStrictEquals(JSON.stringify([...decodedA57]), "[255]");

  const decodedA57b = Percent.decode("%FF");
  assertStrictEquals(JSON.stringify([...decodedA57b]), "[255]");

  const decodedA57c = Percent.decode("%f");
  assertStrictEquals(JSON.stringify([...decodedA57c]), "[37,102]");

  const decodedA57d = Percent.decode("%fff");
  assertStrictEquals(JSON.stringify([...decodedA57d]), "[255,102]");

  // decode(string, {spaceAsPlus:true})
  const decodedB11 = Percent.decode("", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB11]), "[]");

  const decodedB12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB12]), "[3,2,1,0,255,254,253,252]");

  const decodedB13 = Percent.decode("1%00 !~%7F%E3%81%82%2B", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB13]), JSON.stringify([...utf8Bytes1]));
  const decodedB13b = Percent.decode("1%00+!~%7F%E3%81%82%2B", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB13b]), JSON.stringify([...utf8Bytes1]));

  const decodedB31 = Percent.decode("%03+%02%01%00%FF%FE%FD%FC", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB31]), "[3,32,2,1,0,255,254,253,252]");
  const decodedB32 = Percent.decode("%03+%02%01%00%FF%FE%FD%2B%FC", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB32]), "[3,32,2,1,0,255,254,253,43,252]");
  const decodedB33 = Percent.decode("1%00+!~%7F%E3%81%82%2B", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB33]), JSON.stringify([...utf8Bytes1]));

  const decodedB52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", {spaceAsPlus:true});
  assertStrictEquals(JSON.stringify([...decodedB52b]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    Percent.decode("あ", {spaceAsPlus:true});
  }, TypeError, "decode error (1)");

  // decode(string, {encodeSet:[...]})
  const opC = {encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]};

  const decodedC11 = Percent.decode("", opC);
  assertStrictEquals(JSON.stringify([...decodedC11]), "[]");

  const decodedC12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(JSON.stringify([...decodedC12]), "[3,2,1,0,255,254,253,252]");

  const decodedC13 = Percent.decode("1%00 !~%7F%E3%81%82+", opC);
  assertStrictEquals(JSON.stringify([...decodedC13]), JSON.stringify([...utf8Bytes1]));

  const decodedC21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(JSON.stringify([...decodedC21]), "[3,2,1,0,255,254,253,252]");
  const decodedC22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(JSON.stringify([...decodedC22]), "[3,32,2,1,0,255,254,253,252]");
  const decodedC23 = Percent.decode("1%00%20!~%7F%E3%81%82+", opC);
  assertStrictEquals(JSON.stringify([...decodedC23]), JSON.stringify([...utf8Bytes1]));

  const decodedC41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(JSON.stringify([...decodedC41]), "[3,32,2,1,0,255,254,253,252]");
  const decodedC42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC", opC);
  assertStrictEquals(JSON.stringify([...decodedC42]), "[3,32,2,1,0,255,254,253,43,252]");
  const decodedC43 = Percent.decode(globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"), opC);
  assertStrictEquals(JSON.stringify([...decodedC43]), JSON.stringify([...utf8Bytes1]));

  const decodedC52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", opC);
  assertStrictEquals(JSON.stringify([...decodedC52b]), "[3,2,1,0,255,254,253,252,32,65]");

  assertThrows(() => {
    Percent.decode("あ", opC);
  }, TypeError, "decode error (1)");

  const decodedC55 = Percent.decode("%%65A", opC);
  assertStrictEquals(JSON.stringify([...decodedC55]), "[37,101,65]");

  const decodedC56 = Percent.decode("%41", opC);
  assertStrictEquals(JSON.stringify([...decodedC56]), "[65]");

  const decodedC57 = Percent.decode("%ff", opC);
  assertStrictEquals(JSON.stringify([...decodedC57]), "[255]");

  const decodedC57b = Percent.decode("%FF", opC);
  assertStrictEquals(JSON.stringify([...decodedC57b]), "[255]");

  const decodedC57c = Percent.decode("%f", opC);
  assertStrictEquals(JSON.stringify([...decodedC57c]), "[37,102]");

  const decodedC57d = Percent.decode("%fff", opC);
  assertStrictEquals(JSON.stringify([...decodedC57d]), "[255,102]");

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

Deno.test("Percent.encode", () => {
  // encode(Uint8Array)
  assertStrictEquals(Percent.encode(Uint8Array.of()), "");
  assertStrictEquals(Percent.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC)), "%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(Percent.encode(utf8Bytes1), "%31%00%20%21%7E%7F%E3%81%82%2B");
  assertStrictEquals(Percent.encode(Uint8Array.of(255)), "%FF");
  assertStrictEquals(Percent.encode(Uint8Array.of(0)), "%00");
  assertStrictEquals(Percent.encode(Uint8Array.of(0,32,65)), "%00%20%41");
  assertStrictEquals(Percent.encode(Uint8Array.of(255)), "%FF");

  // encode(Uint8Array, {encodeSet:[]})
  assertStrictEquals(Percent.encode(Uint8Array.of(), {encodeSet:[]}), "");
  assertStrictEquals(Percent.encode(Uint8Array.of(3,2,1,0,0xFF,0xFE,0xFD,0xFC), {encodeSet:[]}), "%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(Percent.encode(utf8Bytes1, {encodeSet:[]}), "1%00 !~%7F%E3%81%82+");
  assertStrictEquals(Percent.encode(Uint8Array.of(255), {encodeSet:[]}), "%FF");
  assertStrictEquals(Percent.encode(Uint8Array.of(0), {encodeSet:[]}), "%00");
  assertStrictEquals(Percent.encode(Uint8Array.of(0,32,65), {encodeSet:[]}), "%00 A");
  assertStrictEquals(Percent.encode(Uint8Array.of(255), {encodeSet:[]}), "%FF");

  // encode(Uint8Array, {encodeSet:[...]})
  const opD = {encodeSet:[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]};

  assertStrictEquals(Percent.encode(Uint8Array.of(), opD), "");
  assertStrictEquals(Percent.encode(utf8Bytes1, opD), "1%00%20!~%7F%E3%81%82+");

  // encode(Uint8Array, {encodeSet:[...]})
  const opE = {encodeSet:[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]};

  assertStrictEquals(Percent.encode(Uint8Array.of(), opE), "");
  assertStrictEquals(Percent.encode(utf8Bytes1, opE), "1%00%20!~%7F%E3%81%82%2B");
  assertStrictEquals(Percent.encode(Uint8Array.of(0,32,65), opE), "%00%20A");
  assertStrictEquals(Percent.encode(Uint8Array.of(255), opE), "%FF");

  assertStrictEquals(Percent.encode(utf8Bytes1, opE), globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"));

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
  assertStrictEquals(Percent.encode(x1, opE), globalThis.encodeURIComponent(x1b));

  assertStrictEquals(Percent.encode(x2bUtf8, opE), globalThis.encodeURIComponent(x2b));

  // encode(Uint8Array, {encodeSet:[...],spaceAsPlus:true})
  const opF = {encodeSet:[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ],spaceAsPlus:true};

  assertStrictEquals(Percent.encode(Uint8Array.of(), opF), "");
  assertStrictEquals(Percent.encode(utf8Bytes1, opF), "1%00+%21%7E%7F%E3%81%82%2B");
  assertStrictEquals(Percent.encode(Uint8Array.of(0,32,65), opF), "%00+A");
  assertStrictEquals(Percent.encode(Uint8Array.of(255), opF), "%FF");

  const usp = new URLSearchParams();
  usp.set("p1", "1\u{0} !~\u{7F}あ+");
  assertStrictEquals(Percent.encode(utf8Bytes1, opF), usp.toString().substring(3));

  const u = new URL("http://example.com/");
  u.searchParams.set("p1", x2b);
  const e = u.search.replace("?p1=", "");
  assertStrictEquals(Percent.encode(x2bUtf8, opF), e);

  // encode(Uint8Array, {encodeSet:[],spaceAsPlus:true})
  const opG = {encodeSet:[],spaceAsPlus:true};

  assertThrows(() => {
    Percent.encode(Uint8Array.of(), opG);
  }, RangeError, "options.encodeSet, options.spaceAsPlus");

});
