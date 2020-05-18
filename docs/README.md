## cypress-audit

- [Installation](#installation)
- [cy.lighthouse()](./LIGHTHOUSE.md)
- [cy.pa11y()](./PA11Y.md)

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
