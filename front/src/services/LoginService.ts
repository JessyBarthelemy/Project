import type { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import type { User } from '@/types/User';
import { ValidationError } from '@/exceptions/ValidationError';
import { USER_ERROR } from '@/errors/UserError';

class LoginService extends BaseService {
  private checkEmail(email: string|null) {
    if (!email) {
      throw new ValidationError(USER_ERROR.emailRequired.code, USER_ERROR.emailRequired.message);
    }
  }

  // #region api call
  async login(user: User) : Promise<AxiosResponse> {
    const { email, password } = user;
    this.checkEmail(email);

    if (!password) {
      throw new ValidationError(USER_ERROR.passwordRequired.code, USER_ERROR.passwordRequired.message);
    }

    return this.axiosInstance.post('/auth/login', { email, password });
  }

  async resetPassword(email: string|null) {
    this.checkEmail(email);
  }

  // #endregion
}

export const loginService = new LoginService();
