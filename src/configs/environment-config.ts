import {
  databaseTestConfig,
  databaseDevelopmentConfig,
  databaseProductionConfig,
} from '../../sequelize.config';
import { development, local, production, test } from './constant';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseEnvironmentConfig: SequelizeModuleOptions =
  process.env.NODE_ENV === development
    ? databaseDevelopmentConfig
    : process.env.NODE_ENV === test
      ? databaseTestConfig
      : process.env.NODE_ENV === local
        ? databaseDevelopmentConfig
        : databaseProductionConfig;
