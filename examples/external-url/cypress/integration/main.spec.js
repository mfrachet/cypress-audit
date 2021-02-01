context("External", () => {
  it("check scores", () => {
    cy.visit("https://google.com/");
    cy.lighthouse();
  });
});
