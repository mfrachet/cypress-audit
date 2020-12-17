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
      performance: 100,
      "first-contentful-paint": 100,
      accessibility: 100,
      "best-practices": 100,
      seo: 100,
      pwa: 100,
    });

    cy.pa11y();
  });
});
