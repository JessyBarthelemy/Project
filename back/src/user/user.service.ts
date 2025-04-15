import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserError } from './user.error';
import { v4 as uuid } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { addDays } from 'date-fns';
import { BaseService } from 'src/base/BaseService';
import { UserDto } from './Dto/user.dto';
import { UserProvider } from './Enum/UserProvider';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {
    super(userRepository);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async create(
    user: UserDto,
    provider: UserProvider,
  ): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new BadRequestException(UserError.DUPLICATE_USER);
    }

    const userToCreate: Partial<User> = { ...user };

    if (provider === UserProvider.LOCAL) {
      userToCreate.password = await bcrypt.hash(user.password, 10);
      userToCreate.provider = UserProvider.LOCAL;
    } else {
      userToCreate.password = null;
      userToCreate.provider = UserProvider.GOOGLE;
    }

    const newUser = this.userRepository.create(userToCreate);
    return await this.userRepository.save(newUser);
  }

  checkProvider(user: User, providerToCheck: UserProvider) {
    if (user.provider !== providerToCheck) {
      throw new BadRequestException(UserError.PROVIDER_ACTION_FORBIDDEN);
    }
  }

  async requestPasswordChange(email: string) {
    const urlParam = new URLSearchParams();
    const user = await this.findOne(email);

    if (!user) {
      return;
    }

    this.checkProvider(user, UserProvider.LOCAL);
    user.resetPasswordToken = uuid();
    user.resetPasswordExpiration = addDays(new Date(), 1);
    await this.userRepository.update(user.id, user);

    urlParam.append('token', user.resetPasswordToken);

    this.mailService.sendUserConfirmation(
      email,
      `${process.env.APP_FRONT_URL}/user/${
        user.id
      }/password/reset?${urlParam.toString()}`,
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

    this.checkProvider(user, UserProvider.LOCAL);

    if (user.resetPasswordExpiration < new Date()) {
      throw new BadRequestException(UserError.PASSWORD_TOKEN_EXPIRED);
    }

    user.password = bcrypt.hash(password, 10);
    user.resetPasswordExpiration = null;
    user.resetPasswordToken = null;
    await this.userRepository.save(user);
  }
}
