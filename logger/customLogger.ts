import { Logger, QueryRunner } from 'typeorm';

export class CustomerLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {}

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
    throw new Error('Method not implemented.');
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
}
