const _ = require('lodash');

const filterAttributes = (data, attrs) => {
  return _.map(data, (d) => {
    return _.pick(d, attrs);
  });
};

const mapKeysAndValues = (data, keyValueMap) => {
  return data.map((d) => (
    _.fromPairs(
      _.map(d, (value, key) => {
        if(keyValueMap[key]) return keyValueMap[key](value, key, d);
        return [key, value];
      })
    )
  ));
};

const mapKeysAndValuesWithFilter = (data, keyValueMap, attrs) => {
  return _.map((d) => (
    _.pick(
      _.fromPairs(
        _.map(d, (value, key) => {
          if(keyValueMap[key]) return keyValueMap[key](value, key, d);
          return [key, value];
        })
      ),
      attrs,
    )
  ));
}

module.exports = {
  filterAttributes,
  mapKeysAndValues,
  mapKeysAndValuesWithFilter,
};
