import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ExpenseLib } from './expense.lib';
import { BudgetModule } from '../budget/budget.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), BudgetModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseLib],
  exports: [ExpenseLib],
})
export class ExpenseModule {}
