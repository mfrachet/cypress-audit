# Reports

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
