import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './category.dto';

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

  getCategoryByNameAndUserId(name: string, userId: number) {
    return this.categoryRepository.findOne({
      where: {
        name: name,
        user: { id: userId },
      },
    });
  }
}
