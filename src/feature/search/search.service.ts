import { Injectable } from '@nestjs/common';
import { ExpenseLib } from '../expense/expense.lib';
import { SearchExpenseDto } from './search.dto';
import { Expense } from 'src/entity/expense.entity';

@Injectable()
export class SearchService {
  constructor(private readonly expenseLib: ExpenseLib) {}

  searchExpensesByCondition(
    searchExpenseDto: SearchExpenseDto,
  ): Promise<Expense[]> {
    return this.expenseLib.searchExpensesByCondition(
      searchExpenseDto.startedAt,
      searchExpenseDto.endAt,
      searchExpenseDto.isExcludingTotal ?? false,
      searchExpenseDto.categoryId,
      searchExpenseDto.minAmount,
      searchExpenseDto.maxAmount,
    );
  }
}
