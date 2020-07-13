const lighthouseLib = require("lighthouse");
const { computeCategories, compareWithThresholds } = require("./helpers");

const lighthouse = (callback) => ({ url, thresholds, opts = {}, config }) => {
  if (port) {
    opts.port = port;

    if (!opts.onlyCategories) {
      opts.onlyCategories = Object.keys(thresholds);
    }

    return lighthouseLib(url, { disableStorageReset: true, ...opts }, config)
      .then((results) => {
        if (callback) {
          callback(results);
        }

        console.log("lol", results.lhr.audits);

        return computeCategories(results.lhr.categories);
      })
      .then(compareWithThresholds(thresholds));
  }

  return null;
};

module.exports = { lighthouse };
