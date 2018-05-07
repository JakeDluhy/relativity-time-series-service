const req = require('./request');
const _ = require('lodash');

const BASE_URL = 'https://launchlibrary.net/1.4';

module.exports = (path, params = {}) => {
  const defaultParams = { mode: 'verbose' };
  const mergedParams = _.merge({}, defaultParams, params);

  return req(`${BASE_URL}${path}`, mergedParams);
}
