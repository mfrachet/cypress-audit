/// <reference types="cypress" />

context("The App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("audits the home page", () => {
    cy.lighthouse({
      accessibility: 100,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    cy.pa11y();
  });

  it("generates an a11y report for the home page", () => {
    cy.pa11y({
      report: {
        path: 'a11y-report/homepage.json'
      },
    });
  });

  it("audits the authenticated page", () => {
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
