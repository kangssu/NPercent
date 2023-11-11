import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const bcryptPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = bcryptPassword;
    const user = await this.userRepository.save(createUserDto);

    return user;
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  async updateUserByEmail(userPasswordResponse: string, user: User): Promise<User> {
    if(userPasswordResponse){
      const bcryptPassword = await bcrypt.hash(userPasswordResponse, 10);
      user.password = bcryptPassword;
    }

    await this.userRepository.save(user);
    return user;
  }
}
