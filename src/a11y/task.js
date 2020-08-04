const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");
const { writePa11yReportToFile } = require('./report');

const pa11y = (callback) => ({ url, opts = {} }) => {
  const { report: reportOpts, ...pa11yOpts } = opts;
  return puppeteer
    .connect({
      browserURL: `http://localhost:${global.port}`,
    })
    .then((browser) =>
      pa11yLib(url, { browser, runners: ["axe"], ...pa11yOpts }).then((results) => {
        if(reportOpts) {
          writePa11yReportToFile(results, reportOpts);
        }

        if (callback) {
          callback(results);
        }

        return results;
      })
    );
};

module.exports = { pa11y };
