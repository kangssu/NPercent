import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLib } from '../user/user.lib';

@Injectable()
export class AuthService {
  constructor(
    private readonly userLib: UserLib,
    private readonly jwtService: JwtService,
  ) {}

  getUserByEmail(email: string) {
    return this.userLib.getUserByEmail(email);
  }

  async validateUser(
    user: User,
  ): Promise<{ accessToken: string; user: User }> {
    const payload = {
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: user,
    };
  }
}
