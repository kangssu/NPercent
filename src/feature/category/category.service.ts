import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  createCategory(
    userId: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.save({
      ...createCategoryDto,
      user: { id: userId },
    });
  }

  updateCategoryByIdAndUserId(
    updateCategoryDto: UpdateCategoryDto,
    category: Category,
  ): Promise<Category> {
    if (updateCategoryDto) {
      category.name = updateCategoryDto.name;
    }

    return this.categoryRepository.save(category);
  }

  getCategoryByNameAndUserId(name: string, userId: number): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: name,
        user: { id: userId },
      },
    });
  }

  getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async getCategories(userId: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.userId = :userId', { userId })
      .orWhere('categories.userId = :defaultUserId', { defaultUserId: 0 })
      .getMany();
  }

  deleteCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.softRemove({ id: id });
  }
}
