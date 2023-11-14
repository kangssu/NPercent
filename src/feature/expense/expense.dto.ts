import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

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
