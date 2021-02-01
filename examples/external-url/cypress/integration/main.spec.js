describe("External", () => {
  it("check scores", () => {
    cy.visit("https://google.com/");

    cy.lighthouse({
      accessibility: 90,
      "best-practices": 50,
      seo: 50,
      pwa: 50,
    });
  });
});
