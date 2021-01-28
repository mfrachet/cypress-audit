/// <reference types="cypress" />

declare namespace Cypress {
  type AccessibilityStandard = 'Section508' | 'WCAG2A' | 'WCAG2AA' | 'WCAG2AAA';

  interface Options {
      actions?: string[];
      headers?: object;
      hideElements?: string;
      ignore?: string[];
      ignoreUrl?: boolean;
      includeNotices?: boolean;
      includeWarnings?: boolean;
      level?: string;
      method?: string;
      postData?: string;
      reporter?: string;
      rootElement?: string;
      runners?: string[];
      rules?: string[];
      screenCapture?: string;
      standard?: AccessibilityStandard;
      threshold?: number;
      timeout?: number;
      userAgent?: string;
      wait?: number;
  }

  interface LighthouseThresholds {
    performance?: number;
    accessibility?: number;
    'best-practices'?: number;
    seo?: number;
    pwa?: number;
    'first-contentful-paint'?: number;
    'largest-contentful-paint'?: number;
    'first-meaningful-paint'?: number;
    'load-fast-enough-for-pwa'?: number;
    'speed-index'?: number;
    'estimated-input-latency'?: number;
    'max-potential-fid'?: number;
    'server-response-time'?: number;
    'first-cpu-idle'?: number;
    interactive?: number;
    'mainthread-work-breakdown'?: number;
    'bootup-time'?: number;
    'network-rtt'?: number;
    'network-server-latency'?: number;
    metrics?: number;
    'uses-long-cache-ttl'?: number;
    'total-byte-weight'?: number;
    'dom-size'?: number;
  }

  interface Chainable<Subject> {
    /**
     * Runs a pa11y audit
     * @example
     * cy.pa11y(opts)
     */
    pa11y(opts?: Options);

    /**
     * Runs a lighthouse audit
     * @example
     * cy.lighthouse(thresholds,opts,config)
     */
    lighthouse(thresholds?: LighthouseThresholds, opts?: any, config?: any);
  }
}
