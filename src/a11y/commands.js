const ERROR_NUMBER_THRESHOLD = 0;

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
  cy.url()
    .then((url) => cy.task("pa11y", { url, opts }))
    .then((issues) => {
      if (issues.length > ERROR_NUMBER_THRESHOLD) {
        const groupedIssues = groupIssues(issues);

        const title =
          issues.length === 1
            ? `${issues.length} accessibility violation was found`
            : `${issues.length} accessibility violations were found`;

        const formattedIssues = formatIssues(groupedIssues);

        throw new Error(`${title}\n\n${formattedIssues}`);
      }
    });
});
