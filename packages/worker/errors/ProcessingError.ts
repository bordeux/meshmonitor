export class ProcessingError extends Error {
  constructor(
    message: string,
    public readonly previousError?: unknown,
    public readonly data: Record<string, any> = {},
  ) {
    super(message);
    this.name = "ProcessingError";
  }

  public getData() {
    return this.data;
  }

  public getPreviousError() {
    return this.previousError;
  }
}
