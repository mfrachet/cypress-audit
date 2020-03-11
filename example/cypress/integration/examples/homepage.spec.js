/// <reference types="cypress" />

context("Homepage", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should verify lighthouse scores", () => {
    // No arguments passed,
    //  will assert on 100 score for every metric
    cy.audit();
  });
});
