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

@UseGuards(JwtAuthGuard)
@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @UserInfo() userResponse: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResult<Category>> {
    const isDuplicate = Util.CheckDuplicateDefaultCategory(
      createCategoryDto.name,
    );
    const category = await this.categoryService.getCategoryByNameAndUserId(
      createCategoryDto.name,
      userResponse.id,
    );

    if (isDuplicate || category) {
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
    const isDuplicate = Util.CheckDuplicateDefaultCategory(
      updateCategoryDto.name,
    );
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
    if (isDuplicate || duplicateCategory) {
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
}
