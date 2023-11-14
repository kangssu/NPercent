import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  categoryId!: number;

  @IsString()
  amount!: string;
}

export class UpdateBudgetDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  amount?: string;
}

export class RecommendBudgetDto {
  @IsString()
  amount!: string;
}
