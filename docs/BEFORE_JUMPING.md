## Before jumping in

While writing this module I was a bit confused because [Cypress is supposed to be run in dev mode](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server) while Lighthouse should run against a production bundle to ensure that the `performance` metric provides a real feedback: remember that development bundles are NOT OPTIMIZED.

What I tend to do to overcome this situation is to create another [Cypress project](https://docs.cypress.io/guides/guides/command-line.html#cypress-run-project-lt-project-path-gt) dedicated to the audits. This means that I would have at least 2 Cypress projects: one for the audit and one for my "usual" E2E tests.

When I want to start the Lighthouse tests, I first build the application, serve it like it was a production one and only then run the test suite.

### create-react-app example

_The [example folder](../example) demonstrates the following in practice._

Let's create a [create-react-app](https://github.com/facebook/create-react-app) application using the documentation.

You can now jump in and run `$ yarn start` to enter development mode and benefit from the development utilities you have (hot reloading for example).

Let's clear this command and run `$ yarn build` at the root of the project. After some time, a `./build` folder is created. This is the real production application, the one that you're supposed to deploy online to your end users.

To run this real application, I'm going to use the [serve](https://github.com/zeit/serve) package (there are other, it's not mandatory, we just want to serve our static assets from a server). Run the following:

```sh
$ yarn global serve

# For the following step, make sure you're inside the `./build` folder
# This will serve your production application on the :3000 port
$ yarn serve -l 3000
```

You should now run your audit testing against this application. If you don't run your test against a folder called `cypress` and that you rely on a specific project (like me) called `audit` (or anything else), you have to run cypress as:

```shell
$ cypress open --project audit
```

Yan can hopefully automate this in [TravisCI](https://travis-ci.org/) or [CircleCI](https://circleci.com/)
