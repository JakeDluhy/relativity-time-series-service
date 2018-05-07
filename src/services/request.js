const req = require('request-promise');

module.exports = (uri, qs = {}, headers = {}) => {
  return req({
    uri,
    qs,
    headers,
    json: true,
  });
}
