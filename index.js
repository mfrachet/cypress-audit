const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const compare = thresholds => newValue => {
  const results = { error: false, details: [] };

  Object.keys(thresholds).forEach(key => {
    if (thresholds[key] > newValue[key]) {
      results.error = true;
    }

    results.details.push(`${key} is ${newValue[key]}/${thresholds[key]}`);
  });

  return results;
};

const audit = ({ url, thresholds, opts = {}, config }) => {
  if (opts.chromeFlags) {
    opts.chromeFlags.push("--headless");
  } else {
    opts.chromeFlags = ["--headless"];
  }

  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;

      return lighthouse(url, opts, config).then(results =>
        chrome
          .kill()
          .then(() => {
            return Object.keys(results.lhr.categories).reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: results.lhr.categories[curr].score * 100
              }),
              {}
            );
          })
          .then(compare(thresholds))
      );
    });
};

module.exports = audit;
