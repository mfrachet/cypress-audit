/// <reference types="cypress" />

context("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000");
  });

  it("should verify lighthouse scores", () => {
    cy.audit();
  });
});
