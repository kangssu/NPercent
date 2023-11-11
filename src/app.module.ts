import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig, { DatabaseConfig } from './config/databaseConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './entity/user.entity';
import { Category } from './entity/category.entity';
import { Budget } from './entity/budget.entity';
import { Expense } from './entity/expense.entity';
import { UserModule } from './feature/user/user.module';
import { CategoryModule } from './feature/category/category.module';
import { BudgetModule } from './feature/budget/budget.module';
import { ExpenseModule } from './feature/expense/expense.module';
import { SearchModule } from './feature/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [User, Category, Budget, Expense],
          synchronize: false, // 사용시에만 true
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
    UserModule,
    CategoryModule,
    BudgetModule,
    ExpenseModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
