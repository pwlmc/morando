import { MorandoConfig } from "./model";

export default function validateConfig(
  // oxlint-disable-next-line no-unused-vars
  config: Record<string, unknown>
): config is MorandoConfig {
  return true; // Placeholder for actual validation logic e.g., using Zod
}
