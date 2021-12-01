const { prepareAudit } = require("@cypress-audit/shared");
const { lighthouse } = require("./src/task");

module.exports = { lighthouse, prepareAudit };
