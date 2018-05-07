const TABLE_NAME = 'pads';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.integer('padType');
    table.string('latitude');
    table.string('longitude');
    table.string('mapURL');
    table.integer('retired');
    table.string('wikiURL');
    table.specificType('infoURLs', 'text[]');
    table.dateTime('changed');

    table.integer('location_id').references('locations.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
