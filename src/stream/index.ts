//

import { 
  ByteDecoderStreamRegulator,
  ByteEncoderStreamRegulator,
  ByteDecoderStream,
  ByteEncoderStream,
} from "../lib/@i-xi-dev/fundamental/index";

import {
  // type Options,
  Options,
} from "../_";

import {
  PercentDecoder,
  PercentEncoder,
} from "../index";

class PercentDecoderStreamRegulator implements ByteDecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = "";
  }

  regulate(chunk: string): string {





    
    //TODO
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = "";
    return remains;
  }
}

/**
 * 復号ストリーム
 */
class DecoderStream extends ByteDecoderStream {
  /**
   * @param options オプション
   */
   constructor(options?: Options) {
    const decoder = new PercentDecoder(options);
    const regulator = new PercentDecoderStreamRegulator();
    super(decoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(DecoderStream);

class PercentEncoderStreamRegulator implements ByteEncoderStreamRegulator {
  regulate(chunk: Uint8Array): Uint8Array {
    return chunk;
  }

  flush(): Uint8Array {
    return new Uint8Array(0);
  }
}

/**
 * 符号化ストリーム
 */
class EncoderStream extends ByteEncoderStream {
  /**
   * @param options オプション
   */
   constructor(options?: Options) {
    const encoder = new PercentEncoder(options);
    const regulator = new PercentEncoderStreamRegulator();
    super(encoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(EncoderStream);

export {
  DecoderStream as PercentDecoderStream,
  EncoderStream as PercentEncoderStream,
};
