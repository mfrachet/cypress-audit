const prepareAudit = (launchOptions) => {
  const remoteDebugging = launchOptions.args.find((config) =>
    config.startsWith("--remote-debugging-port")
  );

  if (remoteDebugging) {
    global.cypress_audit_port = remoteDebugging.split("=")[1];
  } else {
    console.error(
      `[cypress-audit]: Woops, something went wrong when trying to get the browser port. Are sure you run your tests in a chromium based browser?
		
			npx cypress run --browser=chrome
		`
    );
  }
};

module.exports = { prepareAudit };
