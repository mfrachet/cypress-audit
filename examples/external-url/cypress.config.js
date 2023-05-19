const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { kayle } = require("@cypress-audit/kayle");

module.exports = {
  video: false,
  e2e: {
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
