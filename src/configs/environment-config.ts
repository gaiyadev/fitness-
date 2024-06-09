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

export const apiBaseUrl: string =
  process.env.NODE_ENV === development
    ? process.env.WN_BACKEND_DEV_URL
    : process.env.NODE_ENV === test
      ? process.env.WN_BACKEND_DEV_URL
      : process.env.WN_BACKEND_LIVE_URL === production
        ? process.env.WN_BACKEND_LIVE_URL
        : process.env.WN_BACKEND_LOCAL_URL;

export const resetPasswordUrl: string =
  process.env.NODE_ENV === development
    ? 'https://nexit-admin.ogtlprojects.com/reset-password'
    : process.env.NODE_ENV === test
      ? 'https://nexit-admin.ogtlprojects.com/test/reset-password'
      : process.env.WN_BACKEND_LIVE_URL === production
        ? 'https://www.worknation.ng/reset-password'
        : 'http://localhost:3001/reset-password';
