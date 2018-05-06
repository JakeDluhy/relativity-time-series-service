const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'db',
    database: process.env.POSTGRES_DB,
    user:     process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
});

module.exports = knex;
