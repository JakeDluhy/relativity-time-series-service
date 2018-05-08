const TABLE_NAME = 'launches';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id');
    table.string('name');
    table.dateTime('windowstart').notNullable();
    table.dateTime('windowend');
    table.dateTime('net');
    table.specificType('infoURLs', 'text[]');
    table.specificType('vidURLs', 'text[]');
    table.text('holdreason');
    table.text('failreason');
    table.integer('probability');
    table.string('hashtag');
    table.dateTime('changed');

    table.integer('launch_status_id').references('launch_statuses.id');
    table.integer('location_id').references('locations.id');
    table.integer('rocket_id').references('rockets.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
