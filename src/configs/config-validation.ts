import * as Joi from 'joi';
import { development, local, production, test } from './constant';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(development, production, test, local)
    .default(local)
    .required(),
  PORT: Joi.number().port().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_DRIVER: Joi.string()
    .valid('postgres')
    .default('postgres')
    .required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().optional(),
  APP_NAME: Joi.string().required(),
  MAIL_TRAP_PORT: Joi.number().default(2525).optional(),
  MAIL_TRAP_USERNAME: Joi.string().optional(),
  MAIL_TRAP_PASSWORD: Joi.string().optional(),
}).unknown(true);
