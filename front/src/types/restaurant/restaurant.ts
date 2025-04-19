import { Address } from './address';

export interface Restaurant {
  id?: number;
  name: string;
  address: Partial<Address>;
  profilImage?: string | ArrayBuffer | null;
}
