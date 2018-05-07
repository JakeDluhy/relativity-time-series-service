const knexfileConfig = require('../../db/knexfile');

const env = process.env.NODE_ENV || 'development';
const config = knexfileConfig[env];

module.exports = require('knex')(config);
