import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { UserEntity, PostsEntity } from './entities';
import { getManager } from 'typeorm';

const app = async () => {
  const connection = await createConnection({
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
  const u = new UserEntity();
  u.birthDate = new Date();
  u.firstName = 'rowad';
  u.lastName = 'z';
  u.isActive = true;
  u.email = 'test@test.com';
  u.password = `${Math.random()}`;
  const entityManager = getManager();
  await entityManager.save(u);
};

app();
