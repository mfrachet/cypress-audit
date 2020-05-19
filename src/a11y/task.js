const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");

const pa11y = (callback) => ({ url, opts }) => {
  return puppeteer
    .connect({
      browserURL: `http://localhost:${global.port}`,
    })
    .then((browser) =>
      pa11yLib(url, { browser, runners: ["axe"], ...opts }).then((results) => {
        if (callback) {
          callback(results);
        }

        return results.issues || [];
      })
    );
};

module.exports = { pa11y };
