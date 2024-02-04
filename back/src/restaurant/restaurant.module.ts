import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Address } from './entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Address])],
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
