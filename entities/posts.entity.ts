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

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
