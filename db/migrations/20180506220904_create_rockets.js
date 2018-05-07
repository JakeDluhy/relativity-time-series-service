const TABLE_NAME = 'rockets';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.string('wikiURL');
    table.specificType('infoURLs', 'text[]');
    table.string('imageURL');
    table.specificType('imageSizes', 'text[]');
    table.dateTime('changed');

    table.integer('rocket_family_id').references('rocket_families.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
