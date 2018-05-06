const path = require('path');
const dotenv = require('dotenv');

const postgresEnvfile = path.join(__dirname, '..', 'config', 'postgres.env');

require('dotenv').config({ path: postgresEnvfile });

const development = staging = production = {
  client: 'pg',
  connection: {
    database: process.env.POSTGRES_DB,
    user:     process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
};

module.exports = { development, staging, production };
