import { Test } from '@nestjs/testing';
import { DatabaseModule } from 'src/Database/database.module';
import { UserModule } from 'src/User/user.module';
import { clearDatabase } from '../SetupTest';
import { UserController } from 'src/User/user.controller';
import { CreateUserDto } from 'src/User/Dto/CreateUserDto';
import { omit } from 'lodash';
import { UserService } from 'src/User/user.service';
import { BadRequestException } from '@nestjs/common';
import { UserError } from 'src/User/user.error';

describe('UserService', () => {
  let app: any;
  let appModule: any;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
    }).compile();
    app = appModule.createNestApplication();
    await app.init();
  });

  describe('User controller', () => {
    it('should create a user', async () => {
      const userController = appModule.get(UserController);
      const user: CreateUserDto = {
        email: 'test@example.com',
        password: 'test',
      };

      const createdUser = await userController.createUser(user);

      expect({ ...omit(user, 'password'), id: 1 }).toStrictEqual(
        omit(createdUser, ['password']),
      );
    });
  });

  describe('User service', () => {
    it('should check duplicate', async () => {
      const userService = appModule.get(UserService);
      const user: CreateUserDto = {
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
