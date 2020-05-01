import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

const app = async () => {
  const connection = await createConnection({
    type: 'sqlite',
    database: './db/testing_typeorm.db',
    // host: 'localhost',
    // port: 3306,
    // username: 'test',
    // password: 'test',
    // database: 'test',
  });
};

app();
