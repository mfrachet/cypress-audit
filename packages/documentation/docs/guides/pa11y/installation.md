# Installation

:warning: In order to make the `cy.pa11y()` command available in your project, **there are 3 steps to follow:**

## Installing the dependency

In your favorite terminal:

```sh
$ yarn add -D @cypress-audit/pa11y
# or
$ npm install --save-dev @cypress-audit/pa11y
```

## The server configuration

By default, if you try to run Lighthouse from the command line (or from Nodejs), you will see that it opens a new web browser window by default. As you may also know, Cypress also opens a dedicated browser to run its tests.

The following configuration allows Lighthouse and Cypress to make their verifications inside **the same browser (controlled by Cypress) instead of creating a new one**.

### Cypress over v10

In the `cypress.config.js` file, make sure to have:

```javascript
const { pa11y, prepareAudit } = require("@cypress-audit/pa11y");

module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000", // this is your app
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        pa11y: pa11y(),
      });
    },
  },
};
```

### Cypress prior to v10

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

## Making Cypress aware of the commands

When adding the following line in the `cypress/support/commands.js` file, you will be able to use `cy.pa11y` inside your Cypress tests:

```javascript
import "@cypress-audit/pa11y/commands";
```

You can call `cy.pa11y(opts)` with `opts` being any kind of [the pa11y options](https://github.com/pa11y/pa11y#configuration).

![A Pa11y record showing some test failing on color contrast, landmark, heading and regions.](./pally.png)
