const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes } = require('../helpers/lodash');

const ATTRS = ['id', 'name', 'countrycode', 'wikiURL', 'infoURLs', 'changed'];

// Unfortunately it appears the dataset references location_ids that don't exist, so I went in
// and manually found the locations for the data
const ADDITONAL_LOCATIONS = [
  { id: 35, name: 'West Texas, TX', countrycode: 'USA', wikiURL: '', infoURLs: [], changed: '2017-02-21 00:00:00' },
  { id: 36, name: 'West Texas, TX', countrycode: 'USA', wikiURL: '', infoURLs: [], changed: '2017-02-21 00:00:00' },
];

const locations = () => {
  console.log('Seeding Locations...');

  return launch('/location', { limit: 100 })
  .then(({ locations }) => {
    return knex('locations')
    .insert([
      ...filterAttributes(locations, ATTRS),
      ...ADDITONAL_LOCATIONS,
    ]);
  });
};

module.exports = locations;
