const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
  {
    ignores: ["node_modules/**", "playwright-report/**", "test-results/**"],
  },
  js.configs.recommended,
  {
    files: ["eslint.config.js", "playwright.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["assets/**/*.js", "projects/**/*.js", "templates/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: globals.browser,
    },
  },
  {
    files: ["scripts/**/*.mjs", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.node, ...globals.browser },
    },
  },
];
