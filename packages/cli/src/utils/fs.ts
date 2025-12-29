import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export function pkgRootPath() {
  const pkgJsonPath = require.resolve("@morando/cli/package.json");
  return path.dirname(pkgJsonPath);
}
