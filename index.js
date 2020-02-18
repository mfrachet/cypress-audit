const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const compare = thresholds => newValue => {
  const errors = [];

  Object.keys(thresholds).forEach(key => {
    if (thresholds[key] > newValue[key]) {
      errors.push(
        `${key}: ${newValue[key]} is under ${thresholds[key]} threshold`
      );
    }
  });

  return errors;
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
