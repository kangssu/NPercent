import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './expense.dto';
import { Expense } from 'src/entity/expense.entity';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/decorator/userDecorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  createExpense(
    @UserInfo() userResponse: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.createExpense(userResponse.id, createExpenseDto);
  }
}
