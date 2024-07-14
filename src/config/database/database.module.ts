import { Global, Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module.js';

@Global()
@Module({
  imports: [PrismaModule],
})
export class DatabaseModule {}
