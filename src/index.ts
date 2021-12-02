//

import {
  ByteDecoder,
  ByteEncoder,
} from "@i-xi-dev/fundamental";

import {
  // type Options,
  Options,
  // type ResolvedOptions,
  ResolvedOptions,
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

export type {
  Options as PercentOptions,
};

export {
  PercentDecoder,
  PercentEncoder,
};
