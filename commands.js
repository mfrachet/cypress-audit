const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
  pwa: 100
};

Cypress.Commands.add("audit", (thresholds, opts, config) => {
  if (Cypress.browser.displayName !== "Chrome") {
    return cy.log("cypress-audit", "Not a chrome browser, skipping for now");
  }

  cy.url().then(url => {
    const configThresholds = Cypress.config("lighthouse");

    if (!thresholds && !configThresholds) {
      cy.log(
        "cypress-audit",
        "It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :)."
      );
    }

    cy.task("audit", {
      url,
      thresholds: thresholds || configThresholds || defaultThresholds,
      opts,
      config
    }).then(errors => {
      if (errors.length > 0) {
        throw new Error(
          `cypress-audit: thresholds crossed.\n\n${errors.join("\n")}`
        );
      }

      cy.log("cypress-audit", "Everything is good");
    });
  });
});
