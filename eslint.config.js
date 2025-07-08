const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const importPlugin = require("eslint-plugin-import");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      react,
      import: importPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.es6
      }
    },
    settings: {
      react: {
        version: "16.0"
      }
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "(^[_][_]*$)|(^.$)",
          varsIgnorePattern: "(^[_][_]*$)|(^R$)"
        }
      ],
      ...react.configs.recommended.rules,
      ...importPlugin.configs.errors.rules,
      ...importPlugin.configs.warnings.rules
    }
  }
];