import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class RestaurantDto {
  @IsNotEmpty()
  name: string;

  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;

  @IsOptional()
  @IsString()
  profilImage: string;
}
