import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { LoginUserDto } from '../user/user.dto';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import * as bcrypt from 'bcrypt';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.authService.getUserByEmail(loginUserDto.email);
    const passwordCheck = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!user) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_USER,
        ErrorHttpStatus.NOT_FOUND,
      );
    }

    if (!passwordCheck) {
      throw new HttpException(
        ErrorMessage.USER_PASSWORD_DOESNT_MATCH,
        ErrorHttpStatus.BAD_REQEUST,
      );
    }

    return await this.authService.validateUser(user);
  }
}
