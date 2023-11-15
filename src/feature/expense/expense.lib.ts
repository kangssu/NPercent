import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { Repository } from 'typeorm';
import { SearchExpenseDto } from '../search/search.dto';

@Injectable()
export class ExpenseLib {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async searchExpensesByCondition(
    startedAt: string,
    endAt: string,
    isExcludingTotal: boolean,
    categoryId?: number,
    minAmount?: string,
    maxAmount?: string,
  ): Promise<Expense[]> {
    const startDate = new Date(startedAt);
    const endDate = new Date(endAt);

    const query = this.expenseRepository
      .createQueryBuilder('expenses')
      .where(
        'expenses.expensedAt BETWEEN DATE_SUB (:startDate, INTERVAL 1 DAY) AND :endDate',
        { startDate: startDate, endDate: endDate },
      )
      .andWhere('expenses.isExcludingTotal =:isExcludingTotal', {
        isExcludingTotal: Boolean(isExcludingTotal),
      });

    if (categoryId) {
      query.andWhere('expenses.categoryId = :categoryId', {
        categoryId: categoryId,
      });
    }
    if (minAmount && maxAmount) {
      query.andWhere('expenses.amount BETWEEN :minAmount AND :maxAmount', {
        minAmount: minAmount,
        maxAmount: maxAmount,
      });
    }

    const expenses = await query.getMany();
    return expenses;
  }
}
