const TABLE_NAME = 'locations';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.string('countrycode');
    table.string('wikiURL');
    table.specificType('infoURLs', 'text[]');
    table.dateTime('changed');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
