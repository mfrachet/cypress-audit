declare namespace Cypress {
    type AccessibilityStandard = "Section508" | "WCAG2A" | "WCAG2AA" | "WCAG2AAA";

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

    interface Chainable<Subject> {
     
      /**
       * Select and add product to Cart
       * @example
       * cy.selectProduct(productName, size , color)
       */
      selectProduct(productName: String, size: String , color: String): Chainable<any>

      /**
       * Runs a pa11y audit
       * @example
       * cy.pa11y(opts)
       */
      pa11y(opts?: Options):Chainable<void>
    }
  }