We have the chance of being able to use powerful tools to automated and prevent from different kind of regressions:

- [Cypress](https://cypress.io/) has made business oriented automated verifications easy
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) has provided tools and metrics concerning applications performances
- [Kayle](https://a11ywatch.com/) has provided tools to analyze and improve the accessibility status of applications

While these tools are amazingly powerful and helpful, I'm always feeling in pain when I try to use all of them in my projects.

For example, how can I verify the performance and accessibility status of a page requiring authentication? I have to tweak Lighthouse and Kayle configurations (that are different) and adjust my workflows accordingly.

This is cumbersome because I already have my authentication logic and shortcuts managed by Cypress: why should I add more complexity in my tests?

The idea behind `@cypress-audit/*` is to aggregate all the underlying configurations behind dedicated [Cypress custom commands](https://docs.cypress.io/api/cypress-api/custom-commands.html): you can benefit from your own custom commands and you can run cross-cutting verifications directly inside your tests.
