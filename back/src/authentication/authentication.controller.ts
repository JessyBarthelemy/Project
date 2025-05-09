import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { OAuth2Client } from 'google-auth-library';
import { AuthenticationError } from './authentication.error';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authenticationService.login(req.user);
  }

  @Post('login/google')
  async verifyGoogleToken(@Body('token') token: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = {
        email: payload.email,
        name: payload.name,
      };

      return await this.authenticationService.loginGoogle(user);
    } catch {
      throw new BadRequestException(AuthenticationError.GOOGLE_AUTH);
    }
  }
}
