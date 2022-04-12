const lighthouseCommandHandler = require("../command-handler");

describe("lighthouse command", () => {
  beforeEach(() => {
    global.Cypress = {
      browser: {
        displayName: "Chrome",
      },
      config: () => undefined,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("verify browser compat", () => {
    ["Chrome", "Chromium", "Canary"].forEach((browser) => {
      it(`resolves with no errors when the browser is ${browser}`, async () => {
        global.Cypress = {
          config: () => undefined,
          browser: {
            displayName: browser,
          },
        };

        global.cy = {
          url: () => Promise.resolve("my-url"),
          task: jest.fn(() => Promise.resolve({ errors: [], results: [] })),
          log: jest.fn(),
          wrap: jest.fn((x) => x),
        };

        await lighthouseCommandHandler({ performance: 10 });
      });
    });

    it(`shows an error when the browser is Edge`, async () => {
      global.Cypress = {
        browser: {
          displayName: "Edge",
        },
      };

      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() => Promise.resolve({ errors: [], results: [] })),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      await lighthouseCommandHandler({ performance: 10 });

      expect(global.cy.log).toBeCalledWith(
        "cy.lighthouse()",
        "Edge is not supported. Skipping..."
      );
    });
  });

  describe("no thresholds found", () => {
    it("showns an information when thresholds are not set", async () => {
      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() => Promise.resolve({ errors: [], results: [] })),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      await lighthouseCommandHandler();

      expect(global.cy.log).toBeCalledWith(
        "cypress-audit",
        "It looks like you have not set thresholds yet. The test will be based on the 100 score for every metrics. Refer to https://github.com/mfrachet/cypress-audit to have more information and set thresholds by yourself :)."
      );
    });
  });

  describe("happy path", () => {
    it("shows each lighthouse score when it finishes", async () => {
      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve({
            errors: [],
            results: ["First result", "Second result"],
          })
        ),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      await lighthouseCommandHandler({ performance: 100, accessibility: 90 });

      expect(global.cy.log).toBeCalledWith("-------- cy.lighthouse --------");
      expect(global.cy.log).toBeCalledWith("First result");
      expect(global.cy.log).toBeCalledWith("Second result");
      expect(global.cy.log).toBeCalledWith("-----------------------------");
    });
  });

  describe("error path", () => {
    it("shows one error when one threshold is crossed", async () => {
      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve({
            errors: ["First error"],
            results: ["First result", "Second result"],
          })
        ),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      try {
        await lighthouseCommandHandler({ performance: 100, accessibility: 90 });
      } catch (e) {
        expect(global.cy.log).toBeCalledWith("-------- cy.lighthouse --------");
        expect(e.message).toMatchInlineSnapshot(`
          "cy.lighthouse - A threshold has been crossed.

          First error"
        `);
      }
    });

    it("shows multiple error when multiple thresholds are crossed", async () => {
      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve({
            errors: ["First error", "Second error"],
            results: ["First result", "Second result"],
          })
        ),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      try {
        await lighthouseCommandHandler({ performance: 100, accessibility: 90 });
      } catch (e) {
        expect(global.cy.log).toBeCalledWith("-------- cy.lighthouse --------");
        expect(e.message).toMatchInlineSnapshot(`
          "cy.lighthouse - Some thresholds have been crossed.

          First error
          Second error"
        `);
      }
    });

    it("shows one error when lighthouse does not provide anything", async () => {
      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() => Promise.resolve()),
        log: jest.fn(),
        wrap: jest.fn((x) => x),
      };

      try {
        await lighthouseCommandHandler({ performance: 100, accessibility: 90 });
      } catch (e) {
        expect(global.cy.log).toBeCalledWith("-------- cy.lighthouse --------");
        expect(e.message).toMatchInlineSnapshot(
          `"For an unexpected reason, lighthouse did not manage to run correctly. It might be related to lighthouse itself."`
        );
      }
    });
  });
});
