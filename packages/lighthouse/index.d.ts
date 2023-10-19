/// <reference types="cypress" />

import type * as LH from "lighthouse/core";

declare global {
  namespace Cypress {
    interface LighthouseThresholds {
      performance?: number;
      accessibility?: number;
      "best-practices"?: number;
      seo?: number;
      pwa?: number;
      "first-contentful-paint"?: number;
      "largest-contentful-paint"?: number;
      "first-meaningful-paint"?: number;
      "load-fast-enough-for-pwa"?: number;
      "speed-index"?: number;
      "estimated-input-latency"?: number;
      "max-potential-fid"?: number;
      "server-response-time"?: number;
      "first-cpu-idle"?: number;
      interactive?: number;
      "mainthread-work-breakdown"?: number;
      "bootup-time"?: number;
      "network-rtt"?: number;
      "network-server-latency"?: number;
      metrics?: number;
      "uses-long-cache-ttl"?: number;
      "total-byte-weight"?: number;
      "dom-size"?: number;
    }

    type LighthouseFlags = LH.Flags;

    type LighthouseConfig = LH.Config;

    interface Chainable<Subject> {
      /**
       * Runs a lighthouse audit
       * @example
       * cy.lighthouse(thresholds,opts,config)
       */
      lighthouse(
        thresholds?: LighthouseThresholds,
        opts?: LighthouseFlags,
        config?: LighthouseConfig
      );
    }
  }
}

export declare function lighthouse(
  callback?: (results: LH.RunnerResult) => void
): Cypress.Task;

export declare function prepareAudit(
  launchOptions: Cypress.BrowserLaunchOptions
): void;
