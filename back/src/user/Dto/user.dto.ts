import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH } from '../user.entity';

export class UserDto {
  @IsEmail({}, { message: 'Adresse e-mail invalide' })
  email: string;

  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères`,
  })
  password: string;
}
