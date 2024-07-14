import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { flat, ResourceWithOptions } from 'adminjs';
import { nanoid } from 'nanoid';
import { Components } from '../../components.js';

export const projectResource = (prismaClient: PrismaClient): ResourceWithOptions => {
  const beforeNew = (request, ctx) => {
    request.payload.key = nanoid();
    return request;
  };

  const afterNew = async (response, req, ctx) => {
    const params = flat.get(req.payload);
    const { record } = response;
    const projectId = record.id;
    const environments = (params.environments ?? []) as {
      name: string;
      domain: string;
      variables?: Record<string, string>;
    }[];
    if (environments.length) {
      for (const environment of environments) {
        await prismaClient.environment.create({
          data: {
            projectId,
            name: environment.name,
            domain: environment.domain,
            variables: environment.variables,
          },
        });
      }
    }

    return response;
  };

  const afterShow = (response) => {
    return addEnvironmentsToResponse(response);
  };

  const afterEdit = async (response, request, ctx) => {
    if (request.method == 'post') {
      const payload = request.payload;
      const projectId = Number(payload.id);
      const existingEnvironments = await prismaClient.environment.findMany({ where: { projectId } });
      const environments = (flat.get(payload, 'environments') ?? []) as {
        id: number;
        name: string;
        domain: string;
        variables: Record<string, string>;
      }[];
      if (environments?.length) {
        for (const env of environments) {
          await prismaClient.environment.upsert({
            where: { id: Number(env.id ?? '0') },
            create: {
              projectId,
              name: env.name,
              domain: env.domain,
              variables: env.variables,
            },
            update: {
              name: env.name,
              domain: env.domain,
              variables: env.variables,
            },
          });
        }
      }
      const deletedEnvironments = existingEnvironments.filter((env) => !environments.some(({ id }) => id == env.id));
      if (deletedEnvironments.length) {
        await prismaClient.environment.deleteMany({ where: { id: { in: deletedEnvironments.map(({ id }) => id) } } });
      }

      return response;
    } else {
      return addEnvironmentsToResponse(response);
    }
  };

  const addEnvironmentsToResponse = async (response) => {
    const { record } = response;
    const environments = await prismaClient.environment.findMany({
      where: {
        projectId: record.params.id,
      },
    });

    response.record.params = flat.flatten({ ...record.params, environments });
    return response;
  };

  return {
    resource: { model: getModelByName('Project'), client: prismaClient },
    options: {
      navigation: {
        icon: 'Folder',
      },
      properties: {
        id: {
          isVisible: false,
        },
        key: {
          isVisible: {
            edit: false,
            list: true,
            show: true,
          },
          components: {
            show: Components.ButtonCopy,
          },
        },
        environments: {
          type: 'mixed',
          isArray: true,
          isVisible: {
            list: false,
            show: true,
            edit: true,
          },
        },
        'environments.name': {
          type: 'string',
        },
        'environments.domain': {
          type: 'string',
        },
        'environments.variables': {
          type: 'key-value',
          components: {
            show: Components.EnvironmentVariableList,
          },
        },
      },
      actions: {
        new: {
          before: [beforeNew],
          after: [afterNew],
        },
        show: {
          layout: [['name'], ['key'], ['environments']],
          after: [afterShow],
        },
        edit: {
          after: [afterEdit],
        },
      },
      translations: {
        en: {
          actions: {
            show: 'Detail',
          },
          properties: {
            'environments.name': 'Name',
            'environments.domain': 'Domain',
            'environments.addNewItem': 'Add new environment',
            'environments.variables': 'Environment Variables',
          },
        },
      },
    },
  };
};
