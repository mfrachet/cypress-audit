const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS = {
  Chrome: true,
  Canary: true,
};

Cypress.Commands.add("lighthouse", (thresholds, opts, config) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cypress-audit",
      `${Cypress.browser.displayName} is not supported. Skipping...`,
    );
  }

  cy.url().then((url) => {
    const configThresholds = Cypress.config("lighthouse");

    if (!thresholds && !configThresholds) {
      cy.log(
        "cypress-audit",
        "It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :).",
      );
    }

    cy.log("-------- cy.lighthouse --------");
    cy.task("lighthouse", {
      url,
      thresholds: thresholds || configThresholds || defaultThresholds,
      opts,
      config,
    }).then(({ errors, results }) => {
      results.forEach((res) => {
        cy.log(res);
      });
      cy.log("-----------------------------");

      cy.wrap(errors);
    }).then((errors) => {
      if (errors.length > 0) {
        const formatedErrors = `\n\n${errors.join("\n")}`;

        const label = errors.length === 1
          ? `cy.lighthouse - A threshold has been crossed.${formatedErrors}`
          : `cy.lighthouse - Some thresholds have been crossed.${formatedErrors}`;
        throw new Error(
          label,
        );
      }
    });
  });
});
