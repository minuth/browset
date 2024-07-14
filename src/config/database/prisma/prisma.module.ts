import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { PrismaEnvironmentRepository } from './repository/environment.repository.js';
import { RepositoryTokens } from '../../../common/index.js';
import { PrismaProjectRepository } from './repository/project.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaEnvironmentRepository,
    PrismaProjectRepository,
    {
      provide: RepositoryTokens.ENVIRONMENT_REPOSITORY,
      useClass: PrismaEnvironmentRepository,
    },
    {
      provide: RepositoryTokens.PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [PrismaService, RepositoryTokens.ENVIRONMENT_REPOSITORY, RepositoryTokens.PROJECT_REPOSITORY],
})
export class PrismaModule {}
