/// <reference types="cypress" />

context("The App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("audits the home page", () => {
    cy.lighthouse({
      accessibility: 90,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    cy.pa11y();
  });

  it("audits the authenticated page", () => {
    cy.login();

    cy.lighthouse({
      performance: 50,
      "first-contentful-paint": 2000,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    cy.pa11y();
  });
});
