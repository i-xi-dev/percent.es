//

import {
  type ByteEncoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  type PercentOptions,
  type ResolvedOptions,
  encode,
  resolveOptions,
} from "./percent";

/**
 * Percent encoder
 */
class PercentEncoder implements ByteEncoder {
  /**
   * インスタンスのキャッシュ
   * static getで使用
   */
  static #pool: SizedMap<string, PercentEncoder> = new SizedMap(2);

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  /**
   * @param options - The `PercentOptions` dictionary.
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  constructor(options?: PercentOptions) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * Encodes the specified bytes into a string.
   * 
   * @param toEncode - The bytes to encode.
   * @returns A string containing the Percent-encoded characters.
   */
  encode(toEncode: Uint8Array): string {
    return encode(toEncode, this.#options);
  }

  /**
   * 
   * @param options 
   * @returns 
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  static get(options?: PercentOptions): PercentEncoder {
    const resolvedOptions = resolveOptions(options);

    const poolKey = JSON.stringify(resolvedOptions);
    let encoder = PercentEncoder.#pool.get(poolKey);
    if (encoder) {
      return encoder;
    }
    encoder = new PercentEncoder(resolvedOptions);
    PercentEncoder.#pool.set(poolKey, encoder);
    return encoder;
  }
}
Object.freeze(PercentEncoder);

export {
  PercentEncoder,
};
