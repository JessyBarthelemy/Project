import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './Dto/UserDto';
import * as bcrypt from 'bcrypt';
import { UserError } from './user.error';
import { v4 as uuid } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { addDays } from 'date-fns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async create(user: UserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new BadRequestException(UserError.DUPLICATE_USER);
    }

    const newUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return await this.userRepository.save(newUser);
  }

  async requestPasswordChange(email: string) {
    const urlParam = new URLSearchParams();
    const user = await this.findOne(email);

    if (!user) {
      return;
    }

    user.resetPasswordToken = uuid();
    user.resetPasswordExpiration = addDays(new Date(), 1);
    await this.userRepository.update(user.id, user);

    urlParam.append('token', user.resetPasswordToken);

    this.mailService.sendUserConfirmation(
      email,
      `${process.env.APP_FRONT_URL}/user/${ user.id }/password/reset?${urlParam.toString()}`,
    );
  }

  async updatePassword(
    id: number,
    password: string,
    resetPasswordToken: string,
  ) {
    const user = await this.userRepository.findOneBy({
      id,
      resetPasswordToken,
    });

    if (!user) {
      throw new BadRequestException(UserError.PASSWORD_CHANGE);
    }

    if (user.resetPasswordExpiration < new Date()) {
      throw new BadRequestException(UserError.PASSWORD_TOKEN_EXPIRED);
    }

    user.password = bcrypt.hash(password, 10);
    user.resetPasswordExpiration = null;
    user.resetPasswordToken = null;
    await this.userRepository.save(user);
  }
}
