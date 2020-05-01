import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SharedProp } from './sharedProp.helper';

@Entity()
export class UserEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;
}
