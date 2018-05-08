const knex = require('../services/knex');
const launch = require('../services/launch-library');
const { mapKeysAndValuesWithFilter } = require('../helpers/lodash');

const OFFSET_AMOUNT = 200;

const ATTRS = [
  'id',
  'name',
  'windowstart',
  'windowend',
  'net',
  'infoURLs',
  'vidURLs',
  'holdreason',
  'failreason',
  'probability',
  'hashtag',
  'changed',
  'launch_status_id',
  'location_id',
  'rocket_id',
];

const launches = () => {
  console.log('Seeding Launches...');

  // Only retrieve past launches
  const enddate = new Date().toJSON().slice(0, 10);

  const allLaunches = [];
  let offset = 0;

  function makeRequest() {
    console.log(`Seeding launches ${offset} - ${offset + OFFSET_AMOUNT}`);

    return launch('/launch', { limit: OFFSET_AMOUNT, offset, enddate })
    .then(({ launches, total }) => {
      const launchObjs = launches.map((l) => ({
        id:               l.id,
        name:             l.name,
        windowstart:      l.windowstart,
        windowend:        l.windowend,
        net:              l.net,
        infoURLs:         l.infoURLs,
        vidURLs:          l.vidURLs,
        holdreason:       l.holdreason,
        failreason:       l.failreason,
        probability:      l.probability,
        hashtag:          l.hashtag,
        changed:          l.changed,
        launch_status_id: l.status,
        location_id:      l.location.id,
        rocket_id:        l.rocket.id,
      }));

      allLaunches.push(...launchObjs);

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
    return knex('launches')
    .insert(allLaunches);
  });
};

module.exports = launches;
