import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';
import { CreateCategoryDto } from './category.dto';
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
    const isduplicate = Util.CheckDuplicateDefaultCategory(
      createCategoryDto.name,
    );
    const category = await this.categoryService.getCategoryByNameAndUserId(
      createCategoryDto.name,
      userResponse.id,
    );

    if (isduplicate || category) {
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
}
