import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { ApiResult } from 'src/custom/resultApi';

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
}
