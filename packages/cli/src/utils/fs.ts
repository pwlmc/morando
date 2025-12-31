import path from "node:path";
import { createRequire } from "node:module";
import os from "node:os";
const require = createRequire(import.meta.url);

export function pkgRootPath() {
  const pkgJsonPath = require.resolve("@morando/cli/package.json");
  return path.dirname(pkgJsonPath);
}

function expandTilde(p: string) {
  if (p === "~") return os.homedir();
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

export function resolveUserPath(input: string) {
  return path.resolve(process.cwd(), expandTilde(input));
}
