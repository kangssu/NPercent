import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { BudgetLib } from '../budget/budget.lib';
import { Util } from 'src/util/util';
import * as moment from 'moment-timezone';
import { Budget } from 'src/entity/budget.entity';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';

interface BudgetCategoriesRatioObject {
  userId: number;
  categoryName: string;
  ratio: number;
}

export interface CategoriesAvailableAmountObject {
  categoryName: string;
  reasonableAmount: number;
  massage?: string;
  todayExpenseCategoriesTotal?: ExpenseCategoriesAmount;
  todayExpenseTotalAmount?: number;
}

interface ExpenseCategoriesAmount {
  categoryName: string;
  expenseAmount: string;
}

export interface TodayExpenseObject {
  todayExpenseAmount: number;
  categoriesAvailableAmount: CategoriesAvailableAmountObject[];
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
    createExpenseDto.userId = userId;
    return this.expenseRepository.save(createExpenseDto);
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
  ): Promise<TodayExpenseObject> {
    const dates = Util.calculationDate();
    const budgets =
      await this.budgetLib.getBudgetsByUserIdAndCategoryIds(userId);
    const expenses = await this.expenseRepository.findBy({
      userId: userId,
    });

    if (budgets.length < 1) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_BUDGET,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    const budgetTotalAmount = Util.calculationTotalAmount(budgets);
    const expenseTotalAmount = Util.calculationTotalAmount(expenses);

    for (let i = 0; i < budgets.length; i++) {
      budgets[i]['totalAmount'] = budgetTotalAmount;
    }

    const reasonableExpenseAmount =
      Math.floor(budgetTotalAmount / moment(dates.lastDay).date() / 10) * 10;
    const todayExpenseAmount =
      Math.floor(
        (budgetTotalAmount - expenseTotalAmount) / dates.remainingDay / 10,
      ) * 10;

    const budgetCategoriesRatio: BudgetCategoriesRatioObject[] =
      this.calculationBudgetCategoriesRatio(budgets);

    const categoriesAvailableAmount: CategoriesAvailableAmountObject[] =
      this.calculationCategoriesAvailableAmount(
        reasonableExpenseAmount,
        todayExpenseAmount,
        budgetCategoriesRatio,
      );

    return {
      todayExpenseAmount: todayExpenseAmount,
      categoriesAvailableAmount: categoriesAvailableAmount,
    };
  }

  async getTodayGuideExpensesByUserId(
    userId: number,
  ): Promise<TodayExpenseObject> {
    const dates = Util.calculationDate();
    const budgets =
      await this.budgetLib.getBudgetsByUserIdAndCategoryIds(userId);
    const expenses = await this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .where('expense.userId = :userId', { userId: userId })
      .getMany();

    if (budgets.length < 1) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_BUDGET,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    const budgetTotalAmount = Util.calculationTotalAmount(budgets);
    const expenseTotalAmount = Util.calculationTotalAmount(expenses);

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
    if (todayExpense.length < 1) {
      throw new HttpException(
        ErrorMessage.NOT_EXPENSE_TODAT,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    const todayExpenseTotalAmount = Util.calculationTotalAmount(todayExpense);
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

    const reasonableExpenseAmount =
      Math.floor(budgetTotalAmount / moment(dates.lastDay).date() / 10) * 10;
    const todayExpenseAmount =
      Math.floor(
        (budgetTotalAmount - expenseTotalAmount) / dates.remainingDay / 10,
      ) * 10;

    const budgetCategoriesRatio: BudgetCategoriesRatioObject[] =
      this.calculationBudgetCategoriesRatio(budgets);

    const categoriesAvailableAmount: CategoriesAvailableAmountObject[] =
      this.calculationCategoriesAvailableAmount(
        reasonableExpenseAmount,
        todayExpenseAmount,
        budgetCategoriesRatio,
        todayExpenseCategoriesAmount,
        todayExpenseTotalAmount,
      );

    return {
      todayExpenseAmount: todayExpenseTotalAmount,
      categoriesAvailableAmount: categoriesAvailableAmount,
    };
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
        const isDefaultCategory = Util.isDefaultCategory(budget.category.name);

        if (isDefaultCategory) {
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
    reasonableExpenseAmount: number,
    todayExpenseAmount: number,
    budgetCategoriesRatio: BudgetCategoriesRatioObject[],
    todayExpenseCategoriesAmount?: ExpenseCategoriesAmount[],
    todayExpenseTotalAmount?: number,
  ) {
    const categoriesAvailableAmount = budgetCategoriesRatio.map(
      (budgetCategoryRatio) => {
        const nomalReasonableAmount =
          (budgetCategoryRatio.ratio / 100) * todayExpenseAmount;
        const reasonableAmount =
          Math.floor(
            nomalReasonableAmount <= 0
              ? ((budgetCategoryRatio.ratio / 100) * reasonableExpenseAmount) /
                  2
              : nomalReasonableAmount / 10,
          ) * 10;

        const massage = (
          reasonableExpenseAmount: number,
          todayExpenseAmount: number,
        ) => {
          if (reasonableExpenseAmount === todayExpenseAmount) {
            return '와우! 하루 사용 금액을 완벽하게 지키고 있어요!';
          }
          if (reasonableExpenseAmount < todayExpenseAmount) {
            return '하루 사용 금액보다 더 아껴쓰고 있어요!';
          }
          if (reasonableExpenseAmount > todayExpenseAmount) {
            return '하루 사용 금액보다 더 사용했지만 최대한 아껴보아요!';
          }
        };

        if (
          todayExpenseTotalAmount &&
          todayExpenseCategoriesAmount.length > 0
        ) {
          const existingCategory = todayExpenseCategoriesAmount.filter(
            (todayExpenseCategory) =>
              todayExpenseCategory.categoryName ===
              budgetCategoryRatio.categoryName,
          );
          const expenseAmount =
            existingCategory.length > 0
              ? Number(existingCategory[0].expenseAmount)
              : 0;
          const riskRatio =
            ((expenseAmount - reasonableAmount) / reasonableAmount) * 100;

          return {
            categoryName: budgetCategoryRatio.categoryName,
            reasonableAmount: reasonableAmount,
            expenseAmount: expenseAmount,
            riskRatio: riskRatio > 0 ? riskRatio : 0,
          };
        } else {
          return {
            massage: massage(reasonableExpenseAmount, todayExpenseAmount),
            categoryName: budgetCategoryRatio.categoryName,
            reasonableAmount: reasonableAmount,
          };
        }
      },
    );

    return categoriesAvailableAmount;
  }
}
