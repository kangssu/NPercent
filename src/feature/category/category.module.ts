import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryLib } from './category.lib';
import { BudgetModule } from '../budget/budget.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), BudgetModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryLib],
})
export class CategoryModule {}
