//

import {
  type ByteDecoder,
  type ByteEncoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  decode,
  encode,
  resolveOptions,
} from "./_";

/**
 * 復号器
 */
class PercentDecoder implements ByteDecoder {
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
}
Object.freeze(PercentDecoder);

/**
 * 符号化器
 */
class PercentEncoder implements ByteEncoder {
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
}
Object.freeze(PercentEncoder);

const decoderCache: WeakMap<ResolvedOptions, PercentDecoder> = new WeakMap();

const encoderCache: WeakMap<ResolvedOptions, PercentEncoder> = new WeakMap();

const Percent = Object.freeze({
  resolveOptions(options?: Options | ResolvedOptions): ResolvedOptions {
    return resolveOptions(options);
  },

  getDecoder(options?: Options | ResolvedOptions): PercentDecoder {
    const resolvedOptions = resolveOptions(options);
    if (decoderCache.has(resolvedOptions) !== true) {
      decoderCache.set(resolvedOptions, new PercentDecoder(resolvedOptions));
    }
    return decoderCache.get(resolvedOptions) as PercentDecoder;    
  },

  getEncoder(options?: Options | ResolvedOptions): PercentEncoder {
    const resolvedOptions = resolveOptions(options);
    if (encoderCache.has(resolvedOptions) !== true) {
      encoderCache.set(resolvedOptions, new PercentEncoder(resolvedOptions));
    }
    return encoderCache.get(resolvedOptions) as PercentEncoder;
  },

  decode(encoded: string, options: Options | ResolvedOptions): Uint8Array {
    const resolvedOptions = resolveOptions(options);
    return decode(encoded, resolvedOptions);
  },

  encode(toEncode: Uint8Array, options: Options | ResolvedOptions): string {
    const resolvedOptions = resolveOptions(options);
    return encode(toEncode, resolvedOptions);
  },
});

export {
  type Options as PercentOptions,
  PercentDecoder,
  PercentEncoder,
  Percent,
};
