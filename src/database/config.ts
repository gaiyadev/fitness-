// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env['DATABASE_HOST'],
    port: 5432,
    username: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE_NAME'],
  },
  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'roku',
    password: 'roku',
    database: 'test',
  },
  production: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'roku',
    password: 'roku',
    database: 'prod',
  },
  local: {
    dialect: 'postgres',
    host: process.env['DATABASE_HOST'],
    port: 5432,
    username: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE_NAME'],
  },
};
