const TABLE_NAME = 'missions';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.text('description');
    table.string('wikiURL');
    table.string('infoURL');
    table.dateTime('changed');

    table.integer('launch_id');
    table.integer('mission_type_id').references('mission_types.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
