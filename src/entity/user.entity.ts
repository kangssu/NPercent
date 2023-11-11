import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Expense } from './expense.entity';
import { Budget } from './budget.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 30 })
  email!: string;

  @Column({ type: 'varchar', length: 50 })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null;

  @OneToMany(() => Category, (categories) => categories.user)
  categories!: Category[];

  @OneToMany(() => Budget, (budgets) => budgets.user)
  budgets!: Budget[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses!: Expense[];
}
