import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './Dto/UserDto';
import { EmailDto } from './Dto/EmailDto';
import { ResetPasswordDto } from './Dto/ResetPasswordDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return await this.userService.create(user);
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
