import { Inject, Injectable } from '@nestjs/common';
import { RepositoryTokens } from '../../common/index.js';
import { EnvironmentRepository, ProjectRepository } from '../../repository/index.js';
import { GetEnvironmentVariablesParam } from './environment.dto.js';

@Injectable()
export class EnvironmentService {
  constructor(
    @Inject(RepositoryTokens.PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
    @Inject(RepositoryTokens.ENVIRONMENT_REPOSITORY)
    private environmentRepository: EnvironmentRepository
  ) {}

  async getEnvironmentVariables(param: GetEnvironmentVariablesParam) {
    const { key, domain } = param;
    const project = await this.projectRepository.findByKey(key);
    if (!project) {
      throw new Error('Invalid Key!');
    }

    const environment = await this.environmentRepository.findByKeyAndDomain(key, domain);
    if (!environment) {
      throw new Error('Cannot find environment variables for the accessing domain!');
    }
    return environment.variables;
  }
}
