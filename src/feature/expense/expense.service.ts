import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  createExpense(userId: number, createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.save({
      ...createExpenseDto,
      user: { id: userId },
    });
  }
}
