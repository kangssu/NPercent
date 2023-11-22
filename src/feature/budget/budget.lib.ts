import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/entity/budget.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetLib {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  getBudgetsByUserIdAndCategoryIds(userId: number): Promise<Budget[]> {
    return this.budgetRepository
      .createQueryBuilder('budgets')
      .leftJoinAndSelect('budgets.category', 'category')
      .where('budgets.userId=:userId', { userId: userId })
      .andWhere('category.id in (:ids)', { ids: [3, 4, 6] })
      .getMany();
  }

  getBudgetByCategoryId(categoryId: number) {
    return this.budgetRepository.findOne({ where: { categoryId: categoryId } });
  }
}
