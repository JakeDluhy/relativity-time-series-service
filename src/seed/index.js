const knex = require('../services/knex');

const types = require('./types');
const locations = require('./locations');
const agencies = require('./agencies');
const padsAndAgencyPads = require('./pads-and-agency-pads');
const rocketFamilies = require('./rocket-families');

types()
.then(locations)
.then(agencies)
.then(padsAndAgencyPads)
.then(rocketFamilies)
.then(knex.destroy);
