<h5 align="center">
Run <a href="https://developers.google.com/web/tools/lighthouse">Lighthouse</a> and <a href="https://github.com/pa11y/pa11y">Pa11y</a> audits directly in your <a href="https://cypress.io/">Cypress</a> E2E test suites
</h5>

---

[![Build Status](https://travis-ci.org/mfrachet/cypress-audit.svg?branch=master)](https://travis-ci.org/mfrachet/cypress-audit) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Why cypress-audit](./docs/WHY.md) · [Before jumping in](./docs/BEFORE_JUMPING.md) · [Usage](#usage) · [Examples](./example)

## Usage

### Installation

To make `cypress-audit` working in your project, you have to follow these **3 steps**:

- In your favorite terminal:

```sh
$ yarn add -D cypress-audit
# or
$ npm install --save-dev cypress-audit
```

- In the `cypress/plugins/index.js` file:

```javascript
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse,
    pa11y,
  });
};
```

- In the `cypress/support/commands.js` file:

```javascript
import "cypress-audit/commands";
```

### In your code

After completing the [Installation](#installation) section, you are now able to use the `cy.audit` and `cy.pa11y` commands inside your tests.

```javascript
it("should pass the audits", function () {
  cy.lighthouse();
  cy.pa11y();
});
```

[You can now check the APIs for the `cy.lighthouse` and `cy.pa11y` commands here.](./docs/README.md)
