import * as dotenv from 'dotenv';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import {Membership} from "./src/membership/entities/memebership.entity";
dotenv.config();

export const databaseDevelopmentConfig: SequelizeModuleOptions = {
  dialect: 'postgres' as Dialect,
  host: process.env.DATABASE_HOST,
  port: +process.env['DATABASE_PORT'],
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  autoLoadModels: true,
  synchronize: false, // always leave it off to avoid lost of data
  define: {
    timestamps: true,
  },
  models: [],
  logging: true,
};

export const databaseProductionConfig: SequelizeModuleOptions = {
  dialect: 'postgres' as Dialect,
  host: 'localhost',
  port: 5432,
  username: 'roku',
  password: 'roku',
  database: 'prod',
  autoLoadModels: true,
  synchronize: false, // always leave it off to avoid lost of data
  define: {
    timestamps: true,
  },
  models: [],
  logging: false,
};

export const databaseTestConfig: SequelizeModuleOptions = {
  dialect: 'postgres' as Dialect,
  host: 'localhost',
  port: 5432,
  username: 'roku',
  password: 'roku',
  database: 'test',
  synchronize: false, // always leave it of to avoid lost of data
  define: {
    timestamps: true,
  },
  logging: true,
  models: [],
};

export default {
  databaseTestConfig,
  databaseProductionConfig,
  databaseDevelopmentConfig,
};
