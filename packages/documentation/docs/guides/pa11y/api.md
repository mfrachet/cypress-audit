# API

## Accessing the raw reports

When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a `callback` function to the task initializer. Then, when an audit is run, this callback will we executed with the raw data of the underlying tool.

In the `cypress/plugins/index.js` file:

```javascript
const { kayle, prepareAudit } = require("@cypress-audit/kayle");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    kayle: kayle((kayleReport) => {
      console.log(kayleReport); // raw kayle reports
    }),
  });
};
```

## To know before starting

[Kayle](https://kayle.org/) comes with a [GNU Lesser General Public License](https://github.com/kayle/kayle/blob/master/LICENSE) that you should respect if you want to use this tool.
