import { cosmiconfig, defaultLoaders } from "cosmiconfig";
import { register } from "ts-node";
import validateConfig from "./validateCOnfig";

register({ transpileOnly: true });

const explorer = cosmiconfig("morando", {
  loaders: {
    ".ts": defaultLoaders[".js"], // use JS loader after TS transpilation
  },
});

export default async function loadConfig() {
  const result = await explorer.search();
  if (!result) {
    throw new Error(
      `Morando configuration not found. Please run 'morando init' to create a configuration file.`
    );
  }
  // todo: validate config
  return result.config;
}
