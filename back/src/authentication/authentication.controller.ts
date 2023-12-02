import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { UserDto } from 'src/user/Dto/UserDto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UserDto) {
    return this.authenticationService.login(user);
  }
}
