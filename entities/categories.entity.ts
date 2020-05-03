import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProp } from './sharedProp.helper';

enum CategoriesLabels {
  coffee = 'coffee',
  snacks = 'snacks',
  time = 'time',
  programming = 'programming',
}

@Entity({ name: 'categories' })
export class CategoriesEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CategoriesLabels,
    default: CategoriesLabels.programming,
  })
  label: string;
}
