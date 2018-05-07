const knex = require('../services/knex');

const types = require('./types');
const locations = require('./locations');

locations()
.then(knex.destroy);
