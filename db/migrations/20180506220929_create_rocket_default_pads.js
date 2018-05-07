const TABLE_NAME = 'rocket_default_pads';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary().unique();

    table.integer('rocket_id').references('rockets.id');
    table.integer('pad_id').references('pads.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
