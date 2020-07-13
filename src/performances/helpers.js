/**
 * Compute the general categories of lighthouse
 * - performances
 * - accessiblity
 * - best-practices
 * - seo
 * - pwa
 */
const computeCategories = (categories) => {
  return Object.keys(categories).reduce(
    (metrics, curr) => ({
      ...metrics,
      [curr]: categories[curr].score * 100,
    }),
    {}
  );
};

const compareWithThresholds = (thresholds) => (newValue) => {
  const errors = [];
  const results = [];

  Object.keys(thresholds).forEach((key) => {
    if (thresholds[key] > newValue[key]) {
      errors.push(
        `${key} record is ${newValue[key]} and is under the ${thresholds[key]} threshold`
      );
    } else {
      results.push(
        `${key} record is ${newValue[key]} and threshold was ${thresholds[key]}`
      );
    }
  });

  return { errors, results };
};

module.exports = { computeCategories, compareWithThresholds };
