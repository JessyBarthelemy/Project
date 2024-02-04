import { IsNotEmpty, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH } from '../user.entity';

export class ResetPasswordDto {
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @IsNotEmpty()
  resetPasswordToken: string;
}
