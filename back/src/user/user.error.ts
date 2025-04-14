export const UserError = {
  DUPLICATE_USER: {
    code: 'user_duplicate',
    message: "L'adresse email est déjà utilisée.",
  },
  PASSWORD_CHANGE: {
    code: 'password_change',
    message: 'Impossible de changer le mot de passe',
  },
  PASSWORD_TOKEN_EXPIRED: {
    code: 'password_token_expired',
    message: 'Le lien est expiré.',
  },
  PROVIDER_ACTION_FORBIDDEN: {
    code: 'provider_action_forbidden',
    message: 'Cette action n\'est pas disponible pour votre compte.',
  },
} as const;
