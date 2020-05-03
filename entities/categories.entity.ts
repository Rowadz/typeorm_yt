import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProp } from './sharedProp.helper';

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
}
