/// <reference types="cypress" />

context("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should verify lighthouse scores", () => {
    // No arguments passed,
    //  will assert on 100 score for every metric
    cy.audit();
  });
});
