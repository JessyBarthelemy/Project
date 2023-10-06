import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dto/CreateUserDto';
import * as bcrypt from 'bcrypt';
import { UserError } from './user.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new BadRequestException(UserError.DUPLICATE_USER);
    }

    return await this.userRepository.save({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
  }
}
