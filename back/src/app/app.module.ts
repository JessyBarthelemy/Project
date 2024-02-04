import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from 'src/database/database.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule, RestaurantModule],
})
export class AppModule {}
