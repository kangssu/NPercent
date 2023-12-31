import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Expense } from './expense.entity';
import { Budget } from './budget.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Budget, (budgets) => budgets.category)
  budgets!: Budget[];

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses!: Expense[];
}
