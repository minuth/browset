import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service.js';
import { EnvironmentController } from './environment.controller.js';

@Module({
  providers: [EnvironmentService],
  controllers: [EnvironmentController],
})
export class EnvironmentModule {}
