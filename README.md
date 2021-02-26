<h5 align="center">
Run <a href="https://developers.google.com/web/tools/lighthouse">Lighthouse</a> and <a href="https://github.com/pa11y/pa11y">Pa11y</a> audits directly in <a href="https://cypress.io/">Cypress</a> test suites
</h5>

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [Why cypress-audit?](#why-cypress-audit)
- [Usage](#usage)
  - [Preparation](#preparation)
  - [In your code](#in-your-code)
  - [cy.lighthouse()](./docs/lighthouse.md)
  - [cy.pa11y()](./docs/pa11y.md)
  - [Accessing the raw reports](#accessing-the-raw-reports)
- [Examples](#examples)

## Why cypress-audit?

We have the chance of being able to use powerful tools to automated and prevent from different kind of regressions:

- [Cypress](https://cypress.io/) has made business oriented automated verifications easy
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) has provided tools and metrics concerning applications performances
- [Pa11y](https://pa11y.org/) has provided tools to analyze and improve the accessibility status of applications

While these tools are amazingly powerful and helpful, I'm always feeling in pain when I try to use all of them in my projects.

For example, how can I verify the performance and accessibility status of a page requiring authentication? I have to tweak Lighthouse and Pa11y configurations (that are different) and adjust my workflows accordingly.

This is cumbersome because I already have my authentication logic and shortcuts managed by Cypress: why should I add more complexity in my tests?

The idea behind `cypress-audit` is to aggregate all the underlying configurations behind dedicated [Cypress custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html): you can benefit from your own custom commands and you can run cross-cutting verifications directly inside your tests.

## Usage

### Preparation

In order to make `cypress-audit` commands available in your project, **there are 3 steps to follow:**

#### Installing the dependency

In your favorite terminal:

```sh
$ yarn add -D cypress-audit
# or
$ npm install --save-dev cypress-audit
```

#### Preparing the server configuration

By default, if you try to run Lighthouse or Pa11y from the command line (or from Nodejs), you will see that they both open a new web browser window by default. As you may also know, Cypress also opens a dedicated browser to run its tests.

The following configuration allows Lighthouse, Pa11y and Cypress to make their verifications inside the same browser (controlled by Cypress) instead of opening a new one.

In the `cypress/plugins/index.js` file, make sure to have:

```javascript
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y(), // calling the function is important
  });
};
```

#### Making Cypress aware of the commands

When adding the following line in the `cypress/support/commands.js` file, you will be able to use `cy.lighthouse` and `cy.pa11y` inside your Cypress tests:

```javascript
import "cypress-audit/commands";
```

### In your code

After completing the [Preparation](#preparation) section, you can use the [`cy.lighthouse`](./docs/lighthouse.md) and [`cy.pa11y`](./docs/pa11y.md) commands:

```javascript
it("should pass the audits", function () {
  cy.lighthouse();
  cy.pa11y();
});
```

ℹ️ _When running the different audits, a new tab will open. It's **normal**. Lighthouse works that way and I don't think we can manage this otherwise (if you know how, please reach out to me :pray:)._

### Accessing the raw reports

When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a `callback` function to the task initializer. Then, when an audit is run, this callback will we executed with the raw data of the underlying tool.

In the `cypress/plugins/index.js` file:

```javascript
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport); // raw lighthouse reports
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport); // raw pa11y reports
    }),
  });
};
```

## Examples

In order to verify the state of this projects, automated tests are run on CI on examples projects. These projects are located in the [examples folder](./examples) and contain audits for:

- [create-react-app (with authentication)](./examples/cra-authenticated)
- [nextjs](./examples/nextjs)
- [testing on external URLs](./examples/external-url)
- [NX](./examples/nx)

If you have a specific configuration or are running using a specific tool, you can add a project example and make it part of the CI process.
