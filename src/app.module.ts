import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module.js';
import { AdminJsModule } from './config/adminjs/adminjs.module.js';
import { ApiModule } from './api/api.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    AdminJsModule.init(),
    ApiModule,
  ],
})
export class AppModule {}
