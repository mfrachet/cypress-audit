describe("The App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("audits the home page", () => {
    cy.lighthouse({
      performance: 50,
      accessibility: 90,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    // TODO: bring back cy.kayle();
  });

  it("audits the authenticated page", () => {
    cy.login();

    cy.lighthouse({
      performance: 50,
      "first-contentful-paint": 3500,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });

    // TODO: bring back cy.kayle();
  });
});
