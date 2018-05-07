const _ = require('lodash');

const getMappedTypes = (types, attrs) => {
  return _.map(types, (type) => {
    return _.pick(type, attrs);
  });
}

module.exports = {
  getMappedTypes,
};
