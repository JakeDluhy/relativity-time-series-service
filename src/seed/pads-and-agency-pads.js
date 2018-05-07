/**
 * One of the json responses for pads is agencies, so we're using that request to populate the table
 * with data for the join table agency-pads
 */
const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { getMappedTypes } = require('../helpers/lodash');

const PAD_ATTRS = [
  'id',
  'name',
  'padType',
  'latitude',
  'longitude',
  'mapURL',
  'retired',
  'wikiURL',
  'infoURLs',
  'changed',
  'location_id',
];

const AGENCY_PAD_ATTRS = ['agency_id', 'pad_id'];

const pads = () => {
  console.log('Seeding Pads and Agency Pads...');

  return launch('/pad', { limit: 250 })
  .then(({ pads }) => {
    const agencyPads = [];

    const filteredPads = getMappedTypes(
      pads.map((pad) => {
        return _.mapKeys(pad, (value, key) => {
          if(key === 'locationid') return 'location_id'
          if(key === 'agencies' && Array.isArray(value)) {
            const agencyPadObjs = value.map(({ id }) => ({
              pad_id: pad.id,
              agency_id: id,
            }));

            agencyPads.push(...agencyPadObjs);
          }
          return key;
        });
      }),
      PAD_ATTRS,
    );

    const filteredAgencyPads = getMappedTypes(agencyPads, AGENCY_PAD_ATTRS);

    return knex('pads')
    .insert(filteredPads)
    .then(() => {
      knex('agency_pads')
      .insert(filteredAgencyPads);
    });
  });
};

module.exports = pads;
