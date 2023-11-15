import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ExpenseModule } from '../expense/expense.module';

@Module({
  imports: [ExpenseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
