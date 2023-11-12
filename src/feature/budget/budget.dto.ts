import { IsNumber, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  categoryId!: number;

  @IsString()
  amount!: string;
}
