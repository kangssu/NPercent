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
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { UserInfo } from 'src/decorator/userDecorator';
import { User } from 'src/entity/user.entity';
import { ApiResult } from 'src/custom/resultApi';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Util } from 'src/util/util';
import { BudgetLib } from '../budget/budget.lib';

@UseGuards(JwtAuthGuard)
@Controller('/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly budgetLib: BudgetLib,
  ) {}

  @Post()
  async createCategory(
    @UserInfo() userResponse: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResult<Category>> {
    const isDefaultCategory = Util.isDefaultCategory(createCategoryDto.name);
    const category = await this.categoryService.getCategoryByNameAndUserId(
      createCategoryDto.name,
      userResponse.id,
    );

    if (isDefaultCategory || category) {
      throw new HttpException(
        ErrorMessage.DUPLICATE_CATEGORY_NAME_EXISTS,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.categoryService.createCategory(
        userResponse.id,
        createCategoryDto,
      ),
    };
  }

  @Patch('/:id')
  async updateCategoryById(
    @UserInfo() userResponse: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResult<Category>> {
    const category = await this.categoryService.getCategoryById(id);
    const isDefaultCategory = Util.isDefaultCategory(updateCategoryDto.name);
    const duplicateCategory =
      await this.categoryService.getCategoryByNameAndUserId(
        updateCategoryDto.name,
        userResponse.id,
      );

    if (!category) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_CATEGORY,
        ErrorHttpStatus.NOT_FOUND,
      );
    }
    if (isDefaultCategory || duplicateCategory) {
      throw new HttpException(
        ErrorMessage.DUPLICATE_CATEGORY_NAME_EXISTS,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.categoryService.updateCategoryByIdAndUserId(
        updateCategoryDto,
        category,
      ),
    };
  }

  @Get()
  async getCategories(
    @UserInfo() userResponse: User,
  ): Promise<ApiResult<Category[]>> {
    return {
      success: true,
      data: await this.categoryService.getCategories(userResponse.id),
    };
  }

  @Delete('/:id')
  async deleteCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResult<Category>> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_CATEGORY,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    const budget = await this.budgetLib.getBudgetByCategoryId(id);
    if (budget) {
      throw new HttpException(
        ErrorMessage.NOT_DELETE_BUDGET_REGISTERED_CATEGORY,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.categoryService.deleteCategoryById(id),
    };
  }
}
