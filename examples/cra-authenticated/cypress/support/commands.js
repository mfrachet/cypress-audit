import "@cypress-audit/lighthouse/commands";
import "@cypress-audit/pa11y/commands";

Cypress.Commands.add("login", () => {
  window.localStorage.setItem("username", "mfrachet");
  cy.visit("/dashboard");
});
