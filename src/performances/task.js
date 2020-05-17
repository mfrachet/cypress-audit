const lighthouseLib = require("lighthouse");

const compare = (thresholds) =>
  (newValue) => {
    const errors = [];
    const results = [];

    Object.keys(thresholds).forEach((key) => {
      if (thresholds[key] > newValue[key]) {
        errors.push(
          `${key} record is ${newValue[key]} and is under the ${
            thresholds[key]
          } threshold`,
        );
      } else {
        results.push(
          `${key} record is ${newValue[key]} and threshold was ${
            thresholds[key]
          }`,
        );
      }
    });

    return { errors, results };
  };

const lighthouse = ({ url, thresholds, opts = {}, config }) => {
  if (port) {
    opts.port = port;

    return lighthouseLib(url, { disableStorageReset: true, ...opts }, config)
      .then((results) =>
        Object.keys(results.lhr.categories).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: results.lhr.categories[curr].score * 100,
          }),
          {},
        )
      )
      .then(compare(thresholds));
  }

  return null;
};

module.exports = { lighthouse };
