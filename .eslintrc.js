module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    es6: true,
  },
};
