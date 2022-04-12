# API

## Accessing the raw reports

When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a `callback` function to the task initializer. Then, when an audit is run, this callback will we executed with the raw data of the underlying tool.

In the `cypress/plugins/index.js` file:

```javascript
const { pa11y, prepareAudit } = require("@cypress-audit/pa11y");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport); // raw pa11y reports
    }),
  });
};
```

## To know before starting

[Pa11y](https://pa11y.org/) comes with a [GNU Lesser General Public License](https://github.com/pa11y/pa11y/blob/master/LICENSE) that you should respect if you want to use this tool.
