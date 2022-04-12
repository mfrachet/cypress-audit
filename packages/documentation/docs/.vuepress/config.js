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
            children: [
              {
                title: "Available metrics",
                path: "/guides/lighthouse/api-intro",
              },
              {
                title: "Command",
                path: "/guides/lighthouse/command-api",
              },
              {
                title: "Global setting",
                path: "/guides/lighthouse/global-api",
              },
              {
                title: "Reports",
                path: "/guides/lighthouse/reports",
              },
              {
                title: "Good to know",
                path: "/guides/lighthouse/good-to-know",
              },
            ],
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
