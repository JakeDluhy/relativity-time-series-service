const TABLE_NAME = 'payloads';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.text('description');
    table.specificType('country_codes', 'text[]');
    table.string('dimensions');
    table.float('weight');
    table.dateTime('changed');

    table.integer('mission_id').references('missions.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
