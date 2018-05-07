/**
 * One of the json responses for pads is agencies, so we're using that request to populate the table
 * with data for the join table agency-pads
 */
const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes, mapKeysAndValues } = require('../helpers/lodash');

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

    const filteredPads = filterAttributes(
      mapKeysAndValues(pads, {
        locationid: (v, k) => ['location_id', v],
        agencies:   (v, k, obj) => {
          if(!v) return [k, v];

          const agencyPadObjs = v.map(({ id }) => ({
            pad_id: obj.id,
            agency_id: id,
          }));

          agencyPads.push(...agencyPadObjs);

          return [k, v];
        },
      }),
      PAD_ATTRS,
    );

    const filteredAgencyPads = filterAttributes(agencyPads, AGENCY_PAD_ATTRS);

    return knex('pads')
    .insert(filteredPads)
    .then(() => {
      return knex('agency_pads')
      .insert(filteredAgencyPads);
    });
  });
};

module.exports = pads;
