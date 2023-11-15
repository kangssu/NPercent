import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchExpenseDto {
  @IsString()
  startedAt!: string;

  @IsString()
  endAt!: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isExcludingTotal?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  minAmount?: string;

  @IsOptional()
  @IsString()
  maxAmount?: string;
}
