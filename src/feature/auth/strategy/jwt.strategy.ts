import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/entity/user.entity';
import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';
import { ErrorMessage } from 'src/enum/errorMessage.enum';
import { UserLib } from 'src/feature/user/user.lib';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userLib: UserLib) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<User> {
    console.log(process.env.NODE_ENV);
    const user = await this.userLib.getUserByEmail(payload.email);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_USER,
        ErrorHttpStatus.NOT_FOUND,
      );
    }
  }
}
