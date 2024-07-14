import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';
import { projectResource } from './prisma/project.resource.js';

export default function loadPrismaResource(prismaClient: PrismaClient): ResourceWithOptions[] | any[] {
  return [projectResource(prismaClient)];
}
