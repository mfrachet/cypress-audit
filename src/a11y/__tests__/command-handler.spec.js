const pa11yCommandHandler = require("../command-handler");

describe("pa11y command", () => {
  beforeEach(() => {
    global.Cypress = {
      browser: {
        displayName: "Chrome",
      },
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("verify browser compat", () => {
    ["Chrome", "Chromium", "Canary"].forEach((browser) => {
      it(`resolves with no errors when the browser is ${browser}`, async () => {
        global.Cypress = {
          browser: {
            displayName: browser,
          },
        };

        global.cy = {
          url: () => Promise.resolve("my-url"),
          task: jest.fn(() => Promise.resolve([])),
          log: jest.fn(),
        };

        await pa11yCommandHandler({ a: "bcd" });
        expect(global.cy.log).not.toBeCalled();
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
        task: jest.fn(() => Promise.resolve([])),
        log: jest.fn(),
      };

      await pa11yCommandHandler({ a: "bcd" });

      expect(global.cy.log).toBeCalledWith(
        "cy.pa11y()",
        "Edge is not supported. Skipping..."
      );
    });
  });

  describe("when issues", () => {
    it("shows an error when there s one error", async () => {
      global.Cypress = {
        browser: {
          displayName: "Chrome",
        },
      };

      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve([
            {
              code: "first",
              message: "Something wrong occured",
              context: "Additional context found",
              selector: ".somewhere-in-the-world",
            },
          ])
        ),
        log: jest.fn(),
      };

      try {
        await pa11yCommandHandler({ a: "bcd" });
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`
          "cy.pa11y - 1 accessibility violation was found

          Issue: first, # of occurrences: 1.
            - Something wrong occured
            - Context: Additional context found
            - Selector concerned: \\".somewhere-in-the-world\\"
                    "
        `);
      }
    });

    it("shows multiple errors when there are multiple errors", async () => {
      global.Cypress = {
        browser: {
          displayName: "Chrome",
        },
      };

      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve([
            {
              code: "first",
              message: "Something wrong occured",
              context: "Additional context found",
              selector: ".somewhere-in-the-world",
            },
            {
              code: "second",
              message: "Something wrong occured again",
              context: "Additional context found again",
              selector: ".somewhere-in-the-world-again",
            },
            {
              code: "second",
              message: "Something wrong occured again",
              context: "Additional context found again",
              selector: ".somewhere-in-the-world-again-2",
            },
          ])
        ),
        log: jest.fn(),
      };

      try {
        await pa11yCommandHandler({ a: "bcd" });
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`
          "cy.pa11y - 3 accessibility violations were found

          Issue: first, # of occurrences: 1.
            - Something wrong occured
            - Context: Additional context found
            - Selector concerned: \\".somewhere-in-the-world\\"
                    

          Issue: second, # of occurrences: 2.
            - Something wrong occured again
            - Context: Additional context found again
            - Selector concerned: \\".somewhere-in-the-world-again,.somewhere-in-the-world-again-2\\"
                    "
        `);
      }
    });

    it("shows multiple errors when there are multiple errors without selector", async () => {
      global.Cypress = {
        browser: {
          displayName: "Chrome",
        },
      };

      global.cy = {
        url: () => Promise.resolve("my-url"),
        task: jest.fn(() =>
          Promise.resolve([
            {
              code: "first",
              message: "Something wrong occured",
              context: "Additional context found",
            },
            {
              code: "second",
              message: "Something wrong occured again",
              context: "Additional context found again",
            },
            {
              code: "second",
              message: "Something wrong occured again",
              context: "Additional context found again",
            },
          ])
        ),
        log: jest.fn(),
      };

      try {
        await pa11yCommandHandler({ a: "bcd" });
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`
          "cy.pa11y - 3 accessibility violations were found

          Issue: first, # of occurrences: 1.
            - Something wrong occured
            - Context: Additional context found
            
                    

          Issue: second, # of occurrences: 2.
            - Something wrong occured again
            - Context: Additional context found again
            
                    "
        `);
      }
    });
  });
});
