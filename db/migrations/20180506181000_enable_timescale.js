exports.up = function({ schema }) {
  return schema.raw('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;');
};

exports.down = function({ schema }) {
  return schema.raw('DROP EXTENSION IF EXISTS timescaledb CASCADE;');
};
