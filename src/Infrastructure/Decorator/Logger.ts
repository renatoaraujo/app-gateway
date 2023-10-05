import RootPath from 'app-root-path';
import * as path from 'path';
import { LoggerModes, Logger as OvernightLogger } from '@overnightjs/logger';
import * as fs from 'fs';
import moment from 'moment';

export default class Logger {
  private readonly logger: OvernightLogger = new OvernightLogger();

  public setup() {
    const logsDir = path.join(RootPath.toString(), 'var', 'logs');

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    const logFileName = `${moment().format('YYYY-M-d')}.log`;
    const logFilePath = path.join(logsDir, logFileName);

    if (!fs.existsSync(logFilePath)) {
      fs.openSync(logFilePath, 'w');
    }

    process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.File;
    process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
  }

  public addError(context: any): void {
    this.logger.err(context);
  }

  public addInfo(context: any): void {
    this.logger.info(context);
  }

  public addWarning(context: any): void {
    this.logger.warn(context);
  }
}
