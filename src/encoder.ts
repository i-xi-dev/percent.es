//

import {
  type ByteEncoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  encode,
  resolveOptions,
} from "./percent";

/**
 * 符号化器
 */
class PercentEncoder implements ByteEncoder {
  static #encoderCache: WeakMap<ResolvedOptions, PercentEncoder> = new WeakMap();

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
   * バイト列を文字列にパーセント符号化し、結果の文字列を返却
   * 
   * @param toEncode バイト列
   * @returns パーセント符号化された文字列
   */
  encode(toEncode: Uint8Array): string {
    return encode(toEncode, this.#options);
  }

  static get(options?: Options): PercentEncoder {
    const resolvedOptions = resolveOptions(options);
    if (PercentEncoder.#encoderCache.has(resolvedOptions) !== true) {
      PercentEncoder.#encoderCache.set(resolvedOptions, new PercentEncoder(resolvedOptions));
    }
    return PercentEncoder.#encoderCache.get(resolvedOptions) as PercentEncoder;
  }
}
Object.freeze(PercentEncoder);

export {
  PercentEncoder,
};
