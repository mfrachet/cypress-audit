const lighthouseLib = require("lighthouse");
const {
  computeCategories,
  computeAudits,
  compareWithThresholds,
} = require("./helpers");

const lighthouse = (callback) => ({ url, thresholds, opts = {}, config }) => {
  if (global.cypress_audit_port) {
    opts.port = global.cypress_audit_port;

    if (!opts.onlyCategories) {
      opts.onlyCategories = Object.keys(thresholds);
    }

    if (opts.disableStorageReset === undefined) {
      opts.disableStorageReset = true;
    }

    return lighthouseLib(url, opts, config).then((results) => {
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
