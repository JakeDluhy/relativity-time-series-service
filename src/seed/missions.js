const _ = require('lodash');

const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { mapKeysAndValuesWithFilter } = require('../helpers/lodash');

const OFFSET_AMOUNT = 200;

const ATTRS = [
  'id',
  'name',
  'description',
  'wikiURL',
  'infoURL',
  'changed',
  'launch_id',
  'mission_type_id',
];

const missions = () => {
  console.log('Seeding Missions...');

  const allMissions = [];
  const allPayloads = [];
  let offset = 0;

  function makeRequest() {
    console.log(`Seeding missions ${offset} - ${offset + OFFSET_AMOUNT}`);

    return launch('/mission', { limit: OFFSET_AMOUNT, offset })
    .then(({ missions, total }) => {
      const missionObjs = missions.map((m) => {
        const payloadObjs = m.payloads.map((p) => ({
          id: p.id,
          name: p.name,
          country_codes: p.countryCodes.split(','),
          description: p.description,
          dimensions: p.dimensions,
          weight: Number(p.weight),
          mission_id: p.missionId,
          changed: p.changed,
        }));

        allPayloads.push(...payloadObjs);

        return {
          id: m.id,
          name: m.name,
          description: m.description,
          wikiURL: m.wikiURL,
          infoURL: m.infoURL,
          changed: m.changed,
          launch_id: m.launch ? m.launch.id : null,
          mission_type_id: m.type > 0 ? m.type : null,
        };
      });

      allMissions.push(...missionObjs);

      offset += OFFSET_AMOUNT;

      if(offset < total) {
        return makeRequest();
      }
    })
    .catch((e) => {
      console.error(e);
    });
  }

  return makeRequest()
  .then(() => {
    return knex('missions')
    .insert(allMissions);
  })
  .then(() => {
    return knex('payloads')
    .insert(allPayloads);
  })
  .catch((e) => {
    console.log(e);
  });
};

module.exports = missions;
