export const BaseError = {
  UPDATE_NOT_ALLOWED: {
    code: 'not_allowed',
    message: "Vous n'avez pas accès à cet élément.",
  },
  FILE_FORMAT_NOT_ALLOWED: {
    code: 'extension_not_allowed',
    message: 'Extension de fichier invalide.',
  },
} as const;
