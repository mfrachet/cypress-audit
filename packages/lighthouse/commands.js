const lighthouseCommandHandler = require("./src/command-handler");

Cypress.Commands.add("lighthouse", lighthouseCommandHandler);
