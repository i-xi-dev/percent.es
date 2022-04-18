//

import { type uint8 } from "@i-xi-dev/fundamental";
import {
  type _ResolvedOptions,
  PercentOptions,
  _decode,
  _encode,
  _resolveOptions,
} from "./percent";
import { PercentDecoder } from "./decoder";
import { PercentEncoder } from "./encoder";

const _MIN_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_FRAGMENT_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x3C, 0x3E, 0x60 ] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_QUERY_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x23, 0x3C, 0x3E ] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_SPECIAL_QUERY_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x23, 0x27, 0x3C, 0x3E ] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_PATH_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60, 0x7B, 0x7D ] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_USERINFO_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x23, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ] as Array<uint8>),
  spaceAsPlus: false,
});

const _URI_COMPONENT_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ] as Array<uint8>),
  spaceAsPlus: false,
});

const _FORM_URLENCODED_OPTIONS: _ResolvedOptions = Object.freeze({
  encodeSet: Object.freeze([ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ] as Array<uint8>),
  spaceAsPlus: true,
});

namespace PercentEncoding {
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
   * The predefined options.
   */
  export namespace Options {
    /**
     * The options for the C0 controls percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[]` |
     * | `spaceAsPlus` | `false` |
     */
    export const C0: Options = _MIN_OPTIONS;

    /**
     * The options for the URL fragment percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_FRAGMENT: Options = _URI_FRAGMENT_OPTIONS;

    /**
     * The options for the URL query percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_QUERY: Options = _URI_QUERY_OPTIONS;

    /**
     * The options for the URL special-query percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x27, 0x3C, 0x3E ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_SPECIAL_QUERY: Options = _URI_SPECIAL_QUERY_OPTIONS;

    /**
     * The options for the URL path percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60, 0x7B, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_PATH: Options = _URI_PATH_OPTIONS;

    /**
     * The options for the URL userinfo percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_USERINFO: Options = _URI_USERINFO_OPTIONS;

    /**
     * The options for the URL component percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
     * | `spaceAsPlus` | `false` |
     */
    export const URI_COMPONENT: Options = _URI_COMPONENT_OPTIONS;

    /**
     * The options for the application/x-www-form-urlencoded percent-encode
     * 
     * | field | value |
     * | :--- | :--- |
     * | `encodeSet` | `[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]` |
     * | `spaceAsPlus` | `true` |
     */
    export const FORM_URLENCODED: Options = _FORM_URLENCODED_OPTIONS;
  }

  export const Decoder = PercentDecoder;

  export const Encoder = PercentEncoder;
}
Object.freeze(PercentEncoding);

export {
  PercentEncoding,
};
