import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserLib {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }
}
