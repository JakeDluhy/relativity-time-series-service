const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');

const ATTRS = ['id', 'name', 'changed'];

const getMappedTypes = (types) => {
  return _.map(types, (type) => {
    return _.pick(type, ATTRS);
  });
}

const agencyTypes = () => {
  console.log('Seeding Agency Types...');

  return launch('/agencytype')
  .then(({ types }) => {
    return knex('agency_types')
    .insert(getMappedTypes(types));
  });
};

const eventTypes = () => {
  console.log('Seeding Event Types...');

  return launch('/eventtype')
  .then(({ types }) => {
    return knex('event_types')
    .insert(getMappedTypes(types));
  });
};

const missionTypes = () => {
  console.log('Seeding Mission Types...');

  return launch('/missiontype')
  .then(({ types }) => {
    return knex('mission_types')
    .insert(getMappedTypes(types));
  });
};

module.exports = () => {
  return agencyTypes()
  .then(eventTypes)
  .then(missionTypes);
};
