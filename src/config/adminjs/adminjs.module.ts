import { AdminModule } from '@adminjs/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { componentLoader, Components } from './components.js';
import loadPrismaResources from './resources/resources.prisma.js';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaService } from '../database/prisma/prisma.service.js';
import provider from './auth-provider.js';

@Module({})
export class AdminJsModule {
  static init(): DynamicModule {
    AdminJS.registerAdapter({ Database, Resource });
    return {
      module: AdminJsModule,
      imports: [
        AdminModule.createAdminAsync({
          inject: [PrismaService],
          useFactory: async (prismaService: PrismaService) => {
            const resources = loadPrismaResources(prismaService);
            return {
              adminJsOptions: {
                componentLoader,
                rootPath: '/admin',
                resources,
                branding: {
                  logo: '/logo.svg',
                  withMadeWithLove: false,
                },
                dashboard: {
                  component: Components.PageDashboard,
                },
              },
              auth: {
                provider,
                cookiePassword: process.env.COOKIE_SECRET,
                cookieName: 'adminjs',
              },
              sessionOptions: {
                resave: true,
                saveUninitialized: true,
                secret: process.env.COOKIE_SECRET,
              },
            };
          },
        }),
      ],
    };
  }
}
