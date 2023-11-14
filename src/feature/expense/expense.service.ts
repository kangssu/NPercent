import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';

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

  updateExpenseById(
    expense: Expense,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    if (updateExpenseDto.categoryId) {
      expense.categoryId = updateExpenseDto.categoryId;
    }
    if (updateExpenseDto.amount) {
      expense.amount = updateExpenseDto.amount;
    }
    if (updateExpenseDto.comment) {
      expense.comment = updateExpenseDto.comment;
    }
    if (updateExpenseDto.expenseDate) {
      expense.expenseDate = updateExpenseDto.expenseDate;
    }
    if (expense.isExcludingTotal !== undefined) {
      expense.isExcludingTotal = updateExpenseDto.isExcludingTotal;
    }

    return this.expenseRepository.save(expense);
  }

  getExpenseById(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id: id });
  }
}
