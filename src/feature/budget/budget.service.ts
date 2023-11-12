import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/entity/budget.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './budget.dto';
import { Util } from 'src/util/util';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async createBudgets(
    createBudgetDto: CreateBudgetDto[],
    userId: number,
  ): Promise<Budget[]> {
    const budgets = [];

    for (let i = 0; i < createBudgetDto.length; i++) {
      const amount = Util.RemoveAllExceptNumbers(createBudgetDto[i].amount);

      const budget = await this.budgetRepository.save({
        ...createBudgetDto[i],
        amount: amount,
        user: { id: userId },
        category: { id: createBudgetDto[i].categoryId },
      });
      budgets.push(budget);
    }

    return budgets;
  }

  async getBudgetsByCategoryIds(
    createBudgetDto: CreateBudgetDto[],
  ): Promise<Budget[]> {
    const categoryIds = createBudgetDto.map((budget) => budget.categoryId);
    const budgets = await this.budgetRepository
      .createQueryBuilder('budgets')
      .leftJoinAndSelect('budgets.category', 'category')
      .where('category.id in (:ids)', { ids: categoryIds })
      .getMany();

    return budgets;
  }
}
