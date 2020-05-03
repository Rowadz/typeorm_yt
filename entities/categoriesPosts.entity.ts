import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { PostsEntity } from './posts.entity';
import { CategoriesEntity } from './categories.entity';

@Entity({ name: 'categories_posts' })
export class CategoriesPostsEntity extends SharedProp {
  constructor(
    someColumn: string,
    post: PostsEntity,
    category: CategoriesEntity
  ) {
    super();
    this.someColumn = someColumn;
    this.post = post;
    this.category = category;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'some_column' })
  someColumn: string;

  @ManyToOne(() => PostsEntity, (post: PostsEntity) => post.categoriesPosts)
  @JoinColumn({ name: 'post_id' })
  post: PostsEntity;

  @ManyToOne(
    () => CategoriesEntity,
    (category: CategoriesEntity) => category.categoriesPosts
  )
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;
}
