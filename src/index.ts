//

import {
  PercentOptions,
  _decode,
  _encode,
  _resolveOptions,
} from "./percent";
import { PercentDecoder } from "./decoder";
import { PercentEncoder } from "./encoder";

namespace Percent {
  /**
   * 
   * 
   * @param encoded 
   * @param options 
   * @returns
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   * @throws {TypeError} The `encoded` is not Percent-encoded string.
   */
  export function decode(encoded: string, options?: PercentOptions): Uint8Array {
    const resolvedOptions = _resolveOptions(options);
    return _decode(encoded, resolvedOptions);
  }

  /**
   * 
   * @param toEncode 
   * @param options 
   * @returns
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  export function encode(toEncode: Uint8Array, options?: PercentOptions): string {
    const resolvedOptions = _resolveOptions(options);
    return _encode(toEncode, resolvedOptions);
  }

  export type Options = PercentOptions;

  /**
   * The alias for the {@link PercentOptions}.
   */
   export const Options = PercentOptions;

  /**
   * The alias for the {@link PercentDecoder}.
   */
  export const Decoder = PercentDecoder;

  /**
   * The alias for the {@link PercentEncoder}.
   */
  export const Encoder = PercentEncoder;
}
Object.freeze(Percent);

export {
  PercentOptions,
  PercentDecoder,
  PercentEncoder,
  Percent,
};
