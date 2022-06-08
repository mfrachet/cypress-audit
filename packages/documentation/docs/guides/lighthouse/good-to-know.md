# Good to know

## Test with a production bundle

Lighthouse is a tool that is supposed to run against a production bundle for computing the `performance` and `best-practices` metrics. But it's widely suggested by [Cypress to run their test on development environment](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server). While this seems a bit counter intuitive, we can rely on the [Cypress project feature](https://docs.cypress.io/guides/guides/command-line.html#cypress-run-project-lt-project-path-gt) to run some dedicated test suites against production bundles and to have quick feedbacks (or prevent regression) on these metrics.

## Lighthouse scores may be different between local run and cypress-audit

According to https://github.com/mfrachet/cypress-audit/issues/89, it's possible that cypress-audit provides different Lighthouse results comparing to a local run in a browser. **It's important to keep in mind that cypress-audit is just a wrapper around lighthouse.** It does not do anything special except calling the regular [Lighthouse](https://www.npmjs.com/package/lighthouse) module through Cypress commands.

To fix this issue, and to get results closer to Lighthouse runs in the browser, you may want to rely on [Lighthouse defaults](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/constants.js) configurations and pass them to cypress-audit.

For instance @maciejtrzcinski in the previous issue suggests to rely on the following configuration in order to have result closer to the run in the browser:

```js
const customThresholds = {
  performance: 90,
};

const desktopConfig = {
  formFactor: "desktop",
  screenEmulation: {
    width: 1350,
    height: 940,
    deviceScaleRatio: 1,
    mobile: false,
    disable: false,
  },
  throttling: {
    rttMs: 40,
    throughputKbps: 11024,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

cy.lighthouse(customThresholds, desktopConfig);
```

## Session storage

Session storage are supposed to keep data in the current browser tab. Since lighthouse will open a new tab, you won't be able to access the stored data during the audit.

Luckily a community member has created an example on how to make session storage work on https://github.com/olyhaa-aetna/simple-auth-example
