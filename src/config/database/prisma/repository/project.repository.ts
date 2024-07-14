import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { ProjectRepository } from '../../../../repository/index.js';
import { ProjectModel } from 'src/model/project.model.js';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}
  async findByKey(key: string): Promise<ProjectModel> {
    const result = await this.prisma.project.findFirst({ where: { key } });
    if (!result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
    };
  }
}
