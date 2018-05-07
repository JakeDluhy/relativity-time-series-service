const knex = require('./services/knex');

knex('agency_types')
.whereIn('id', [1,2,3,4,5,6])
.then(console.log)
