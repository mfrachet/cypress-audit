Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [Pa11y](https://github.com/pa11y/pa11y) audits directly in [Cypress](https://cypress.io/) test suites

---

> These libraries were previously deployed under the [cypress-audit](https://www.npmjs.com/package/cypress-audit) package and have been split because of license issues between underlying tools.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [Why cypress-audit?](#why-cypress-audit)
- [Usage](#usage)
  - [cy.lighthouse()](./packages/lighthouse/README.md)
  - [cy.pa11y()](./packages/pa11y/README.md)
- [Examples](#examples)

## Why cypress-audit?

We have the chance of being able to use powerful tools to automated and prevent from different kind of regressions:

- [Cypress](https://cypress.io/) has made business oriented automated verifications easy
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) has provided tools and metrics concerning applications performances
- [Pa11y](https://pa11y.org/) has provided tools to analyze and improve the accessibility status of applications

While these tools are amazingly powerful and helpful, I'm always feeling in pain when I try to use all of them in my projects.

For example, how can I verify the performance and accessibility status of a page requiring authentication? I have to tweak Lighthouse and Pa11y configurations (that are different) and adjust my workflows accordingly.

This is cumbersome because I already have my authentication logic and shortcuts managed by Cypress: why should I add more complexity in my tests?

The idea behind `@cypress-audit/*` is to aggregate all the underlying configurations behind dedicated [Cypress custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html): you can benefit from your own custom commands and you can run cross-cutting verifications directly inside your tests.

## Examples

In order to verify the state of this projects, automated tests are run on CI on examples projects. These projects are located in the [examples folder](./examples) and contain audits for:

- [create-react-app (with authentication)](./examples/cra-authenticated)
- [nextjs](./examples/nextjs)
- [testing on external URLs](./examples/external-url)

If you have a specific configuration or are running using a specific tool, you can add a project example and make it part of the CI process.
