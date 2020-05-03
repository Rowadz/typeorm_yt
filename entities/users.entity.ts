import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  // pass () => PostsEntity or just a string 'PostsEntity' <--- name of the class
  @OneToMany(() => PostsEntity, (post: PostsEntity) => post.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: Array<PostsEntity>;
}
