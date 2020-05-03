import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { UserEntity } from './users.entity';

@Entity()
export class PostsEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  body: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.posts)
  user: UserEntity;
}
