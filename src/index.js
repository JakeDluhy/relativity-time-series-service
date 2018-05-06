const knex = require('./services/knex');

knex('pg_catalog.pg_tables')
.select('tablename')
.where({ schemaname: 'public' })
.then((rows) => {
  console.log(rows);
});
