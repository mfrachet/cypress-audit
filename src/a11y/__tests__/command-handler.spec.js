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
    it.only("shows an error when there s one error", async () => {
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
  });
});
