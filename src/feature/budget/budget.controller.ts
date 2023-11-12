import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './budget.dto';
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
    const budget =
      await this.budgetService.getBudgetsByCategoryIds(createBudgetDto);

    if (duplicateCategoryIds.length > 0) {
      throw new HttpException(
        ErrorMessage.DUPLICATE_CATEGORY_NAME_EXISTS,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }
    if (budget.length > 0) {
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
}
