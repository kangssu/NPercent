import { Controller, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Expense } from 'src/entity/expense.entity';
import { SearchExpenseDto } from './search.dto';
import { ApiResult } from 'src/custom/resultApi';

@Controller('/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/expenses')
  async searchExpensesByCondition(
    @Query() searchExpenseDto: SearchExpenseDto,
  ): Promise<ApiResult<Expense[]>> {
    return {
      success: true,
      data: await this.searchService.searchExpensesByCondition(
        searchExpenseDto,
      ),
    };
  }
}
