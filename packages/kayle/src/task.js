const kayleLib = require("kayle");
const puppeteer = require("puppeteer");

const kayle =
  (callback) =>
  async ({ url, opts }) => {
    const browser = await puppeteer.connect({
      browserURL: `http://localhost:${global.cypress_audit_port}`,
    });

    const results = await kayleLib({ browser, runners: ["axe"], ...opts, origin: url, page: opts.page || await browser.newPage() });

    if (callback) {
      callback(results);
    }

    return results.issues || [];
  };

module.exports = { kayle };
