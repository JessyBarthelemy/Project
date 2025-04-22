import { Address } from './address';
import { Carte } from './carte';

export interface Restaurant {
  id?: number;
  name: string;
  address: Partial<Address>;
  profilImage?: string | ArrayBuffer | null;
  cartes: Carte[];
}
