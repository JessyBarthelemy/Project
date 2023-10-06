import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/User/user.module';
import { UserService } from 'src/User/user.service';
import { LocalStrategy } from './local.auth';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/User/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.stategy';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthenticationService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
