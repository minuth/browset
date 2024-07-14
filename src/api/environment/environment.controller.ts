import { Controller, Get, Param, Req } from '@nestjs/common';
import { EnvironmentService } from './environment.service.js';
import { Request } from 'express';

@Controller()
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get('variables/:key')
  async getVariables(@Req() request: Request, @Param('key') key: string) {
    const header = request.headers;
    const { origin } = header;

    return this.environmentService.getEnvironmentVariables({
      key,
      domain: origin,
    });
  }
}
