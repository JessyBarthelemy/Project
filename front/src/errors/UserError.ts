import type { ValidationError } from '@/types/ValidationError';

export const USER_ERROR = {
  emailRequired: { code: 'emailRequired', message: 'Veuillez saisir votre email' } as ValidationError,
  passwordRequired: { code: 'passwordRequired', message: 'Veuillez saisir votre mot de passe' } as ValidationError,
  passwordSize: { code: 'passwordSize', message: 'Le mot de passe doit faire au moins 6 caractères' } as ValidationError,
  passwordConfirm: { code: 'passwordConfirm', message: 'Les mots de passes ne correspondent pas' } as ValidationError,
};
