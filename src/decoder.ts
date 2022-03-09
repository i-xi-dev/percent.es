//

import {
  type ByteDecoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  PercentOptions,
  type _ResolvedOptions,
  _decode,
  _resolveOptions,
} from "./percent";

/**
 * Percent decoder
 */
class PercentDecoder implements ByteDecoder {
  /**
   * インスタンスのキャッシュ
   * static getで使用
   */
  static #pool: SizedMap<string, PercentDecoder> = new SizedMap(2);

  /**
   * 未設定項目を埋めたオプション
   */
  #options: _ResolvedOptions;

  /**
   * @param options - The `PercentOptions` dictionary.
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  constructor(options?: PercentOptions) {
    this.#options = _resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * Decodes a Percent-encoded string into an `Uint8Array`.
   * 
   * @param encoded - The string to decode.
   * @returns An `Uint8Array` containing the decoded bytes.
   * @throws {TypeError} The `encoded` is not Percent-encoded string.
   */
  decode(encoded: string): Uint8Array {
    return _decode(encoded, this.#options);
  }

  /**
   * 
   * @param options 
   * @returns 
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  static get(options?: PercentOptions): PercentDecoder {
    const resolvedOptions = _resolveOptions(options);

    const poolKey = JSON.stringify(resolvedOptions);
    let decoder = PercentDecoder.#pool.get(poolKey);
    if (decoder) {
      return decoder;
    }
    decoder = new PercentDecoder(resolvedOptions);
    PercentDecoder.#pool.set(poolKey, decoder);
    return decoder;
  }
}
Object.freeze(PercentDecoder);

export {
  PercentDecoder,
};
