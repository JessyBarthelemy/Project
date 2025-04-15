import { Test } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { clearDatabase } from '../SetupTest';
import { UserController } from 'src/user/user.controller';
import { UserDto } from 'src/user/Dto/user.dto';
import { pick } from 'lodash';
import { UserService } from 'src/user/user.service';
import { BadRequestException } from '@nestjs/common';
import { UserError } from 'src/user/user.error';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResetPasswordDto } from 'src/user/Dto/resetPassword.dto';
import { addDays, subDays } from 'date-fns';
import { UserProvider } from 'src/user/Enum/UserProvider';

jest.mock('../../mail/mail.service');

describe('UserService', () => {
  let app: any;
  let appModule: any;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
    }).compile();
    app = appModule.createNestApplication();
    await app.init();

    userService = appModule.get(UserService);
    userRepository = appModule.get(getRepositoryToken(User));
  });

  describe('User controller', () => {
    it('should create a user', async () => {
      const userController = appModule.get(UserController);
      const user: UserDto = {
        email: 'test@example.com',
        password: 'test',
      };

      const createdUser = await userController.createUser(user);

      expect({ ...pick(user, 'email'), id: 1 }).toEqual(
        pick(createdUser, ['email', 'id']),
      );
    });

    it('should request a new password', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@example.com';
      mockUser.password = 'test';
      mockUser.provider = UserProvider.LOCAL;
      await userRepository.save(mockUser);

      const userController = appModule.get(UserController);
      await userController.requestPasswordChange({ email: 'test@example.com' });

      const user = await userService.findOne(mockUser.email);
      expect(user.resetPasswordToken).not.toBeNull();
      expect(user.resetPasswordExpiration).not.toBeNull();
    });

    it('should update the password by token', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@example.com';
      mockUser.password = '';
      mockUser.resetPasswordToken = '123456';
      mockUser.resetPasswordExpiration = addDays(new Date(), 1);
      mockUser.provider = UserProvider.LOCAL;
      await userRepository.save(mockUser);

      const userController = appModule.get(UserController);
      await userController.updatePassword(mockUser.id, {
        password: 'test',
        resetPasswordToken: mockUser.resetPasswordToken,
      } as ResetPasswordDto);

      const user = await userService.findOne(mockUser.email);

      expect(user.password).not.toBeNull();
      expect(user.resetPasswordToken).toBeNull();
      expect(user.resetPasswordExpiration).toBeNull();
    });

    it('should not update the password by token due to expiration', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@example.com';
      mockUser.password = '';
      mockUser.resetPasswordToken = '123456';
      mockUser.resetPasswordExpiration = subDays(new Date(), 1);
      mockUser.provider = UserProvider.LOCAL;
      await userRepository.save(mockUser);

      const userController = appModule.get(UserController);
      const promise = userController.updatePassword(mockUser.id, {
        password: 'test',
        resetPasswordToken: mockUser.resetPasswordToken,
      } as ResetPasswordDto);

      await expect(promise).rejects.toEqual(
        new BadRequestException(UserError.PASSWORD_TOKEN_EXPIRED),
      );
    });
  });

  describe('User service', () => {
    it('should check duplicate', async () => {
      const userService = appModule.get(UserService);
      const user: UserDto = {
        email: 'test@example.com',
        password: 'test',
      };

      await userService.create(user);

      await expect(userService.create(user)).rejects.toEqual(
        new BadRequestException(UserError.DUPLICATE_USER),
      );
    });
  });

  afterEach(async () => {
    await clearDatabase(app);
  });

  afterAll(async () => {
    await app.close();
  });
});
