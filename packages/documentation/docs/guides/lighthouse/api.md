# API

## Thresholds per tests

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

## Globally set thresholds

While I would recommend to make per-test assumptions, it's possible to define general metrics inside the `cypress.json` file as following:

```json
{
  "lighthouse": {
    "thresholds": {
      "performance": 85,
      "accessibility": 50,
      "best-practices": 85,
      "seo": 85,
      "pwa": 50
    }
  }
}
```

_Note: These metrics are override by the per-tests one._

## Globally set options and configs

You can set default `lighthouseOptions` and `lighthouseConfig` to your `cypress.json` file using:

```json
{
  "lighthouse": {
    "options": {
      /* put your options here, like formFactor by default */
    },
    "config": {
      /* put your config here */
    }
  }
}
```

These values can be override at the test level.

## Passing options and config to `cy.lighthouse` directly

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

## Available metrics

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

## Accessing the raw reports

When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a `callback` function to the task initializer. Then, when an audit is run, this callback will be executed with the raw data of the underlying tool.

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

## Generating HTML reports

In order to have lighthouse's HTML reports available in your filesystem, you'll need to first specify `html` as the ouput for your lighthouseConfig.

```js
const thresholds = {
  /* ... */
};

const lighthouseOptions = {
  /* ... your lighthouse options */
};

const lighthouseConfig = {
  output: "html", //If output is not specified, then the json report will be generated
  /* ... your lighthouse configs */
};

cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig);
```

Secondly, whilst reading the raw report use `fs` to write the HTML report to disk.

```javascript
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require("fs");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log("---- Writing lighthouse report to disk ----");

      fs.writeFile("lighthouse.html", lighthouseReport.report, (error: any) => {
        error ? console.log(error) : console.log("Report created successfully");
      });
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
