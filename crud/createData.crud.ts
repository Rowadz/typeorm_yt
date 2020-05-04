import { Connection, Repository } from 'typeorm';
import { name, internet, random, date, lorem, hacker } from 'faker';
import {
  UserEntity,
  PostsEntity,
  CategoriesEntity,
  CategoriesPostsEntity,
} from '../entities';
import { writeFileSync } from 'fs';

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
  const posts: Array<PostsEntity> = [];
  for (const user of users) {
    const body = lorem.paragraphs();
    const post1: Partial<PostsEntity> = new PostsEntity(body);
    const post2: Partial<PostsEntity> = new PostsEntity(body);
    post1.user = user;
    post2.user = user;
    posts.push((await con.manager.save(post1)) as PostsEntity);
    posts.push((await con.manager.save(post2)) as PostsEntity);
  }
  await readUsers(con);
  await manyToManyCreate(con, posts);
};

const manyToManyCreate = async (con: Connection, posts: Array<PostsEntity>) => {
  await createCat(con);
  const categoriesRepository: Repository<CategoriesEntity> = con.getRepository(
    CategoriesEntity
  );
  const categoriesPostsRepository: Repository<CategoriesPostsEntity> = con.getRepository(
    CategoriesPostsEntity
  );
  const categories: Array<CategoriesEntity> = await categoriesRepository.find();
  for (const post of posts) {
    const someColumn = hacker.adjective();
    const catPost = new CategoriesPostsEntity(
      someColumn,
      post,
      random.arrayElement(categories)
    );
    await categoriesPostsRepository.save(catPost);
  }
};

const createCat = async (con: Connection) => {
  const categoriesRepository: Repository<CategoriesEntity> = con.getRepository(
    CategoriesEntity
  );
  for (const _ of Array.from({ length: 10 })) {
    const label = hacker.verb();
    const categoryToSave: Partial<CategoriesEntity> = new CategoriesEntity(
      label
    );
    await categoriesRepository.save(categoryToSave);
  }
};

const readUsers = async (con: Connection) => {
  const userRepository: Repository<UserEntity> = con.getRepository(UserEntity);
  const data = await userRepository.find();
  //   const data = await userRepository.find({ order: { birthDate: 'ASC' } });
  //   const data = await userRepository.find({ take: 1, skip: 6 });
  //   const data = await userRepository.findOne(8);
  //   const data = await userRepository.find({ relations: ['posts'] });
  //   const data = await userRepository.find({
  //     where: { currentDate: Raw((alias) => `${alias} < NOW()`) },
  //   });
  writeFileSync('data.json', JSON.stringify(data, null, 2));
};

export { createUsers };
