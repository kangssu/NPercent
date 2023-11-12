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
}
