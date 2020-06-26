const fs = require('fs');
const path = require('path');

/**
 * Computes a default path for pa11y reports from the audited page URL.
 * Removes the protocol and replaces all occurences of `/` and `:` with `-`.
 * 
 * @param {string} pageUrl the url to normalize
 * @returns {string} the normalized url
 */
const computeDefaultReportPath = (pageUrl = '') => (
    `a11y-report/${pageUrl
        // remove protocol
        .replace(/http(s)?:\/\//, '')
        // replace / and : with -
        .replace(/(\/|:)/g, '-')
        // remove final - if url had trailing slash
        .replace(/-$/, '')}.json`
);

/**
 * Writes a pa11y report to <report.basePath>/<report.fileName>
 * If <report.fileName> is not defined, it will generate one by normalizing the report
 * page URL.
 * 
 * @param {*} report the pa11y report
 * @param {{ path: string }} opts 
 */
const writePa11yReportToFile = (report, opts) => {
    const { reportPath = computeDefaultReportPath(report.pageUrl) } = opts;
    const absoluteReportPath = path.resolve(process.cwd(), reportPath);
    const reportDir = path.dirname(absoluteReportPath);
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(absoluteReportPath, JSON.stringify(report));
};

module.exports = { writePa11yReportToFile };
