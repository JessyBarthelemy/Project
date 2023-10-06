import { Module } from '@nestjs/common';
import { UserModule } from '../User/user.module';
import { AuthenticationModule } from '../Authentication/authentication.module';
import { DatabaseModule } from 'src/Database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule],
})
export class AppModule {}
