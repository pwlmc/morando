export const CONFIG_FILE_NAME = ".morandorc.json";

export class MissingConfigError extends Error {
  public filePath: string;

  constructor(filePath: string) {
    super("Configuration file not found: " + filePath);
    this.filePath = filePath;
  }
}

export class MalformedConfigError extends Error {}

export class InvalidConfigError extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    super(`Invalid configuration: ${errors.join(", ")}`);
    this.errors = errors;
  }
}
