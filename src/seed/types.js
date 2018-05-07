const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes } = require('../helpers/lodash');

const ATTRS = ['id', 'name', 'changed'];

const agencyTypes = () => {
  console.log('Seeding Agency Types...');

  return launch('/agencytype')
  .then(({ types }) => {
    return knex('agency_types')
    .insert(filterAttributes(types, ATTRS));
  });
};

const eventTypes = () => {
  console.log('Seeding Event Types...');

  return launch('/eventtype')
  .then(({ types }) => {
    return knex('event_types')
    .insert(filterAttributes(types, ATTRS));
  });
};

const missionTypes = () => {
  console.log('Seeding Mission Types...');

  return launch('/missiontype')
  .then(({ types }) => {
    return knex('mission_types')
    .insert(filterAttributes(types, ATTRS));
  });
};

module.exports = () => {
  return agencyTypes()
  .then(eventTypes)
  .then(missionTypes);
};
