import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { UserEntity } from './users.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  body: string;

  // pass () => UserEntity or just a string 'UserEntity' <--- name of the class
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  // `JoinColumn` can be used on both one-to-one and many-to-one relations to specify custom column name
  // or custom referenced column.
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
