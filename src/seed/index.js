const knex = require('../services/knex');

const types = require('./types');
const locations = require('./locations');
const agencies = require('./agencies');
const padsAndAgencyPads = require('./pads-and-agency-pads');

types()
.then(locations)
.then(agencies)
.then(padsAndAgencyPads)
.then(knex.destroy);
