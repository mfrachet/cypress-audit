const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

const groupIssues = (issues) => {
  const groupedIssuesDict = issues.reduce(
    (allIssues, { code, selector, ...rest }) => {
      if (allIssues[code]) {
        allIssues[code].occurrences++;
      } else {
        allIssues[code] = {
          selectors: [],
          issueId: code,
          occurrences: 1,
          ...rest,
        };
      }

      if (selector) {
        allIssues[code].selectors.push(selector);
      }

      return allIssues;
    },
    {}
  );

  const groupedIssues = [];

  for (const group in groupedIssuesDict) {
    if (group) {
      groupedIssues.push(groupedIssuesDict[group]);
    }
  }

  return groupedIssues;
};

const formatIssues = (issues) => {
  return issues
    .map((issue) => {
      const message = issue.message ? `- ${issue.message}` : ``;
      const context = issue.context ? `- Context: ${issue.context}` : ``;
      const selector =
        issue.selectors.length > 0
          ? `- Selector concerned: "${issue.selectors.join(",")}"`
          : ``;
      return `Issue: ${issue.issueId}, # of occurrences: ${issue.occurrences}.
  ${message}
  ${context}
  ${selector}
          `;
    })
    .join(`\n\n`);
};

const pa11yCommandHandler = (opts) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.pa11y()",
      `${Cypress.browser.displayName} is not supported. Skipping...`
    );
  }

  return cy
    .url()
    .then((url) => cy.task("pa11y", { url, opts }))
    .then((issues) => {
      if (issues.length > 0) {
        const groupedIssues = groupIssues(issues);

        const title =
          issues.length === 1
            ? `cy.pa11y - ${issues.length} accessibility violation was found`
            : `cy.pa11y - ${issues.length} accessibility violations were found`;

        const formattedIssues = formatIssues(groupedIssues);

        throw new Error(`${title}\n\n${formattedIssues}`);
      }
    });
};

module.exports = pa11yCommandHandler;
