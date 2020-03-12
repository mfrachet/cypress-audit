## Why cypress-audit?

Lighthouse is an amazing tool that allows to verify some metrics of a specific webpage. It measures _performances_, _accessibility_, _best practices_, _seo_ and _pwa_ and provides a score between 0 and 100 (100 being the maximum) for each of them. These metrics are subjective but generally useful to verify that we don't have too much regressions while modifying our applications.

The main problem that I see with Lighthouse is that we tend to use it to only verify the homepage of an application. It's easy to take for granted that an application is in good health testing only the main page of an app.

This modules aims to provide an easy way to verify lighthouse score as part of your E2E flows:

- you write your assumptions in JavaScript
- your verify the scores based on the _current_ Cypress page (the result of `cy.url()`)
- you can take advantage of your custom Cypress commands (like authentication :rocket:)
