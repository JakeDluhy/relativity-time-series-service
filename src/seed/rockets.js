/**
 * One of the json responses for rockets is defaultPads, so we're using that
 * request to populate the table with data for the join table rocket_default_pads
 */
const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { filterAttributes, mapKeysAndValues } = require('../helpers/lodash');

const ROCKET_ATTRS = [
  'id',
  'name',
  'wikiURL',
  'infoURLs',
  'imageURL',
  'imageSizes',
  'changed',
  'rocket_family_id',
];

const ROCKET_DEFAULT_PAD_ATTRS = ['rocket_id', 'pad_id'];

const rockets = () => {
  console.log('Seeding Rockets and Rocket Default Pads...');

  return knex('pads')
  .select('id')
  .then((pads) => {
    const padIds = _.map(pads, 'id');

    return launch('/rocket', { limit: 250 })
    .then(({ rockets }) => {
      const rocketDefaultPads = [];

      const filteredRockets = filterAttributes(
        mapKeysAndValues(rockets, {
          family:      (v, k) => ['rocket_family_id', v.id],
          defaultPads: (v, k, obj) => {
            if(!v) return [k, v];

            const rocketDefaultPadObjs = v.split(',')
            .map((id) => Number(id))
            .filter((id) => padIds.includes(id)) // Had some problems where there are bad default pad ids
            .map((id) => ({
              rocket_id: obj.id,
              pad_id:    id,
            }));

            rocketDefaultPads.push(...rocketDefaultPadObjs);

            return [k, v];
          },
        }),
        ROCKET_ATTRS,
      );

      const filteredRocketDefaultPads = filterAttributes(
        rocketDefaultPads,
        ROCKET_DEFAULT_PAD_ATTRS,
      );

      return knex('rockets')
      .insert(filteredRockets)
      .then(() => {
        return knex('rocket_default_pads')
        .insert(filteredRocketDefaultPads);
      })
      .catch((e) => {
        console.log(e);
      })
    });
  });
};

module.exports = rockets;
