//

import {
  type ByteDecoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  type PercentOptions,
  type ResolvedOptions,
  decode,
  resolveOptions,
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
  #options: ResolvedOptions;

  /**
   * @param options - The `PercentOptions` dictionary.
   */
  constructor(options?: PercentOptions) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * Decodes a Percent-encoded string into an `Uint8Array`.
   * 
   * @param encoded - The string to decode.
   * @returns An `Uint8Array` containing the decoded bytes.
   */
  decode(encoded: string): Uint8Array {
    return decode(encoded, this.#options);
  }

  static get(options?: PercentOptions): PercentDecoder {
    const resolvedOptions = resolveOptions(options);

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
