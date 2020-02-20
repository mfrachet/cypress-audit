Cypress.Commands.add("audit", (thresholds, opts, config) => {
  if (Cypress.browser.displayName !== "Chrome") {
    return cy.log("cypress-audit", "Not a chrome browser, skipping for now");
  }

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
    }).then(({ errors, results }) => {
      const resultStr = `\n${results.join("\n")}`;

      cy.log("cypress-audit", resultStr).then(() => {
        if (errors.length > 0) {
          throw new Error(
            `cypress-audit: thresholds crossed.\n\n${errors.join("\n")}`
          );
        }
      });
    });
  });
});
