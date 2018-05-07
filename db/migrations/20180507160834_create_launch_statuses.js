const TABLE_NAME = 'launch_statuses';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.text('description');
    table.dateTime('changed');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
