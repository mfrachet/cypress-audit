/// <reference types="cypress" />

context("Main page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should verify the score of the main page", () => {
    cy.audit({
      performance: 50,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 50
    });
  });

  it("should verify lighthouse scores", () => {
    cy.login();

    cy.audit({
      performance: 50,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 50
    });
  });
});
