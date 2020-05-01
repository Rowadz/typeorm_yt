import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

/**
 * in sqlite there is no date types
 * so I'll store them as string but look at the example below
 */
export class SharedProp {
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt: Date;
}

/*
  *postgresql example*
export class SharedProp {
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
*/
