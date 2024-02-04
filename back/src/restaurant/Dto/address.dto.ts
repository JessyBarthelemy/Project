import { IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  city: string;
}
