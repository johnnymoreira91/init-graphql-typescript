class Logger {
    private readonly logLevel: LogLevel;
  
    constructor(logLevel: LogLevel = LogLevel.Info) {
      this.logLevel = logLevel;
    }
  
    debug(message: string, ...optionalParams: any[]) {
      if (this.logLevel <= LogLevel.Debug) {
        console.debug(`%cDEBUG: ${message}`, 'color: gray', ...optionalParams);
      }
    }
  
    info(message: string, ...optionalParams: any[]) {
      if (this.logLevel <= LogLevel.Info) {
        console.info(`%cINFO: ${message}`, 'color: blue', ...optionalParams);
      }
    }
  
    warn(message: string, ...optionalParams: any[]) {
      if (this.logLevel <= LogLevel.Warn) {
        console.warn(`%cWARN: ${message}`, 'color: orange', ...optionalParams);
      }
    }
  
    error(message: string, ...optionalParams: any[]) {
      if (this.logLevel <= LogLevel.Error) {
        console.error(`%cERROR: ${message}`, 'color: red', ...optionalParams);
      }
    }
  }
  
  enum LogLevel {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3,
  }

export const logger = new Logger()