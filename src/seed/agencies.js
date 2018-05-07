const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { getMappedTypes } = require('../helpers/lodash');

const ATTRS = [
  'id',
  'name',
  'abbrev',
  'country_codes',
  'wikiURL',
  'infoURLs',
  'islsp',
  'changed',
  'agency_type_id',
];

const agencies = () => {
  console.log('Seeding Agencies...');

  return launch('/agency', { limit: 300 })
  .then(({ agencies }) => {
    const filteredData = getMappedTypes(
      agencies.map((agency) => {
        return _.fromPairs(_.map(agency, (value, key) => {
          if(key === 'type') return ['agency_type_id', value];
          if(key === 'countryCode') {
            return ['country_codes', value.split(',')];
          }

          return [key, value];
        }));
      }),
      ATTRS,
    );

    return knex('agencies')
    .insert(filteredData);
  });
};

module.exports = agencies;
