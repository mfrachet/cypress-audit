describe("External", () => {
  it("check scores", () => {
    // Google may throw 429 errors if this test runs too often
    // We only care about if lighthouse works on external urls
    cy.visit("https://google.com/", { failOnStatusCode: false });

    cy.lighthouse({
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 20,
    });
  });
});
