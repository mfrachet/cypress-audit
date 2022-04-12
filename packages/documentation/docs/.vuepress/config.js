module.exports = {
  title: "cypress-audit Documentation",
  description: "Running audits directly in Cypress",
  // base: "/cypress-audit/",
  themeConfig: {
    search: false,
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [
          {
            title: "Why cypress-audit?",
            path: "/start-with-why",
          },
          {
            title: "Examples",
            path: "/examples",
          },
        ],
      },
      {
        title: "Lighthouse",
        children: [
          {
            title: "Installation",
            path: "/guides/lighthouse/installation",
          },
          {
            title: "API",
            path: "/guides/lighthouse/api",
          },
        ],
      },
      {
        title: "Pa11y",
        children: [
          {
            title: "Installation",
            path: "/guides/pa11y/installation",
          },
          {
            title: "API",
            path: "/guides/pa11y/api",
          },
        ],
      },
    ],
    displayAllHeaders: true,
  },
};
