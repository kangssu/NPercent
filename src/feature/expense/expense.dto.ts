import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  categoryId!: number;

  @IsString()
  amount!: string;

  @IsString()
  comment!: string;

  @IsString()
  expensedAt!: Date;

  @IsBoolean()
  isExcludingTotal!: boolean;

  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  expensedAt?: Date;

  @IsOptional()
  @IsBoolean()
  isExcludingTotal?: boolean;
}
