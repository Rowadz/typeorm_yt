import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { PostsEntity } from './posts.entity';

@Entity({ name: 'users' })
export class UserEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'is_active', nullable: false })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birthDate: Date;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => PostsEntity, (post: PostsEntity) => post.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  posts: Array<PostsEntity>;
}
