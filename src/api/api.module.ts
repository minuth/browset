import { Module } from '@nestjs/common';

import { EnvironmentModule } from './environment/environment.module.js';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { HttpExceptionHandler } from '../common/exception/exception-handler.js';

@Module({
  imports: [
    EnvironmentModule,
    RouterModule.register([
      {
        path: 'api/v1/environments',
        module: EnvironmentModule,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class ApiModule {}
