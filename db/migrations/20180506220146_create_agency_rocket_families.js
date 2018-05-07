const TABLE_NAME = 'agency_rocket_families';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary().unique();

    table.integer('agency_id').references('agencies.id');
    table.integer('rocket_family_id').references('rocket_families.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
