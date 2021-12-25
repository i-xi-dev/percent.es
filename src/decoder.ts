//

import {
  type ByteDecoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  decode,
  resolveOptions,
} from "./percent";

/**
 * 復号器
 */
class PercentDecoder implements ByteDecoder {
  static #decoderCache: WeakMap<ResolvedOptions, PercentDecoder> = new WeakMap();

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * 文字列をバイト列にパーセント復号し、結果のバイト列を返却
   * 
   * @param encoded パーセント符号化された文字列
   * @returns バイト列
   */
  decode(encoded: string): Uint8Array {
    return decode(encoded, this.#options);
  }

  static get(options?: Options): PercentDecoder {
    const resolvedOptions = resolveOptions(options);
    if (PercentDecoder.#decoderCache.has(resolvedOptions) !== true) {
      PercentDecoder.#decoderCache.set(resolvedOptions, new PercentDecoder(resolvedOptions));
    }
    return PercentDecoder.#decoderCache.get(resolvedOptions) as PercentDecoder;
  }
}
Object.freeze(PercentDecoder);

export {
  PercentDecoder,
};
