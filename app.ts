import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { UserEntity, PostsEntity } from './entities';
import { createUsers } from './crud/';

const app = async () => {
  const connection: Connection = await createConnection({
    type: 'sqlite',
    database: './db/testing_typeorm.db',
    entities: [UserEntity, PostsEntity],
    // host: 'localhost',
    // port: 3306,
    // username: 'test',
    // password: 'test',
    // database: 'test',
  });
  // Creates database schema for all entities registered in this connection.
  // Can be used only after connection to the database is established.
  // pass true to drop everything b4 creating anything
  await connection.synchronize(true);
  await createUsers(connection);
};

app();
