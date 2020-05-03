import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { PostsEntity } from './posts.entity';
import { CategoriesEntity } from './categories.entity';

@Entity({ name: 'categories_posts' })
export class CategoriesPostsEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'some_column' })
  someColumn: string;

  @ManyToOne(() => PostsEntity, (post: PostsEntity) => post.categoriesPosts)
  post: PostsEntity;

  @ManyToOne(
    () => CategoriesEntity,
    (category: CategoriesEntity) => category.categoriesPosts
  )
  category: CategoriesEntity;
}
