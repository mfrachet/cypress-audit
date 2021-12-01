# cy.pa11y()

- [To know before starting](#to-know-before-starting)
- [Installation](#installation)
  - [Installing the dependency](#installing-the-dependency)
  - [Preparing the server configuration](#preparing-the-server-configuration)
  - [Making Cypress aware of the commands](#making-cypress-aware-of-the-commands)
- [API](#api)
  - [Accessing the raw reports](#accessing-the-raw-reports)

## To know before starting

[Pa11y](https://pa11y.org/) comes with a [GNU Lesser General Public License](https://github.com/pa11y/pa11y/blob/master/LICENSE) that you should respect if you want to use this tool.

## Installation

In order to make the `cy.pa11y()` command available in your project, **there are 3 steps to follow:**

### Installing the dependency

In your favorite terminal:

```sh
$ yarn add -D @cypress-audit/pa11y
# or
$ npm install --save-dev @cypress-audit/pa11y
```

### Preparing the server configuration

By default, if you try to run Lighthouse from the command line (or from Nodejs), you will see that it opens a new web browser window by default. As you may also know, Cypress also opens a dedicated browser to run its tests.

The following configuration allows Lighthouse and Cypress to make their verifications inside **the same browser (controlled by Cypress) instead of creating a new one**.

In the `cypress/plugins/index.js` file, make sure to have:

```javascript
const { pa11y, prepareAudit } = require("@cypress-audit/pa11y");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    pa11y: pa11y(), // calling the function is important
  });
};
```

### Making Cypress aware of the commands

When adding the following line in the `cypress/support/commands.js` file, you will be able to use `cy.pa11y` inside your Cypress tests:

```javascript
import "@cypress-audit/pa11y/commands";
```

You can call `cy.pa11y(opts)` with `opts` being any kind of [the pa11y options](https://github.com/pa11y/pa11y#configuration).

![A Pa11y record showing some test failing on color contrast, landmark, heading and regions.](./docs/pally.png)

## API

### Accessing the raw reports

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
