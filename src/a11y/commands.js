const ERROR_NUMBER_THRESHOLD = 0;

const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};

const groupIssues = (issues) => {
  const groupedIssuesDict = issues.reduce(
    (allIssues, { code, message, runnerExtras }) => {
      if (allIssues[code]) {
        allIssues[code].occurrences++;
      } else {
        allIssues[code] = {
          issueId: code,
          occurrences: 1,
          message,
          description: runnerExtras.description,
          link: runnerExtras.helpUrl,
        };
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
    .map(
      (issue) =>
        `Issue: ${issue.issueId}, # of occurrences: ${issue.occurrences}.\n- ${issue.description}\n- ${issue.link}`
    )
    .join(`\n\n`);
};

Cypress.Commands.add("pa11y", (opts) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.pa11y()",
      `${Cypress.browser.displayName} is not supported. Skipping...`
    );
  }

  cy.url()
    .then((url) => cy.task("pa11y", { url, opts }))
    .then((results) => {
      const { issues = [] } = results;
      const groupedIssues = groupIssues(issues);

      const title =
        issues.length === 1
          ? `cy.pa11y - ${issues.length} accessibility violation was found`
          : `cy.pa11y - ${issues.length} accessibility violations were found`;
      
      const formattedIssues = formatIssues(groupedIssues);

      throw new Error(`${title}\n\n${formattedIssues}`);
    });
});
