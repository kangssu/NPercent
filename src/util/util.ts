import { CreateBudgetDto } from 'src/feature/budget/budget.dto';

export class Util {
  public static CheckDuplicateDefaultCategory(categoryName: string) {
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

  public static CheckDuplicateCategoryIds(createBudgetDto: CreateBudgetDto[]) {
    const categoryIds = createBudgetDto.map((budget) => budget.categoryId);
    const duplicateCategoryIds = categoryIds.filter(
      (item, index) => categoryIds.indexOf(item) !== index,
    );
    return duplicateCategoryIds;
  }

  public static RemoveAllExceptNumbers(amount: string) {
    return amount.replace(/[^0-9]/g, '');
  }
}
