import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/entity/budget.entity';
import { Repository } from 'typeorm';
import {
  CreateBudgetDto,
  UpdateBudgetDto,
  RecommendBudgetDto,
} from './budget.dto';
import { Util } from 'src/util/util';

interface userTotalAmountObject {
  userId: number;
  totalAmount: string;
}

interface userBudgetRatiosObject {
  userId: number;
  categoryName: string;
  ratio: number;
}

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
        categoryId: createBudgetDto[i].categoryId,
      });
      budgets.push(budget);
    }

    return budgets;
  }

  async updateBudgetById(
    updateBudgetDto: UpdateBudgetDto,
    budget: Budget,
  ): Promise<Budget> {
    if (updateBudgetDto.categoryId) {
      budget.categoryId = updateBudgetDto.categoryId;
    }
    if (updateBudgetDto.amount) {
      const amount = Util.RemoveAllExceptNumbers(updateBudgetDto.amount);
      budget.amount = amount;
    }
    return await this.budgetRepository.save(budget);
  }

  async getBudgetsByCategoryIds(
    userId: number,
    createBudgetDto: CreateBudgetDto[] | UpdateBudgetDto[],
  ): Promise<Budget[]> {
    const categoryIds = createBudgetDto.map((budget) => budget.categoryId);
    const budgets = await this.budgetRepository
      .createQueryBuilder('budgets')
      .leftJoinAndSelect('budgets.category', 'category')
      .leftJoinAndSelect('budgets.user', 'user')
      .where('category.id in (:ids)', { ids: categoryIds })
      .andWhere('user.id = :userId', { userId: userId })
      .getMany();

    return budgets;
  }

  getBudgetById(id: number): Promise<Budget> {
    return this.budgetRepository.findOneBy({ id: id });
  }

  getBudgets(userId: number): Promise<Budget[]> {
    return this.budgetRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async getBudgetRecommend(
    userId: number,
    recommendBudgetDto: RecommendBudgetDto,
  ): Promise<{ categoryName: string; recommendAmount: number }[]> {
    const otherUserBudgets = await this.budgetRepository
      .createQueryBuilder('budgets')
      .leftJoinAndSelect('budgets.category', 'category')
      .where('budgets.userId != :userId', { userId: userId })
      .getMany();

    const otherUserBudgetTotalAmounts = await this.budgetRepository
      .createQueryBuilder('budgets')
      .select([
        'budgets.userId as userId',
        'SUM(budgets.amount) as totalAmount',
      ])
      .where('budgets.userId != :userId', { userId: userId })
      .groupBy('budgets.userId')
      .getRawMany();

    // 1. 유저의 예산 리스트에 총 예산 금액 속성 추가.
    for (let i = 0; i < otherUserBudgets.length; i++) {
      const userBudgetAddTotalAmounts: userTotalAmountObject =
        otherUserBudgetTotalAmounts.find(
          (otherUserTotalAmount) =>
            otherUserTotalAmount.userId === otherUserBudgets[i].userId,
        );

      otherUserBudgets[i]['totalAmount'] =
        userBudgetAddTotalAmounts.totalAmount;
    }

    // 2. 유저의 기본 카테고리별 예산금액 / 총 예산금액 비율 계산.
    const userBudgetRatios: userBudgetRatiosObject[] = otherUserBudgets
      .map((otherUserBudget, i) => {
        const defaultCategory = [
          '식비', '카페/간식', '쇼핑', '교통', '취미',
          '의료', '여행', '교육', '편의점/마트', '주거', '보험/세금',
        ];

        if (defaultCategory.includes(otherUserBudget.category.name)) {
          const ratioOfFoodExpenses =
            (Number(otherUserBudget.amount) /
              Number(otherUserBudget.totalAmount)) *
            100;
          return {
            userId: otherUserBudget.userId,
            categoryName: otherUserBudget.category.name,
            ratio: ratioOfFoodExpenses,
          };
        }
      })
      .filter((data) => data !== undefined);

    // 3. 중복되지 않는 총 유저의 수.
    const userIds = userBudgetRatios.map((user) => user.userId);
    const deduplicationUserIds = userIds.filter((data, index) => {
      return userIds.indexOf(data) === index;
    });

    // 4. 유저 예산 리스트에서 기본 카테고리 이름이 중복된 비율 값 합친 다음에 평균 구하기.
    const userBudgetAverageRatios = await this.calculationUserBudgetTotalRatios(
      userBudgetRatios,
      deduplicationUserIds,
    );

    // 5. 유저의 총 예산 금액에서 카테고리별 비율을 적용하여 최종 추천 금액 계산.
    const defaultCategoryRecommendedAmounts = userBudgetAverageRatios.map(
      (averageByCategory) => {
        return {
          categoryName: averageByCategory.categoryName,
          recommendAmount: Math.floor(
            (averageByCategory.ratio / 100) * Number(recommendBudgetDto.amount),
          ),
        };
      },
    );

    return defaultCategoryRecommendedAmounts;
  }

  deleteBudgetById(id: number): Promise<Budget> {
    return this.budgetRepository.softRemove({ id: id });
  }

  private calculationUserBudgetTotalRatios(
    userBudgetRatios: userBudgetRatiosObject[],
    deduplicationUserIds: number[],
  ) {
    const userBudgetAverageRatios = userBudgetRatios
      .reduce((acc, current) => {
        const existingCategory = acc.find(
          (item) =>
            item.userId !== current.userId &&
            item.categoryName === current.categoryName,
        );

        if (existingCategory) {
          existingCategory.ratio += current.ratio;
        } else {
          acc.push({
            categoryName: current.categoryName,
            ratio: current.ratio,
          });
        }

        return acc;
      }, [])
      .map((item) => ({
        categoryName: item.categoryName,
        ratio: Math.floor((item.ratio / deduplicationUserIds.length) * 10) / 10,
      }));

    return userBudgetAverageRatios;
  }
}
