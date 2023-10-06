import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from 'src/User/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/App/app.module';
import { clearDatabase } from '../SetupTest';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let repository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    repository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
  });

  it('disallow invalid credentials', async () => {
    const user = {
      email: 'test@example.com',
      password: 'baspassword',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('return an authorization token for valid credentials', async () => {
    const user: Partial<User> = {
      email: 'test@tes.example.com',
      password: 'test',
    };
    repository.insert(user);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);
    console.log(response);
    expect(response.status).toBe(HttpStatus.OK);
    authToken = response.body.token;
  });

  afterEach(async () => {
    await clearDatabase(app);
  });

  afterAll(async () => {
    await app.close();
  });
});
