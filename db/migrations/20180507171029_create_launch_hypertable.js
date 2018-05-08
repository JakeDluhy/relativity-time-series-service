exports.up = function({ schema }) {
  return schema.raw(`SELECT create_hypertable('launches', 'windowstart')`);
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
