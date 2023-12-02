import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule],
})
export class AppModule {}
