# Global API

## Globally set thresholds

While I would recommend to make per-test assumptions, it's possible to define general metrics inside the `cypress.json` file as following:

```json
{
  "lighthouse": {
    "thresholds": {
      "performance": 85,
      "accessibility": 50,
      "best-practices": 85,
      "seo": 85,
      "pwa": 50
    }
  }
}
```

_Note: These metrics are override by the per-tests one._

## Globally set options and configs

You can set default `lighthouseOptions` and `lighthouseConfig` to your `cypress.json` file using:

```json
{
  "lighthouse": {
    "options": {
      /* put your options here, like formFactor by default */
    },
    "config": {
      /* put your config here */
    }
  }
}
```

These values can be override at the test level.
