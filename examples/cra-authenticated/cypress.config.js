const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { kayle } = require("@cypress-audit/kayle");

module.exports = {
  lighthouse: {
    options: {
      formFactor: "desktop",
      screenEmulation: {
        width: 500,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
        kayle: kayle(console.log.bind(console)),
      });
    },
  },
};
