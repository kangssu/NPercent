import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  categoryId!: number;

  @IsString()
  amount!: string;

  @IsString()
  comment!: string;

  @IsString()
  expenseDate!: Date;

  @IsBoolean()
  isExcludingTotal!: boolean;
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
  expenseDate?: Date;

  @IsOptional()
  @IsBoolean()
  isExcludingTotal?: boolean;
}
