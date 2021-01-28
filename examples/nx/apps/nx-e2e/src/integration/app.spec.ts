import "cypress-audit/commands";

describe('nx', () => {
  beforeEach(() => cy.visit('/'));

  it("should verify the lighthouse scores with thresholds", function () {
    cy.lighthouse({
      performance: 40,
      accessibility: 40,
      "best-practices": 40,
      seo: 85,
      pwa: 10,
    });
  });
});
