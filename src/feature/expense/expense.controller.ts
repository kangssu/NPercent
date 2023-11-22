import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ExpenseService,
  LastMonthAndThisMonthCompareObject,
  TodayExpenseObject,
} from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { Expense } from 'src/entity/expense.entity';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/decorator/userDecorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiResult } from 'src/custom/resultApi';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { BudgetLib } from '../budget/budget.lib';

@UseGuards(JwtAuthGuard)
@Controller('/expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly budgetLib: BudgetLib,
  ) {}

  @Post()
  async createExpense(
    @UserInfo() userResponse: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ApiResult<Expense>> {
    const budget = await this.budgetLib.getBudgetByCategoryId(
      createExpenseDto.categoryId,
    );
    if (!budget) {
      throw new HttpException(
        ErrorMessage.NOT_BUDGET_REGISTERED_FOR_THAT_CATEGORY,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.expenseService.createExpense(
        userResponse.id,
        createExpenseDto,
      ),
    };
  }

  @Patch('/:id')
  async updateExpenseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ApiResult<Expense>> {
    const expense = await this.expenseService.getExpenseById(id);

    if (!expense) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_EXPENSE,
        ErrorHttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      data: await this.expenseService.updateExpenseById(
        expense,
        updateExpenseDto,
      ),
    };
  }

  @Get('/today-recommend')
  async getTodayRecommendExpenses(
    @UserInfo() userResponse: User,
  ): Promise<ApiResult<TodayExpenseObject>> {
    return {
      success: true,
      data: await this.expenseService.getTodayRecommendExpensesByUserId(
        userResponse.id,
      ),
    };
  }

  @Get('/today-guide')
  async getTodayGuideExpenses(
    @UserInfo() userResponse: User,
  ): Promise<ApiResult<TodayExpenseObject>> {
    return {
      success: true,
      data: await this.expenseService.getTodayGuideExpensesByUserId(
        userResponse.id,
      ),
    };
  }

  @Get('/statistics')
  async getStatistics(
    @UserInfo() userResponse: User,
  ): Promise<ApiResult<LastMonthAndThisMonthCompareObject>> {
    return {
      success: true,
      data: await this.expenseService.getStatistics(userResponse.id),
    };
  }

  @Delete('/:id')
  async deleteExpenseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResult<Expense>> {
    const expense = await this.expenseService.getExpenseById(id);

    if (!expense) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_EXPENSE,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      data: await this.expenseService.deleteExpenseById(id),
    };
  }
}
