const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");
const { writePa11yReportToFile } = require('./report');

const pa11y = (callback) => ({ url, opts }) => {
  const { report: reportOpts, ...pa11yOpts } = opts;
  return puppeteer
    .connect({
      browserURL: `http://localhost:${global.port}`,
    })
    .then((browser) =>
      pa11yLib(url, { browser, runners: ["axe"], ...pa11yOpts }).then((results) => {

        const a11yauditPassed = (pa11yOpts.errorThreshold || 0) >= results.issues.length;
        const report = { passed: a11yauditPassed, ...results };

        if(reportOpts) {
          writePa11yReportToFile(report, reportOpts);
        }

        if (callback) {
          callback(report);
        }

        return report;
      })
    );
};

module.exports = { pa11y };
