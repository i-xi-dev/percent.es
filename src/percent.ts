//

import {
  Byte,
  type uint8,
} from "https://raw.githubusercontent.com/i-xi-dev/fundamental.es/7.0.1/src/byte.ts"; //TODO import_mapにうつす（今はdeno docで読めない）

/**
 * 未設定項目の存在しないオプション
 */
type _ResolvedOptions = {
  /**
   * 0x00-0x1F,0x25,0x7F-0xFF以外に"%XX"への変換対象とするバイトのセット
   */
  encodeSet: Readonly<Array<uint8>>;

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
  spaceAsPlus: boolean;
};

/**
 * 全バイトを%xxにする用
 * （スペースは+にしない）
 */
const _DEFAULT_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([
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
  ] as Array<uint8>),
  spaceAsPlus: false,
});

const _MIN_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_FRAGMENT_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([0x20, 0x22, 0x3C, 0x3E, 0x60] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_QUERY_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([0x20, 0x22, 0x23, 0x3C, 0x3E] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_SPECIAL_QUERY_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze(
    [0x20, 0x22, 0x23, 0x27, 0x3C, 0x3E] as Array<uint8>,
  ),
  spaceAsPlus: false,
});

const _URI_PATH_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze(
    [0x20, 0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60, 0x7B, 0x7D] as Array<uint8>,
  ),
  spaceAsPlus: false,
});

const _URI_USERINFO_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze(
    [
      0x20,
      0x22,
      0x23,
      0x2F,
      0x3A,
      0x3B,
      0x3C,
      0x3D,
      0x3E,
      0x3F,
      0x40,
      0x5B,
      0x5C,
      0x5D,
      0x5E,
      0x60,
      0x7B,
      0x7C,
      0x7D,
    ] as Array<uint8>,
  ),
  spaceAsPlus: false,
});

const _URI_COMPONENT_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze(
    [
      0x20,
      0x22,
      0x23,
      0x24,
      0x26,
      0x2B,
      0x2C,
      0x2F,
      0x3A,
      0x3B,
      0x3C,
      0x3D,
      0x3E,
      0x3F,
      0x40,
      0x5B,
      0x5C,
      0x5D,
      0x5E,
      0x60,
      0x7B,
      0x7C,
      0x7D,
    ] as Array<uint8>,
  ),
  spaceAsPlus: false,
});

const _FORM_URLENCODED_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze(
    [
      0x20,
      0x21,
      0x22,
      0x23,
      0x24,
      0x26,
      0x27,
      0x28,
      0x29,
      0x2B,
      0x2C,
      0x2F,
      0x3A,
      0x3B,
      0x3C,
      0x3D,
      0x3E,
      0x3F,
      0x40,
      0x5B,
      0x5C,
      0x5D,
      0x5E,
      0x60,
      0x7B,
      0x7C,
      0x7D,
      0x7E,
    ] as Array<uint8>,
  ),
  spaceAsPlus: true,
});

/**
 * 文字列をバイト列にパーセント復号し、結果のバイト列を返却
 *
 * {@link [URL Standard](https://url.spec.whatwg.org/#string-percent-decode)}の仕様に従った。
 *
 * @param encoded パーセント符号化された文字列
 * @param options パーセント符号化の復号オプション
 * @returns バイト列
 * @throws {TypeError} The `encoded` is not Percent-encoded string.
 */
function _decode(encoded: string, options: _ResolvedOptions): Uint8Array {
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
      const byteString = encoded.substring(i + 1, i + 3);
      if (hexRegExp.test(byteString)) {
        byte = Number.parseInt(byteString, 16) as uint8;
        i = i + 3;
      } else {
        byte = c.charCodeAt(0) as uint8;
        i = i + 1;
      }
    } else if (c === "+") {
      if (options.spaceAsPlus === true) {
        byte = 0x20;
      } else {
        byte = 0x2B; // c.charCodeAt(0) as uint8;
      }
      i = i + 1;
    } else {
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
function _isByteIncludedInEncodeSet(
  byte: uint8,
  encodeSet: Readonly<Array<uint8>>,
): boolean {
  return ((byte < 0x20) || (byte > 0x7E) || (byte === 0x25) ||
    encodeSet.includes(byte));
}

/**
 * （符号化するとき）バイトを"%XX"の形にし返却
 *
 * @param bytes バイト
 * @returns "%XX"の形の文字列
 */
function _formatByte(bytes: Uint8Array): string {
  const byteStringArray = [...bytes].map((byte) => {
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
function _encode(toEncode: Uint8Array, options: _ResolvedOptions): string {
  let work: Array<uint8> = [];
  let encoded = "";
  for (const byte of toEncode) {
    if (_isByteIncludedInEncodeSet(byte as uint8, options.encodeSet)) {
      if (byte === 0x20) {
        if (options.spaceAsPlus === true) {
          encoded = encoded + _formatByte(Uint8Array.from(work)) + "+";
          work = [];
        } else {
          work.push(byte);
        }
      } else {
        work.push(byte as uint8);
      }
    } else {
      // 上記以外はbinary stringと同じ
      encoded = encoded + _formatByte(Uint8Array.from(work)) +
        String.fromCharCode(byte);
      work = [];
    }
  }
  encoded = encoded + _formatByte(Uint8Array.from(work));
  return encoded;
}

/**
 * オプションを_ResolvedOptions型に変換する
 * 未設定項目はデフォルト値で埋める
 *
 * @param options オプション
 * @returns 未設定項目を埋めたオプションの複製
 * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
 */
function _resolveOptions(
  options: Percent.Options | _ResolvedOptions = {},
): _ResolvedOptions {
  let encodeSet: Readonly<Array<uint8>>;
  if (
    Array.isArray(options.encodeSet) &&
    options.encodeSet.every((i) => Byte.isUint8(i))
  ) {
    encodeSet = Object.freeze([...(options.encodeSet as uint8[])]);
  } else {
    encodeSet = _DEFAULT_OPTIONS.encodeSet;
  }

  let spaceAsPlus: boolean = _DEFAULT_OPTIONS.spaceAsPlus;
  if (typeof options.spaceAsPlus === "boolean") {
    spaceAsPlus = options.spaceAsPlus;
  }

  if ((spaceAsPlus === true) && (encodeSet.includes(0x2B) !== true)) {
    throw new RangeError("options.encodeSet, options.spaceAsPlus");
  }

  return Object.freeze({
    encodeSet,
    spaceAsPlus,
  });
}

namespace Percent {
  // デコード結果が文字符号化した結果のバイト列かどうかには関知しない
  // URLのパーセントデコードを実施したい場合は、戻り値をUTF-8デコードする必要がある
  /**
   * Decodes a Percent-encoded string into an `Uint8Array`.
   *
   * @param encoded The string to decode.
   * @param options The `Percent.Options` dictionary.
   * @returns An `Uint8Array` containing the decoded byte sequence.
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   * @throws {TypeError} The `encoded` is not Percent-encoded string.
   * @example
   * ```javascript
   * Percent.decode("%61%62%00%FF");
   * // → Uint8Array[ 0x61, 0x62, 0x0, 0xFF ]
   *
   * Percent.decode("ab%00%FF");
   * // → Uint8Array[ 0x61, 0x62, 0x0, 0xFF ]
   * ```
   */
  export function decode(encoded: string, options?: Options): Uint8Array {
    const resolvedOptions = _resolveOptions(options);
    return _decode(encoded, resolvedOptions);
  }

  // toEncodeが文字符号化した結果のバイト列かどうかには関知しない
  // URLのパーセントエンコードを実施したい場合は、toEncodeには、UTF-8エンコードした結果のバイト列を渡す必要がある
  // （@exampleの例の2つ目だと"ab%00%C3%BF"にはならない）
  /**
   * Encodes the specified byte sequence into a string.
   *
   * @param toEncode The byte sequence to encode.
   * @param options The `Percent.Options` dictionary.
   * @returns A string containing the Percent-encoded characters.
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   * @example
   * ```javascript
   * Percent.encode(Uint8Array.of(0x61, 0x62, 0x0, 0xFF));
   * // → "%61%62%00%FF"
   *
   * Percent.encode(Uint8Array.of(0x61, 0x62, 0x0, 0xFF), Percent.Options.URI_COMPONENT);
   * // → "ab%00%FF"
   * ```
   */
  export function encode(toEncode: Uint8Array, options?: Options): string {
    const resolvedOptions = _resolveOptions(options);
    return _encode(toEncode, resolvedOptions);
  }

  /**
   * The object with the following optional fields.
   */
  export type Options = {
    /**
     * The byte set to be encoded except 0x00-0x1F, 0x25, 0x7F-0xFF.
     * The default is 0x20-0x24, 0x26-0x7E.
     *
     * The following restrictions apply:
     * - The `encodeSet` must not contain duplicate bytes.
     *
     * @see [https://url.spec.whatwg.org/#percent-encoded-bytes](https://url.spec.whatwg.org/#percent-encoded-bytes)
     */
    encodeSet?: Readonly<Array<number>>;

    /**
     * Whether to output 0x20 as `"+"`.
     * The default is `false`.
     *
     * The following restrictions apply:
     * - If `true`, `encodeSet` must contain `0x2B`.
     */
    spaceAsPlus?: boolean;
  };

  export namespace Options {
    /**
     * The options for the C0 controls percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[]` |
     * | `spaceAsPlus` | `false` |
     */
    export const C0: Options = _MIN_OPTIONS;

    /**
     * The options for the URL fragment percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_FRAGMENT: Options = _URI_FRAGMENT_OPTIONS;

    /**
     * The options for the URL query percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_QUERY: Options = _URI_QUERY_OPTIONS;

    /**
     * The options for the URL special-query percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x27, 0x3C, 0x3E ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_SPECIAL_QUERY: Options = _URI_SPECIAL_QUERY_OPTIONS;

    /**
     * The options for the URL path percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60, 0x7B, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_PATH: Options = _URI_PATH_OPTIONS;

    /**
     * The options for the URL userinfo percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_USERINFO: Options = _URI_USERINFO_OPTIONS;

    /**
     * The options for the URL component percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_COMPONENT: Options = _URI_COMPONENT_OPTIONS;

    /**
     * The options for the application/x-www-form-urlencoded percent-encode
     *
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]` |
     * | `spaceAsPlus` | `true` |
     */
    export const FORM_URLENCODED: Options = _FORM_URLENCODED_OPTIONS;
  }
  Object.freeze(Options);

  /**
   * Percent decoder
   */
  export class Decoder /* implements ByteEncoding.Decoder */ {
    /**
     * 未設定項目を埋めたオプション
     */
    #options: _ResolvedOptions;

    /**
     * @param options The `Percent.Options` dictionary.
     * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
     */
    constructor(options?: Options) {
      this.#options = _resolveOptions(options);
      Object.freeze(this);
    }

    /**
     * Decodes a Percent-encoded string into an `Uint8Array`.
     *
     * @param encoded The string to decode.
     * @returns An `Uint8Array` containing the decoded byte sequence.
     * @throws {TypeError} The `encoded` is not Percent-encoded string.
     */
    decode(encoded: string): Uint8Array {
      return _decode(encoded, this.#options);
    }
  }
  Object.freeze(Decoder);

  /**
   * Percent encoder
   */
  export class Encoder /* implements ByteEncoding.Encoder */ {
    /**
     * 未設定項目を埋めたオプション
     */
    #options: _ResolvedOptions;

    /**
     * @param options The `Percent.Options` dictionary.
     * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
     */
    constructor(options?: Options) {
      this.#options = _resolveOptions(options);
      Object.freeze(this);
    }

    /**
     * Encodes the specified byte sequence into a string.
     *
     * @param toEncode The byte sequence to encode.
     * @returns A string containing the Percent-encoded characters.
     */
    encode(toEncode: Uint8Array): string {
      return _encode(toEncode, this.#options);
    }
  }
  Object.freeze(Encoder);
}
Object.freeze(Percent);

export { Percent };
