const TABLE_NAME = 'agencies';

exports.up = function({ schema }) {
  return schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary().unique();
    table.string('name');
    table.string('abbrev');
    table.specificType('country_codes', 'text[]');
    table.string('wikiURL');
    table.specificType('infoURLs', 'text[]');
    table.integer('islsp');
    table.dateTime('changed');

    table.integer('agency_type_id').references('agency_types.id');
  });
};

exports.down = function({ schema }) {
  return schema.dropTable(TABLE_NAME);
};
