// TODO bytesの中に戻す

import {
  type uint8,
  Uint8,
} from "@i-xi-dev/fundamental";

/**
 * オプション
 */
type ResolvedOptions = {
  /**
   * 0x00-0x1F,0x25,0x7F-0xFF以外に"%XX"への変換対象とするバイトのセット
   */
  encodeSet: Readonly<Array<uint8>>,

  /**
   * 復号時:
   *    "+"を0x20に復号するか否か
   * 
   * 符号化時:
   *    encodeSetに0x20が含まれているときに、0x20を"+"に符号化するか否か
   *    encodeSetに0x20が含まれていなければ無視する
   * 
   * trueにするときは、encodeSetに"+"(0x2B)が含まれている必要がある
   */
  spaceAsPlus: boolean,
};

/**
 * 文字列をバイト列にパーセント復号し、結果のバイト列を返却
 * 
 * {@link [URL Standard](https://url.spec.whatwg.org/#string-percent-decode)}の仕様に従った。
 * 
 * @param encoded パーセント符号化された文字列
 * @param options パーセント符号化の復号オプション
 * @returns バイト列
 */
function decode(encoded: string, options: ResolvedOptions): Uint8Array {
  if (/^[\u0020-\u007E]*$/.test(encoded) !== true) {
    throw new TypeError("decode error (1)");
  }

  const decoded = new Uint8Array(encoded.length); // 0x20-0x7E以外を含んでいたらエラーにしている為decoded.lengthがencoded.lengthより増えることは無い
  const hexRegExp = /^[0-9A-Fa-f]{2}$/;

  let i = 0;
  let j = 0;
  while (i < encoded.length) {
    const c = encoded.charAt(i);

    let byte: uint8;
    if (c === "%") {
      const byteString = encoded.substring((i + 1), (i + 3));
      if (hexRegExp.test(byteString)) {
        byte = Number.parseInt(byteString, 16) as uint8;
        i = i + 3;
      }
      else {
        byte = c.charCodeAt(0) as uint8;
        i = i + 1;
      }
    }
    else if (c === "+") {
      if (options.spaceAsPlus === true) {
        byte = 0x20;
      }
      else {
        byte = 0x2B;// c.charCodeAt(0) as uint8;
      }
      i = i + 1;
    }
    else {
      byte = c.charCodeAt(0) as uint8;
      i = i + 1;
    }

    decoded[j++] = byte;
  }

  if (decoded.length > j) {
    // return decoded.subarray(0, j);
    return decoded.slice(0, j);
  }
  return decoded;
}

/**
 * 符号化するとき、バイトが"%XX"の形にする対象か否かを返却
 * 
 * @param byte バイト
 * @param encodeSet 0x00-0x1F,0x25,0x7F-0xFF以外に"%XX"への変換対象とするバイトのセット
 * @returns バイトが"%XX"の形にする対象か否か
 */
function isByteIncludedInEncodeSet(byte: uint8, encodeSet: Readonly<Array<uint8>>): boolean {
  return ((byte < 0x20) || (byte > 0x7E) || (byte === 0x25) || encodeSet.includes(byte));
}

/**
 * （符号化するとき）バイトを"%XX"の形にし返却
 * 
 * @param bytes バイト
 * @returns "%XX"の形の文字列
 */
function formatByte(bytes: Uint8Array): string {
  const byteStringArray = [ ...bytes ].map((byte) => {
    return "%" + byte.toString(16).toUpperCase().padStart(2, "0");
  });
  return byteStringArray.join("");
}

/**
 * バイト列を文字列にパーセント符号化し、結果の文字列を返却
 * 
 * {@link [URL Standard](https://url.spec.whatwg.org/)}の仕様に従い、"%"に後続する16進数は大文字で固定。
 * 
 * デフォルトでは全バイトを"%XX"の形に符号化する。
 * URLエンコードとして使用するには、適切なoptions.encodeSetを設定すること。
 * 
 * @param toEncode バイト列
 * @param options パーセント符号化の符号化オプション
 * @returns パーセント符号化された文字列
 */
function encode(toEncode: Uint8Array, options: ResolvedOptions): string {
  let work: Array<uint8> = [];
  let encoded = "";
  for (const byte of toEncode) {
    if (isByteIncludedInEncodeSet(byte as uint8, options.encodeSet)) {
      if (byte === 0x20) {
        if (options.spaceAsPlus === true) {
          encoded = encoded + formatByte(Uint8Array.from(work)) + "+";
          work = [];
        }
        else {
          work.push(byte);
        }
      }
      else {
        work.push(byte as uint8);
      }
    }
    else {
      // 上記以外はbinary stringと同じ
      encoded = encoded + formatByte(Uint8Array.from(work)) + String.fromCharCode(byte);
      work = [];
    }
  }
  encoded = encoded + formatByte(Uint8Array.from(work));
  return encoded;
}

/**
 * オプション
 * 未設定を許可
 */
type PercentOptions = {
  /** @see {@link ResolvedOptions.encodeSet} */
  encodeSet?: Readonly<Array<number>>,

  /** @see {@link ResolvedOptions.spaceAsPlus} */
  spaceAsPlus?: boolean,
};

/**
 * 全バイトを"%XX"の形に符号化する用
 */
const ALL: Readonly<Array<uint8>> = Object.freeze([
  0x20,
  0x21,
  0x22,
  0x23,
  0x24,
  // 0x25, "%"は無条件で"%25"にする
  0x26,
  0x27,
  0x28,
  0x29,
  0x2A,
  0x2B,
  0x2C,
  0x2D,
  0x2E,
  0x2F,
  0x30,
  0x31,
  0x32,
  0x33,
  0x34,
  0x35,
  0x36,
  0x37,
  0x38,
  0x39,
  0x3A,
  0x3B,
  0x3C,
  0x3D,
  0x3E,
  0x3F,
  0x40,
  0x41,
  0x42,
  0x43,
  0x44,
  0x45,
  0x46,
  0x47,
  0x48,
  0x49,
  0x4A,
  0x4B,
  0x4C,
  0x4D,
  0x4E,
  0x4F,
  0x50,
  0x51,
  0x52,
  0x53,
  0x54,
  0x55,
  0x56,
  0x57,
  0x58,
  0x59,
  0x5A,
  0x5B,
  0x5C,
  0x5D,
  0x5E,
  0x5F,
  0x60,
  0x61,
  0x62,
  0x63,
  0x64,
  0x65,
  0x66,
  0x67,
  0x68,
  0x69,
  0x6A,
  0x6B,
  0x6C,
  0x6D,
  0x6E,
  0x6F,
  0x70,
  0x71,
  0x72,
  0x73,
  0x74,
  0x75,
  0x76,
  0x77,
  0x78,
  0x79,
  0x7A,
  0x7B,
  0x7C,
  0x7D,
  0x7E,
]);

function isArrayOfUint8(value: unknown): value is Array<uint8> {
  if (Array.isArray(value)) {
    if (value.every((i) => Uint8.isUint8(i))) {
      return true;
    }
  }
  return false;
}

/**
 * オプションをResolvedOptions型に変換する
 * 未設定項目はデフォルト値で埋める
 * 
 * @param options オプション
 * @returns 未設定項目を埋めたオプションの複製
 */
function resolveOptions(options: PercentOptions | ResolvedOptions = {}): ResolvedOptions {
  const encodeSetIsValid = isArrayOfUint8(options.encodeSet);
  const encodeSetIsFrozen = Object.isFrozen(options.encodeSet);
  const spaceAsPlusIsValid = (typeof options.spaceAsPlus === "boolean");
  const isFrozen = Object.isFrozen(options);

  const encodeSet: Readonly<Array<uint8>> = encodeSetIsValid ? options.encodeSet as Array<uint8> : ALL;
  const spaceAsPlus: boolean = spaceAsPlusIsValid ? options.spaceAsPlus as boolean : false;

  if ((spaceAsPlus === true) && (encodeSet.includes(0x2B) !== true)) {
    throw new TypeError("options.encodeSet, options.spaceAsPlus");
  }

  if (encodeSetIsValid && encodeSetIsFrozen && spaceAsPlusIsValid && isFrozen) {
    return options as ResolvedOptions;
  }

  return Object.freeze({
    encodeSet: Object.freeze(encodeSet),
    spaceAsPlus,
  });
}

const Percent = Object.freeze({
  decode(encoded: string, options?: PercentOptions): Uint8Array {
    const resolvedOptions = resolveOptions(options);
    return decode(encoded, resolvedOptions);
  },

  encode(toEncode: Uint8Array, options?: PercentOptions): string {
    const resolvedOptions = resolveOptions(options);
    return encode(toEncode, resolvedOptions);
  },

  resolveOptions,
});

export {
  type PercentOptions,
  type ResolvedOptions,
  decode,
  encode,
  resolveOptions,
  Percent,
};
