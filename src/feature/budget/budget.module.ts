import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { Budget } from 'src/entity/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetService } from './budget.service';
import { CategoryModule } from '../category/category.module';
import { BudgetLib } from './budget.lib';

@Module({
  imports: [TypeOrmModule.forFeature([Budget]), CategoryModule],
  controllers: [BudgetController],
  providers: [BudgetService,BudgetLib],
  exports:[BudgetLib]
})
export class BudgetModule {}
