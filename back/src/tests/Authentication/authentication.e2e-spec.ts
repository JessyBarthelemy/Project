import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app/app.module';
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
    repository = moduleFixture.get(getRepositoryToken(User));
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
    repository.insert({
      email: 'test@tes.example.com',
      password: '$2b$10$U/W1MCv3mzcv2Z9xKeMxn.j16rXcgrLfwJyP5.P0sKClQKtztXt0y',
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@tes.example.com',
        password: 'test',
      });
    expect(response.status).toBe(HttpStatus.CREATED);
    authToken = response.body.token;
    expect(authToken).not.toBeNull();
  });

  afterEach(async () => {
    await clearDatabase(app);
  });

  afterAll(async () => {
    await app.close();
  });
});
