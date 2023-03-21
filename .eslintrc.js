module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    es6: true,
  },
};
