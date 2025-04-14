import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserProvider } from 'src/user/Enum/UserProvider';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }

    const passwordValid = user.provider === UserProvider.LOCAL && await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Connexion échouée');
    }

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginGoogle(user: any) {
    let payload = await this.usersService.findOne(user.email);
    if (!payload) {
      payload = await this.usersService.create({
        email: user.email,
        password: null
      }, UserProvider.GOOGLE);
    }
    return this.login(payload);
  }
}
