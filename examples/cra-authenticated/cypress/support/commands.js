import "@cypress-audit/lighthouse/commands";
import "@cypress-audit/kayle/commands";

Cypress.Commands.add("login", () => {
  window.localStorage.setItem("username", "mfrachet");
  cy.visit("/dashboard");
});
