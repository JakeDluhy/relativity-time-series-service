const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes } = require('../helpers/lodash');

const ATTRS = ['id', 'name', 'description', 'changed'];

const launchStatuses = () => {
  console.log('Seeding Launch Statuses...');

  return launch('/launchstatus')
  .then(({ types }) => {
    return knex('launch_statuses')
    .insert(filterAttributes(types, ATTRS));
  });
};

module.exports = launchStatuses;
