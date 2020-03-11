const lighthouse = require("lighthouse");

let port;

const compare = thresholds => newValue => {
  const errors = [];
  const results = [];

  Object.keys(thresholds).forEach(key => {
    if (thresholds[key] > newValue[key]) {
      errors.push(
        `${key}: ${newValue[key]} is under ${thresholds[key]} threshold`
      );
    } else {
      results.push(
        `${key}: ${newValue[key]} is >= ${thresholds[key]} threshold`
      );
    }
  });

  return { errors, results };
};

const audit = ({ url, thresholds, opts = {}, config }) => {
  if (port) {
    opts.port = port;

    return lighthouse(url, { disableStorageReset: true, ...opts }, config)
      .then(results =>
        Object.keys(results.lhr.categories).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: results.lhr.categories[curr].score * 100
          }),
          {}
        )
      )
      .then(compare(thresholds));
  }

  return null;
};

const prepareAudit = launchOptions => {
  const remoteDebugging = launchOptions.args.find(config =>
    config.includes("--remote-debugging-port=")
  );

  if (remoteDebugging) {
    port = remoteDebugging.split("=")[1];
  }
};

module.exports = { audit, prepareAudit };
