const lighthouseLib = require("lighthouse");
const {
  computeCategories,
  computeAudits,
  compareWithThresholds,
} = require("./helpers");

const lighthouse = (callback) => ({ url, thresholds, opts = {}, config }) => {
  if (port) {
    opts.port = port;

    if (!opts.onlyCategories) {
      opts.onlyCategories = Object.keys(thresholds);
    }

    return lighthouseLib(
      url,
      { disableStorageReset: true, ...opts },
      config
    ).then((results) => {
      if (callback) {
        callback(results);
      }

      const computedAudits = computeAudits(results.lhr.audits);
      const computedCategories = computeCategories(results.lhr.categories);

      const allMetrics = { ...computedAudits, ...computedCategories };

      return compareWithThresholds(allMetrics, thresholds);
    });
  }

  return null;
};

module.exports = { lighthouse };
