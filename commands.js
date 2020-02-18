Cypress.Commands.add("audit", (thresholds, opts, config) => {
  cy.url().then(url => {
    const configThresholds = Cypress.config("lighthouse");

    if (!thresholds && !configThresholds) {
      throw new Error(
        "cypress-audit: It looks like you're missing the threshold config!"
      );
    }

    cy.task("audit", {
      url,
      thresholds: thresholds || configThresholds,
      opts,
      config
    }).then(results => {
      if (results.error) {
        throw new Error(
          `cypress-audit: thresholds crossed.\n\n${results.details.join("\n")}`
        );
      }

      cy.log("cypress-audit", results.details.join(" | "));
    });
  });
});
