import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './Dto/user.dto';
import { EmailDto } from './Dto/email.dto';
import { ResetPasswordDto } from './Dto/resetPassword.dto';
import { UserProvider } from './Enum/UserProvider';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return await this.userService.create(user, UserProvider.LOCAL);
  }

  @Post('password/request')
  async requestPasswordChange(@Body() body: EmailDto) {
    this.userService.requestPasswordChange(body?.email);
  }

  @Post(':id/password/reset')
  async updatePassword(
    @Param('id') id: number,
    @Body() body: ResetPasswordDto,
  ) {
    await this.userService.updatePassword(
      id,
      body?.password,
      body?.resetPasswordToken,
    );
  }
}
