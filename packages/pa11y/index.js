const { prepareAudit } = require("@cypress-audit/shared");
const { pa11y } = require("./src/task");

module.exports = { pa11y, prepareAudit };
