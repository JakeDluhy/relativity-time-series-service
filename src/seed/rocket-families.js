/**
 * One of the json responses for rocket families is agencies, so we're using that
 * request to populate the table with data for the join table agency_rocket_families
 */
const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes, mapKeysAndValues } = require('../helpers/lodash');

const ROCKET_FAMILY_ATTRS = [
  'id',
  'name',
  'changed',
];

const AGENCY_ROCKET_FAMILY_ATTRS = ['agency_id', 'rocket_family_id'];

const rocketFamilies = () => {
  console.log('Seeding Rocket Families and Rocket Family Agencies...');

  return launch('/rocketfamily', { limit: 200 })
  .then(({ RocketFamilies }) => {
    const agencyRocketFamilies = [];

    const filteredRocketFamilies = filterAttributes(
      mapKeysAndValues(RocketFamilies, {
        agencies: (v, k, obj) => {
          if(!v) return [k, v];

          const agencyRocketFamilyObjs = v.map(({ id }) => ({
            rocket_family_id: obj.id,
            agency_id: id,
          }));

          agencyRocketFamilies.push(...agencyRocketFamilyObjs);

          return [k, v];
        },
      }),
      ROCKET_FAMILY_ATTRS,
    );

    const filteredAgencyRocketFamilies = filterAttributes(
      agencyRocketFamilies,
      AGENCY_ROCKET_FAMILY_ATTRS
    );

    return knex('rocket_families')
    .insert(filteredRocketFamilies)
    .then(() => {
      return knex('agency_rocket_families')
      .insert(filteredAgencyRocketFamilies);
    });
  });
};

module.exports = rocketFamilies;
