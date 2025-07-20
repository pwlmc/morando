import { Schema, validate } from "jtd";
import configJtd from "./config.jtd.json";
const configSchema = configJtd as Schema;

export default function validateConfig(
  config: Record<string, unknown>
): string[] {
  const errors = validate(configSchema, config);

  // todo: impement human-readable error communicates
  // The current implementation is a stub for the future improvement.
  // Context: JTD returns an array of error objects that might be hard
  // to read for the end-users. We should aim to provide
  // more informative errors when the config is not valid.
  const formattedErrors = errors.map((error) => JSON.stringify(error));

  return formattedErrors;
}
