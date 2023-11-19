import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { BudgetLib } from '../budget/budget.lib';
import { Util } from 'src/util/util';
import * as moment from 'moment-timezone';
import { Budget } from 'src/entity/budget.entity';

interface BudgetCategoriesRatioObject {
  userId: number;
  categoryName: string;
  ratio: number;
}

export interface CategoriesAvailableAmountObject {
  categoryName: string;
  useAmount: number;
  massage?: string;
  todayExpenseCategoriesTotal?: ExpenseCategoriesAmount;
  todayExpenseTotalAmount?: number;
}

interface ExpenseCategoriesAmount {
  categoryName: string;
  expenseAmount: string;
}

export interface LastMonthAndThisMonthCompareObject {
  lastMonthTotalAmountCompareRatio: number;
  lastMonthCateogiesCompareRatio: {
    categoryName: string;
    ratio: number;
  }[];
}

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly budgetLib: BudgetLib,
  ) {}

  createExpense(userId: number, createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.save({
      ...createExpenseDto,
      user: { id: userId },
    });
  }

  updateExpenseById(
    expense: Expense,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    if (updateExpenseDto.categoryId) {
      expense.categoryId = updateExpenseDto.categoryId;
    }
    if (updateExpenseDto.amount) {
      expense.amount = updateExpenseDto.amount;
    }
    if (updateExpenseDto.comment) {
      expense.comment = updateExpenseDto.comment;
    }
    if (updateExpenseDto.expensedAt) {
      expense.expensedAt = updateExpenseDto.expensedAt;
    }
    if (expense.isExcludingTotal !== undefined) {
      expense.isExcludingTotal = updateExpenseDto.isExcludingTotal;
    }

    return this.expenseRepository.save(expense);
  }

  getExpenseById(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id: id });
  }

  async getTodayRecommendExpensesByUserId(
    userId: number,
  ): Promise<CategoriesAvailableAmountObject[]> {
    const dates = Util.calculationDate();
    // TODO: budgets, expenses 데이터 존재하지 않을 경우 예외처리 추가.
    const budgets =
      await this.budgetLib.getBudgetsByUserIdAndCategoryIds(userId);
    const expenses = await this.expenseRepository.findBy({
      userId: userId,
    });

    const budgetTotalAmount = Util.SumCalculation(budgets);
    const expenseTotalAmount = Util.SumCalculation(expenses);

    for (let i = 0; i < budgets.length; i++) {
      budgets[i]['totalAmount'] = budgetTotalAmount;
    }

    const reasonableSpendingAmount =
      Math.floor(budgetTotalAmount / moment(dates.lastDay).date() / 10) * 10;
    const todaySpendingAmount =
      Math.floor(
        (budgetTotalAmount - expenseTotalAmount) / dates.remainingDay / 10,
      ) * 10;

    const budgetCategoriesRatio: BudgetCategoriesRatioObject[] =
      this.calculationBudgetCategoriesRatio(budgets);

    const categoriesAvailableAmount: CategoriesAvailableAmountObject[] =
      this.calculationCategoriesAvailableAmount(
        reasonableSpendingAmount,
        todaySpendingAmount,
        budgetCategoriesRatio,
      );

    return categoriesAvailableAmount;
  }

  async getTodayGuideExpensesByUserId(userId: number) {
    const dates = Util.calculationDate();
    const budgets =
      await this.budgetLib.getBudgetsByUserIdAndCategoryIds(userId);
    const expenses = await this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .where('expense.userId = :userId', { userId: userId })
      .getMany();

    const budgetTotalAmount = Util.SumCalculation(budgets);
    const expenseTotalAmount = Util.SumCalculation(expenses);

    for (let i = 0; i < budgets.length; i++) {
      budgets[i]['totalAmount'] = budgetTotalAmount;
    }

    const todayExpense = expenses.filter((expense) => {
      const expenseAt = moment(expense.expensedAt).format('YYYY-MM-DD');
      const now = moment.tz('Asia/Seoul').format('YYYY-MM-DD');
      if (expenseAt === now) {
        return expense;
      }
    });
    const todayExpenseTotalAmount = Util.SumCalculation(todayExpense);

    const todayExpenseCategoriesAmount = todayExpense.reduce((acc, current) => {
      const existingCategory = acc.find(
        (acc) => acc.categoryName === current.category.name,
      );

      if (existingCategory) {
        existingCategory.expenseAmount += Number(current.amount);
      } else {
        acc.push({
          categoryName: current.category.name,
          expenseAmount: Number(current.amount),
        });
      }

      return acc;
    }, []);

    const reasonableSpendingAmount =
      Math.floor(budgetTotalAmount / moment(dates.lastDay).date() / 10) * 10;
    const todaySpendingAmount =
      Math.floor(
        (budgetTotalAmount - expenseTotalAmount) / dates.remainingDay / 10,
      ) * 10;

    const budgetCategoriesRatio: BudgetCategoriesRatioObject[] =
      this.calculationBudgetCategoriesRatio(budgets);

    const categoriesAvailableAmount: CategoriesAvailableAmountObject[] =
      this.calculationCategoriesAvailableAmount(
        reasonableSpendingAmount,
        todaySpendingAmount,
        budgetCategoriesRatio,
        todayExpenseCategoriesAmount,
        todayExpenseTotalAmount,
      );

    return categoriesAvailableAmount;
  }

  async getStatistics(
    userId: number,
  ): Promise<LastMonthAndThisMonthCompareObject> {
    const dates = Util.calculationDate();
    const expenses = await this.expenseRepository
      .createQueryBuilder('expenses')
      .leftJoinAndSelect('expenses.category', 'category')
      .where('expenses.userId = :userId', { userId: userId })
      .getMany();

    // 지난달 지출 리스트
    const lastMotnExpenses = expenses.filter((expense) => {
      const expensedAt = moment(expense.expensedAt).format('YYYY-MM-DD');
      const day = moment(dates.lastMonth).date() - 1;
      const startedAt = moment(dates.lastMonth)
        .subtract(day, 'day')
        .format('YYYY-MM-DD');
      const endAt = moment(dates.lastMonth).add(1, 'day').format('YYYY-MM-DD');
      return (
        moment(expensedAt).isAfter(startedAt) &&
        moment(expensedAt).isBefore(endAt)
      );
    });

    // 이번달 지출 리스트
    const thisMonthExpenses = expenses.filter((expense) => {
      const expensedAt = moment(expense.expensedAt).format('YYYY-MM-DD');
      const day = moment(dates.today).date() - 1;
      const startedAt = moment(dates.today)
        .subtract(day, 'day')
        .format('YYYY-MM-DD');
      const endAt = moment(dates.today).add(1, 'day').format('YYYY-MM-DD');
      return (
        moment(expensedAt).isAfter(startedAt) &&
        moment(expensedAt).isBefore(endAt)
      );
    });

    // 지난달 지출 총액
    const lastMonthExpensesTotalAmount = lastMotnExpenses
      .map((lastMotnExpense) => Number(lastMotnExpense.amount))
      .reduce((acc, cur) => (acc += cur));

    // 이번달 지출 총액
    const thisMonthExpensesTotalAmount = thisMonthExpenses
      .map((thisMonthExpense) => Number(thisMonthExpense.amount))
      .reduce((acc, cur) => (acc += cur));

    // 지난달 지출 총액 대비 이번달 지출 총액 증가 소비율 계산
    const lastMonthTotalAmountCompareRatio = Math.floor(
      ((thisMonthExpensesTotalAmount - lastMonthExpensesTotalAmount) /
        lastMonthExpensesTotalAmount) *
        100,
    );

    // 지난달 카테고리별 지출 합
    const lastMonthCategoriesExpense: ExpenseCategoriesAmount[] =
      lastMotnExpenses.reduce((acc, cur) => {
        const existingCategory = acc.find(
          (acc) => acc.categoryName === cur.category.name,
        );

        if (existingCategory) {
          existingCategory.expenseAmount += Number(cur.amount);
        } else {
          acc.push({
            categoryName: cur.category.name,
            expenseAmount: Number(cur.amount),
          });
        }

        return acc;
      }, []);

    // 이번달 카테고리별 지출 합
    const thisMonthCategoriesExpense: ExpenseCategoriesAmount[] =
      thisMonthExpenses.reduce((acc, cur) => {
        const existingCategory = acc.find(
          (acc) => acc.categoryName === cur.category.name,
        );

        if (existingCategory) {
          existingCategory.expenseAmount += Number(cur.amount);
        } else {
          acc.push({
            categoryName: cur.category.name,
            expenseAmount: Number(cur.amount),
          });
        }

        return acc;
      }, []);

    // 지난달 대비 이번달 카테고리별 소비 비율
    const lastMonthCateogiesCompareRatio = thisMonthCategoriesExpense.map(
      (thisMonthCategoryExpense) => {
        const duplicateCategoriesExpense = [];
        lastMonthCategoriesExpense.filter((lastMonthCategoryExpense, i) => {
          if (
            lastMonthCategoryExpense.categoryName ===
            thisMonthCategoryExpense.categoryName
          ) {
            duplicateCategoriesExpense.push(lastMonthCategoryExpense);
          }
        });

        if (duplicateCategoriesExpense.length > 0) {
          return {
            categoryName: thisMonthCategoryExpense.categoryName,
            ratio: Math.floor(
              ((Number(thisMonthCategoryExpense.expenseAmount) -
                Number(duplicateCategoriesExpense[0].expenseAmount)) /
                Number(duplicateCategoriesExpense[0].expenseAmount)) *
                100,
            ),
          };
        } else {
          return {
            categoryName: thisMonthCategoryExpense.categoryName,
            ratio: 100,
          };
        }
      },
    );

    const combination = [
      ...lastMonthCategoriesExpense,
      ...lastMonthCateogiesCompareRatio,
    ];
    const categoryNames = combination.map((a) => a.categoryName);
    const duplicateCategoryNames = categoryNames.filter(
      (categoryName, index) => categoryNames.indexOf(categoryName) !== index,
    );

    for (let i = 0; i < lastMonthCategoriesExpense.length; i++) {
      if (
        !duplicateCategoryNames.includes(
          lastMonthCategoriesExpense[i].categoryName,
        )
      ) {
        lastMonthCateogiesCompareRatio.push({
          categoryName: lastMonthCategoriesExpense[i].categoryName,
          ratio: 0,
        });
      }
    }

    return {
      lastMonthTotalAmountCompareRatio: lastMonthTotalAmountCompareRatio,
      lastMonthCateogiesCompareRatio: lastMonthCateogiesCompareRatio,
    };
  }

  deleteExpenseById(id: number): Promise<Expense> {
    return this.expenseRepository.softRemove({ id: id });
  }

  private calculationBudgetCategoriesRatio(budgets: Budget[]) {
    const budgetCategoriesRatio = budgets
      .map((budget, i) => {
        const defaultCategory = [
          '식비', '카페/간식', '쇼핑', '교통', '취미',
          '의료', '여행', '교육', '편의점/마트', '주거', '보험/세금',
        ];

        if (defaultCategory.includes(budget.category.name)) {
          const categoryRatio =
            (Number(budget.amount) / Number(budget.totalAmount)) * 100;

          return {
            userId: budget.userId,
            categoryName: budget.category.name,
            ratio: categoryRatio,
          };
        }
      })
      .filter((data) => data !== undefined);

    return budgetCategoriesRatio;
  }

  private calculationCategoriesAvailableAmount(
    reasonableSpendingAmount: number,
    todaySpendingAmount: number,
    budgetCategoriesRatio: BudgetCategoriesRatioObject[],
    todayExpenseCategoriesAmount?: ExpenseCategoriesAmount[],
    todayExpenseTotalAmount?: number,
  ) {
    const categoriesAvailableAmount = budgetCategoriesRatio.map(
      (userBudgetRatio) => {
        const useAmount = (userBudgetRatio.ratio / 100) * todaySpendingAmount;
        const massage = (
          reasonableSpendingAmount: number,
          todaySpendingAmount: number,
        ) => {
          if (reasonableSpendingAmount === todaySpendingAmount) {
            return '와우! 하루 사용 금액을 완벽하게 지키고 있어요!';
          }
          if (reasonableSpendingAmount < todaySpendingAmount) {
            return '하루 사용 금액보다 더 아껴쓰고 있어요!';
          }
          if (reasonableSpendingAmount > todaySpendingAmount) {
            return '하루 사용 금액보다 더 사용했지만 최대한 아껴보아요!';
          }
        };

        if (
          todayExpenseTotalAmount &&
          todayExpenseCategoriesAmount.length > 0
        ) {
          const result = todayExpenseCategoriesAmount.filter(
            (test) => test.categoryName === userBudgetRatio.categoryName,
          );

          return {
            totalExpenses: todayExpenseTotalAmount,
            categoryName: userBudgetRatio.categoryName,
            useAmount: Math.floor(useAmount / 10) * 10,
            expenseAmount: result.length > 0 ? result[0].expenseAmount : 0,
          };
        } else {
          // TODO: useAmount = 0, 음수일 경우 적정 금액 추천 추가.
          return {
            massage: massage(reasonableSpendingAmount, todaySpendingAmount),
            categoryName: userBudgetRatio.categoryName,
            useAmount:
              Math.floor(useAmount < 5000 ? useAmount * 2 : useAmount / 10) *
              10,
          };
        }
      },
    );

    return categoriesAvailableAmount;
  }
}
