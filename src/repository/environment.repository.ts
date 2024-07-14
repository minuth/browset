import { EnvironmentModel } from '../model/index.js';

export interface EnvironmentRepository {
  findByKeyAndDomain(projectKey: string, domain: string): Promise<EnvironmentModel>;
}
