import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH } from '../user.entity';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;
}
