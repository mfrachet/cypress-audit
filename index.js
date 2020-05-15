global.port = undefined;

const { pa11y } = require("./src/a11y/task");
const { lighthouse } = require("./src/performances/task");

const prepareAudit = (launchOptions) => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.includes("--remote-debugging-port=")
  );

  if (remoteDebugging) {
    global.port = remoteDebugging.split("=")[1];
  }
};

module.exports = { lighthouse, pa11y, prepareAudit };
