import {
  Body,
  Controller,
  HttpException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { ApiResult } from 'src/custom/resultApi';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserInfo } from 'src/decorator/userDecorator';
import * as bcrypt from 'bcrypt';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResult<User>> {
    const user = await this.userService.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException(
        ErrorMessage.USER_ALREADY_EXISTS,
        ErrorHttpStatus.CONFLICT,
      );
    }

    return {
      success: true,
      data: await this.userService.createUser(createUserDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUserById(
    @UserInfo() userResponse: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResult<User>> {
    const user = await this.userService.getUserByEmail(userResponse.email);
    const passwordCheck = await bcrypt.compare(
      updateUserDto.password,
      user.password,
    );

    if (!user) {
      throw new HttpException(
        ErrorMessage.USER_ALREADY_EXISTS,
        ErrorHttpStatus.CONFLICT,
      );
    }
    if (passwordCheck) {
      throw new HttpException(
        ErrorMessage.USER_PASSWORD_SAME_AS_PREVIOUS,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return {
      success: true,
      data: await this.userService.updateUserByEmail(
        updateUserDto.password,
        user,
      ),
    };
  }
}
