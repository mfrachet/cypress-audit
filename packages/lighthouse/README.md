# cy.lighthouse()

- [Installation](#installation)
  - [Installing the dependency](#installing-the-dependency)
  - [Preparing the server configuration](#preparing-the-server-configuration)
  - [Making Cypress aware of the commands](#making-cypress-aware-of-the-commands)
- [API](#api)
  - [Thresholds per tests](#thresholds-per-tests)
  - [Globally set thresholds](#globally-set-thresholds)
  - [Passing options and config to Lighthouse directly](#passing-options-and-config-to-lighthouse-directly)
  - [Available metrics](#available-metrics)
  - [Accessing the raw reports](#accessing-the-raw-reports)
- [Good to know](#good-to-know)
  - [Test with a production bundle](#test-with-a-production-bundle)
  - [Lighthouse scores may be different between local run and cypress-audit](#lighthouse-scores-may-be-different-between-local-run-and-cypress-audit)
  - [Session storage](#session-storage)

## Installation

In order to make the `cy.lighthouse()` command available in your project, **there are 3 steps to follow:**

### Installing the dependency

In your favorite terminal:

```sh
$ yarn add -D @cypress-audit/lighthouse
# or
$ npm install --save-dev @cypress-audit/lighthouse
```

### Preparing the server configuration

By default, if you try to run Lighthouse from the command line (or from Nodejs), you will see that it opens a new web browser window by default. As you may also know, Cypress also opens a dedicated browser to run its tests.

The following configuration allows Lighthouse and Cypress to make their verifications inside **the same browser (controlled by Cypress) instead of creating a new one**.

In the `cypress/plugins/index.js` file, make sure to have:

```javascript
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(), // calling the function is important
  });
};
```

### Making Cypress aware of the commands

When adding the following line in the `cypress/support/commands.js` file, you will be able to use `cy.lighthouse` inside your Cypress tests:

```javascript
import "@cypress-audit/lighthouse/commands";
```

You can then call `cy.lighthouse()` in your Cypress tests.

![A Lighthouse record showing some test failing on best-practices and performances](./docs/lh.png)

## API

### Thresholds per tests

If you don't provide any argument to the `cy.lighthouse` command, the test will fail if at least one of your metrics is under `100`.

You can make assumptions on the different metrics by passing an object as argument to the `cy.lighthouse` command:

```javascript
it("should verify the lighthouse scores with thresholds", function () {
  cy.lighthouse({
    performance: 85,
    accessibility: 100,
    "best-practices": 85,
    seo: 85,
    pwa: 100,
  });
});
```

If the Lighthouse analysis returns scores that are under the one set in arguments, the test will fail.

You can also make assumptions only on certain metrics. For example, the following test will **only** verify the "correctness" of the `performance` metric:

```javascript
it("should verify the lighthouse scores ONLY for performance and first contentful paint", function () {
  cy.lighthouse({
    performance: 85,
    "first-contentful-paint": 2000,
  });
});
```

This test will fail only when the `performance` metric provided by Lighthouse will be under `85`.

### Globally set thresholds

While I would recommend to make per-test assumptions, it's possible to define general metrics inside the `cypress.json` file as following:

```json
{
  "lighthouse": {
    "performance": 85,
    "accessibility": 50,
    "best-practices": 85,
    "seo": 85,
    "pwa": 50
  }
}
```

_Note: These metrics are override by the per-tests one._

### Passing options and config to Lighthouse directly

You can also pass any argument directly to the Lighthouse module using the second and third options of the command:

```js
const thresholds = {
  /* ... */
};

const lighthouseOptions = {
  /* ... your lighthouse options */
};

const lighthouseConfig = {
  /* ... your lighthouse configs */
};

cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig);
```

### Available metrics

With Lighthouse 6, we're now able to make assumptions on **categories** and **audits**.

The categories are what we're used to with Lighthouse and provided a score between 0 and 100:

- performance
- accessibility
- best-practices
- seo
- pwa

The audits are things like the first meaningful paint and the score is provided in milliseconds:

- first-contentful-paint
- largest-contentful-paint
- first-meaningful-paint
- load-fast-enough-for-pwa
- speed-index
- estimated-input-latency
- max-potential-fid
- server-response-time
- first-cpu-idle
- interactive
- mainthread-work-breakdown
- bootup-time
- network-rtt
- network-server-latency
- metrics
- uses-long-cache-ttl
- total-byte-weight
- dom-size

### Accessing the raw reports

When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a `callback` function to the task initializer. Then, when an audit is run, this callback will we executed with the raw data of the underlying tool.

In the `cypress/plugins/index.js` file:

```javascript
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport); // raw lighthouse reports
    }),
  });
};
```

## Good to know

### Test with a production bundle

Lighthouse is a tool that is supposed to run against a production bundle for computing the `performance` and `best-practices` metrics. But it's widely suggested by [Cypress to run their test on development environment](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server). While this seems a bit counter intuitive, we can rely on the [Cypress project feature](https://docs.cypress.io/guides/guides/command-line.html#cypress-run-project-lt-project-path-gt) to run some dedicated test suites against production bundles and to have quick feedbacks (or prevent regression) on these metrics.

### Lighthouse scores may be different between local run and cypress-audit

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

### Session storage

Session storage are supposed to keep data in the current browser tab. Since lighthouse will open a new tab, you won't be able to access the stored data during the audit.

Hopefully, a community member has created an example on how to make session storage work on https://github.com/olyhaa-aetna/simple-auth-example
