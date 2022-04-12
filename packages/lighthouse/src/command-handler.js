const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

const lighthouseCommandHandler = (thresholds, opts, config) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.lighthouse()",
      `${Cypress.browser.displayName} is not supported. Skipping...`
    );
  }

  return cy.url().then((url) => {
    // Handling the default value in cypress.json for "thresholds", "config" and "options"
    const lighthouseConfig = Cypress.config("lighthouse");

    const configThresholds = lighthouseConfig
      ? lighthouseConfig.thresholds
      : undefined;

    const globalOptions = lighthouseConfig
      ? lighthouseConfig.options
      : undefined;

    const globalConfig = lighthouseConfig ? lighthouseConfig.config : undefined;

    if (!thresholds && !configThresholds) {
      cy.log(
        "cypress-audit",
        "It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :)."
      );
    }

    cy.log("-------- cy.lighthouse --------");
    return cy
      .task("lighthouse", {
        url,
        thresholds: thresholds || configThresholds || defaultThresholds,
        opts: opts || globalOptions,
        config: config || globalConfig,
      })
      .then((lighthouseResult) => {
        if (!lighthouseResult) {
          throw new Error(
            "For an unexpected reason, lighthouse did not manage to run correctly. It might be related to lighthouse itself."
          );
        }

        const { errors, results } = lighthouseResult;
        results.forEach((res) => {
          cy.log(res);
        });
        cy.log("-----------------------------");

        return cy.wrap(errors);
      })
      .then((errors) => {
        if (errors.length > 0) {
          const formatedErrors = `\n\n${errors.join("\n")}`;

          const label =
            errors.length === 1
              ? `cy.lighthouse - A threshold has been crossed.${formatedErrors}`
              : `cy.lighthouse - Some thresholds have been crossed.${formatedErrors}`;
          throw new Error(label);
        }
      });
  });
};

module.exports = lighthouseCommandHandler;
