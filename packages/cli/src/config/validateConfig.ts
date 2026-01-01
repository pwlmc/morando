import schema from "./config-v0.schema.json";
import Ajv from "ajv";

const ajv = new Ajv();

export default function validateConfig(config: Record<string, unknown>) {
  const validate = ajv.compile(schema);
  const errors = validate(config);

  console.log(errors);
}
