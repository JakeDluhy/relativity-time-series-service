const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes, mapKeysAndValues } = require('../helpers/lodash');

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
    const filteredData = filterAttributes(
      mapKeysAndValues(agencies, {
        type:        (v, k) => ['agency_type_id', v],
        countryCode: (v, k) => ['country_codes', v.split(',')],
      }),
      ATTRS,
    );

    return knex('agencies')
    .insert(filteredData);
  });
};

module.exports = agencies;
