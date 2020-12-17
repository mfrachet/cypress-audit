const {
  computeCategories,
  computeAudits,
  compareWithThresholds,
} = require("../helpers");

describe("performance helpers", () => {
  describe("computeCategories", () => {
    it("transforms a lighthouse object in a cypress-audit object", () => {
      const actual = computeCategories({
        performance: { score: 0.5, other: "invalid attr" },
      });
      const expected = { performance: { score: 50 } };

      expect(actual).toEqual(expected);
    });
  });

  describe("computeAudits", () => {
    it("transforms a lighthouse object in a cypress-audit object", () => {
      const actual = computeAudits({
        performance: {
          numericValue: 12,
          other: "invalid attr",
        },
      });
      const expected = { performance: { numericValue: 12 } };

      expect(actual).toEqual(expected);
    });
  });

  describe("compareWithThresholds", () => {
    it("handles errors", () => {
      const metrics = {
        performance: { score: 50 },
        accessibility: { numericValue: 12 },
      };

      const thresholds = { performance: 60, accessibility: 11 };

      const actual = compareWithThresholds(metrics, thresholds);

      expect(actual).toEqual({
        errors: [
          "performance record is 50 and is under the 60 threshold",
          "accessibility record is 12 and is over the 11 threshold",
        ],
        results: [],
      });
    });

    it("handles success", () => {
      const metrics = {
        performance: { score: 50 },
        accessibility: { numericValue: 12 },
      };

      const thresholds = { performance: 40, accessibility: 13 };

      const actual = compareWithThresholds(metrics, thresholds);

      expect(actual).toEqual({
        errors: [],
        results: [
          "performance record is 50 and threshold was 40",
          "accessibility record is 12 and threshold was 13",
        ],
      });
    });
  });
});
