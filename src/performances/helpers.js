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
      [curr]: { score: categories[curr].score * 100 },
    }),
    {}
  );
};

/**
 * Compute the different audit informations such as
 * - first-contentful-paint
 * - largest-contentful-paint
 * - first-meaningful-paint
 * - etc...
 */
const computeAudits = (audits) => {
  return Object.keys(audits).reduce(
    (metrics, curr) => ({
      ...metrics,
      [curr]: { numericValue: audits[curr].numericValue },
    }),
    {}
  );
};

const compareWithThresholds = (metrics, thresholds) => {
  const errors = [];
  const results = [];

  Object.keys(thresholds).forEach((key) => {
    const actualTreshold = thresholds[key];
    const actualMetric = metrics[key];

    // Audits have a numericValue field that often corresponds to the time spend for the actual audit
    // On the other hand, categories (like performances, best-practices, accessibility etc...) owns a score.
    // When dealing with numericValue, we always want to lighthouse report to be lower than the thresholds
    // On the other hand, when dealing with scores, we always want the lighthouse report to be over that threshold
    if (actualMetric.numericValue) {
      if (actualTreshold < actualMetric.numericValue) {
        errors.push(
          `${key} record is ${actualMetric.numericValue} and is over the ${actualTreshold} threshold`
        );
      } else {
        results.push(
          `${key} record is ${actualMetric.numericValue} and threshold was ${actualTreshold}`
        );
      }
    } else {
      if (actualTreshold > actualMetric.score) {
        errors.push(
          `${key} record is ${actualMetric.score} and is under the ${actualTreshold} threshold`
        );
      } else {
        results.push(
          `${key} record is ${actualMetric.score} and threshold was ${actualTreshold}`
        );
      }
    }
  });

  return { errors, results };
};

module.exports = { computeCategories, computeAudits, compareWithThresholds };
