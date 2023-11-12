import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './budget.dto';
import { Budget } from 'src/entity/budget.entity';
import { ApiResult } from 'src/custom/resultApi';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/decorator/userDecorator';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { Util } from 'src/util/util';

@UseGuards(JwtAuthGuard)
@Controller('/budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async createBudgets(
    @UserInfo() userResponse: User,
    @Body() createBudgetDto: CreateBudgetDto[],
  ): Promise<ApiResult<Budget[]>> {
    const duplicateCategoryIds =
      Util.CheckDuplicateCategoryIds(createBudgetDto);
    const duplicateBudget =
      await this.budgetService.getBudgetsByCategoryIds(createBudgetDto);

    if (duplicateCategoryIds.length > 0) {
      throw new HttpException(
        ErrorMessage.DUPLICATE_CATEGORY_NAME_EXISTS,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }
    if (duplicateBudget.length > 0) {
      throw new HttpException(
        ErrorMessage.CATEGORY_ALREADY_REGISTERED_IN_THE_BUDGET,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.budgetService.createBudgets(
        createBudgetDto,
        userResponse.id,
      ),
    };
  }

  @Patch('/:id')
  async updateBudgetById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<ApiResult<Budget>> {
    const budget = await this.budgetService.getBudgetById(id);
    const duplicateBudget = await this.budgetService.getBudgetsByCategoryIds([
      updateBudgetDto,
    ]);

    if (!budget) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_BUDGET,
        ErrorHttpStatus.NOT_FOUND,
      );
    }
    if (duplicateBudget.length > 0) {
      throw new HttpException(
        ErrorMessage.CATEGORY_ALREADY_REGISTERED_IN_THE_BUDGET,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.budgetService.updateBudgetById(updateBudgetDto, budget),
    };
  }

  @Get()
  async getBudgets(
    @UserInfo() userResponse: User,
  ): Promise<ApiResult<Budget[]>> {
    return {
      success: true,
      data: await this.budgetService.getBudgets(userResponse.id),
    };
  }
}
