import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserLib } from './user.lib';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserLib],
  exports: [UserLib],
})
export class UserModule {}
