import type { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import { User } from '../types/user/User';
import { ValidationError } from '../exceptions/ValidationError';
import { USER_ERROR } from '../errors/UserError';
import { ResetPassword } from '../types/user/ResetPassword';
import api from '../tools/axios';

const PASSWORD_MIN_LENGTH = 6;

class LoginService extends BaseService {
  private checkEmail(email: string | null) {
    if (!email) {
      throw new ValidationError(USER_ERROR.emailRequired.code, USER_ERROR.emailRequired.message);
    }
  }

  private checkPassword(password: string | null) {
    if (!password) {
      throw new ValidationError(
        USER_ERROR.passwordRequired.code,
        USER_ERROR.passwordRequired.message
      );
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new ValidationError(USER_ERROR.passwordSize.code, USER_ERROR.passwordSize.message);
    }
  }

  // #region api call
  async login(user: User): Promise<AxiosResponse> {
    const { email, password } = user;
    this.checkEmail(email);
    this.checkPassword(password);

    return api.post('/auth/login', { email, password });
  }

  async loginWithGoogle(token: string): Promise<AxiosResponse> {
    return api.post('/auth/login/google', { token });
  }

  async signUp(user: User): Promise<AxiosResponse> {
    const { email, password } = user;
    this.checkEmail(email);
    this.checkPassword(password);

    return api.post('/user', { email, password });
  }

  async requestResetPassword(email: string | null): Promise<AxiosResponse> {
    this.checkEmail(email);
    return api.post('/user/password/request', { email });
  }

  async resetPassword({ password, confirmPassword }: ResetPassword): Promise<AxiosResponse> {
    this.checkPassword(password);
    if (password !== confirmPassword) {
      throw new ValidationError(
        USER_ERROR.passwordConfirm.code,
        USER_ERROR.passwordConfirm.message
      );
    }

    return api.post('/user/password/request', { password });
  }

  // #endregion
}

export const loginService = new LoginService();
