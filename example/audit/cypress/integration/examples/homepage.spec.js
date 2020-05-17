/// <reference types="cypress" />

context("Main page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should verify the score of the main page", () => {
    cy.lighthouse({
      performance: 100,
      accessibility: 100,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    cy.pa11y();
  });

  it("should verify lighthouse scores", () => {
    cy.login();

    cy.lighthouse({
      performance: 50,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    cy.pa11y();
  });
});
