import { Logger, QueryRunner } from 'typeorm';
import {
  createLogger,
  Logger as WinstonLogger,
  transports,
  format,
} from 'winston';
import { Format } from 'logform';

export class CustomerLogger implements Logger {
  private readonly queryLogger: WinstonLogger;
  private readonly customFormat: Format;
  constructor() {
    this.customFormat = format.printf(
      ({ level, message, label, timestamp }) =>
        `${timestamp} [${label}] ${level}: ${message}`
    );
    this.queryLogger = createLogger({
      transports: new transports.File({
        filename: 'query.log',
        level: 'debug',
      }),
      format: this.customFormat,
    });

    this.queryLogger.on('error', () => console.error(':('));
    this.queryLogger.error = (err) => void console.error(err);
  }
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message: `${query} - ${JSON.stringify(parameters)}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    throw new Error('Method not implemented.');
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    throw new Error('Method not implemented.');
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    // throw new Error('Method not implemented.');
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
}
