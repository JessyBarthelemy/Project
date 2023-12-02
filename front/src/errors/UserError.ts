import type { ValidationError } from '@/types/ValidationError';

export const USER_ERROR = {
  emailRequired: { code: 'emailRequired', message: 'Veuillez saisir votre email' } as ValidationError,
  passwordRequired: { code: 'passwordRequired', message: 'Veuillez saisir votre mot de passe' } as ValidationError,
};
