import * as moment from 'moment-timezone';
import { CreateBudgetDto } from 'src/feature/budget/budget.dto';

export class Util {
  public static isDefaultCategory(categoryName: string) {
    const defaultCategory = [
      '식비',
      '카페/간식',
      '쇼핑',
      '교통',
      '취미',
      '의료',
      '여행',
      '교육',
      '편의점/마트',
      '주거',
      '보험/세금',
    ];

    return defaultCategory.includes(categoryName);
  }

  public static checkDuplicateCategoryIds(createBudgetDto: CreateBudgetDto[]) {
    const categoryIds = createBudgetDto.map((budget) => budget.categoryId);
    const duplicateCategoryIds = categoryIds.filter(
      (item, index) => categoryIds.indexOf(item) !== index,
    );
    return duplicateCategoryIds;
  }

  public static removeAllExceptNumbers(amount: string) {
    return amount.replace(/[^0-9]/g, '');
  }

  public static calculationTotalAmount(array) {
    if (array.length <= 0) {
      return 0;
    }
    return array
      .map((array) => Number(array.amount))
      .reduce((acc, cur) => {
        return acc + cur;
      });
  }

  public static calculationDate() {
    const today = moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const lastDay = moment(today).endOf('month').format('YYYY-MM-DD HH:mm:ss');
    const remainingDay = moment(lastDay).date() - moment(today).date();
    const lastMonth = moment(today).subtract(1, 'month').format('YYYY-MM-DD');

    return {
      today: today,
      lastDay: lastDay,
      remainingDay: remainingDay,
      lastMonth: lastMonth,
    };
  }
}
