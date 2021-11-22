import { TransformStream } from "node:stream/web";
globalThis.TransformStream = TransformStream;

export {
  PercentDecoderStream,
  PercentEncoderStream,
} from "../../dist/stream/index.js";
