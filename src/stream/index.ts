//

import {
  // type Options,
  Options,
  // type ResolvedOptions,
  // ResolvedOptions,
  // decode,
  // encode,
  // resolveOptions,
} from "../_.js";

// type DecoderStreamPending = {
//   chars: string,
// };

class DecoderStream implements TransformStream {
  /**
   * 未設定項目を埋めたオプション
   */
  // readonly #options: ResolvedOptions;

  // readonly #pending: DecoderStreamPending;

  readonly #stream: TransformStream<string, Uint8Array>;

  constructor(options?: Options) {
    void options;
    throw new Error("not implemented");
  }

  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }

  get readable(): ReadableStream<Uint8Array> {
    return this.#stream.readable;
  }

}
Object.freeze(DecoderStream);

// type EncoderStreamPending = {
//   bytes: Uint8Array,
// };

class EncoderStream implements TransformStream {
  /**
   * 未設定項目を埋めたオプション
   */
  // readonly #options: ResolvedOptions;

  // readonly #pending: EncoderStreamPending;

  readonly #stream: TransformStream<Uint8Array, string>;

  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    void options;
    throw new Error("not implemented");
  }

  get writable(): WritableStream<Uint8Array> {
    return this.#stream.writable;
  }

  get readable(): ReadableStream<string> {
    return this.#stream.readable;
  }

}

Object.freeze(EncoderStream);

export {
  DecoderStream as PercentDecoderStream,
  EncoderStream as PercentEncoderStream,
};
