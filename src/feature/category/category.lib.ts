import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from '../budget/budget.dto';

@Injectable()
export class CategoryLib {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getCategoriesByUserIdAndIds(
    userId: number,
    createBudgetDto: CreateBudgetDto[],
  ): Promise<Category[]> {
    const categoryIds = createBudgetDto.map((budget) => budget.categoryId);

    return this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.userId in (:userIds)', { userIds: [userId, 0] })
      .andWhere('categories.id in (:ids)', { ids: categoryIds })
      .getMany();
  }

  getCategoriesByCategoryIds(
    createBudgetDto: CreateBudgetDto[],
  ): Promise<Category[]> {
    const categoryIds = createBudgetDto.map(
      (createBudgetDto) => createBudgetDto.categoryId,
    );

    const categories = this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.id in (:ids)', { ids: categoryIds })
      .getMany();

    return categories;
  }
}
