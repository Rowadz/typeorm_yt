import { Connection } from 'typeorm';
import { name, internet, random, date, lorem } from 'faker';
import { UserEntity, PostsEntity } from '../entities';

const createUsers = async (con: Connection) => {
  const users: Array<UserEntity> = [];
  for (const _ of Array.from({ length: 10 })) {
    const firstName = name.firstName();
    const lastName = name.lastName();
    const isActive = random.arrayElement([true, false]);
    const email = internet.email();
    const password = internet.password();
    const birthDate = date.past();
    const user: Partial<UserEntity> = new UserEntity(
      firstName,
      lastName,
      isActive,
      email,
      birthDate,
      password
    );
    users.push((await con.manager.save(user)) as UserEntity);
  }
  await createPosts(con, users);
};

const createPosts = async (con: Connection, users: Array<UserEntity>) => {
  for (const user of users) {
    const body = lorem.paragraphs();
    const post1: Partial<PostsEntity> = new PostsEntity(body);
    const post2: Partial<PostsEntity> = new PostsEntity(body);
    post1.user = user;
    post2.user = user;
    await con.manager.save(post1);
    await con.manager.save(post2);
  }
};

export { createUsers };
