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
import { BudgetService } from './budget.service';
import {
  CreateBudgetDto,
  UpdateBudgetDto,
  RecommendBudgetDto,
} from './budget.dto';
import { Budget } from 'src/entity/budget.entity';
import { ApiResult } from 'src/custom/resultApi';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/decorator/userDecorator';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { Util } from 'src/util/util';
import { CategoryLib } from '../category/category.lib';

@UseGuards(JwtAuthGuard)
@Controller('/budgets')
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly categoryLib: CategoryLib,
  ) {}

  @Post()
  async createBudgets(
    @UserInfo() userResponse: User,
    @Body() createBudgetDto: CreateBudgetDto[],
  ): Promise<ApiResult<Budget[]>> {
    const categories =
      await this.categoryLib.getCategoriesByCategoryIds(createBudgetDto);
    if (categories.length < 1) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_CATEGORY,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    const duplicateCategoryIds =
      Util.CheckDuplicateCategoryIds(createBudgetDto);
    const duplicateBudget = await this.budgetService.getBudgetsByCategoryIds(
      userResponse.id,
      createBudgetDto,
    );

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
    @UserInfo() userResponse: User,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<ApiResult<Budget>> {
    const budget = await this.budgetService.getBudgetById(id);
    const duplicateBudget = await this.budgetService.getBudgetsByCategoryIds(
      userResponse.id,
      [updateBudgetDto],
    );

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

  @Get('/recommend')
  getBudgetsRecommend(
    @UserInfo() userResponse: User,
    @Body() RecommendBudgetDto: RecommendBudgetDto,
  ): Promise<{ categoryName: string; recommendAmount: number }[]> {
    return this.budgetService.getBudgetRecommend(
      userResponse.id,
      RecommendBudgetDto,
    );
  }

  @Delete('/:id')
  async deleteBudgetById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResult<Budget>> {
    const budget = await this.budgetService.getBudgetById(id);

    if (!budget) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_BUDGET,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      data: await this.budgetService.deleteBudgetById(id),
    };
  }
}
