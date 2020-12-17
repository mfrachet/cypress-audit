const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");

const pa11y = (callback) => async ({ url, opts }) => {
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${global.port}`,
  });

  const results = await pa11yLib(url, { browser, runners: ["axe"], ...opts });

  if (callback) {
    callback(results);
  }

  return results.issues || [];
};

module.exports = { pa11y };
