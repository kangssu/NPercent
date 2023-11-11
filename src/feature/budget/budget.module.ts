import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { Budget } from 'src/entity/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
