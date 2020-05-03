import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SharedProp } from './sharedProp.helper';
import { CategoriesPostsEntity } from './categoriesPosts.entity';

// postgresql example enum
// enum CategoriesLabels {
//   coffee = 'coffee',
//   snacks = 'snacks',
//   time = 'time',
//   programming = 'programming',
// }

@Entity({ name: 'categories' })
export class CategoriesEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  //   postgresql example enum
  //   @Column({
  //     type: 'enum',
  //     enum: CategoriesLabels,
  //     default: CategoriesLabels.programming,
  //   })
  //   label: string;

  @OneToMany(
    () => CategoriesPostsEntity,
    (categoriesPosts: CategoriesPostsEntity) => categoriesPosts.category
  )
  categoriesPosts: Array<CategoriesPostsEntity>;
}
