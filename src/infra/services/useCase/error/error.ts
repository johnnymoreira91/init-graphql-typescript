export enum LogLevel {
  Debug = 'debug',
  Info = 'log',
  Error = 'error',
}

export class CustomError extends Error {
  public readonly status: number;
  public readonly logLevel: LogLevel;

  constructor(message: string, status: number, logLevel: LogLevel = LogLevel.Error) {
    super(message);
    this.status = status;
    this.logLevel = logLevel;
  }

  public log(): void {
    const logFn = console[this.logLevel] || console.error;
    logFn(`[${new Date().toISOString()}] ${this.logLevel.toUpperCase()}: ${this.message}`);
  }
}
