const TABLE_NAME = 'agency_pads';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    // Auto increment, since this is a self created join table
    table.increments('id').primary().unique();

    table.integer('agency_id').references('agencies.id');
    table.integer('pad_id').references('pads.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
