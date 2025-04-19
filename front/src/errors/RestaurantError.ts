import type { ValidationError } from '@/types/ValidationError';

export const RESTAURANT_ERROR = {
  nameRequired: {
    code: 'nameRequired',
    message: 'Veuillez saisir le nom du restaurant'
  } as ValidationError,
  numberRequired: {
    code: 'numberRequired',
    message: "Veuillez saisir le numéro de l'adresse"
  } as ValidationError,
  streetRequired: {
    code: 'streetRequired',
    message: 'Veuillez saisir le rue du restaurant'
  } as ValidationError,
  postalCodeRequired: {
    code: 'postalCodeRequired',
    message: 'Le code postal du restaurant est invalide'
  } as ValidationError,
  cityRequired: {
    code: 'cityRequired',
    message: 'Veuillez saisir la ville du restaurant'
  } as ValidationError
};
