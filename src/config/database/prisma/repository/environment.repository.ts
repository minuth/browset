import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { EnvironmentRepository } from '../../../../repository/index.js';
import { EnvironmentModel } from '../../../../model/environment.model.js';

@Injectable()
export class PrismaEnvironmentRepository implements EnvironmentRepository {
  constructor(private prisma: PrismaService) {}

  async findByKeyAndDomain(projectKey: string, domain: string): Promise<EnvironmentModel> {
    const result = await this.prisma.environment.findFirst({
      where: { domain, project: { key: projectKey } },
    });
    if (!result) {
      return null;
    }

    const model: EnvironmentModel = {
      id: result.id,
      name: result.name,
      domain: result.domain,
      variables: result.variables as Record<string, string>,
    };

    return model;
  }
}
