const reactPlugin = require("eslint-plugin-react");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        history: "readonly",
        location: "readonly",
        URL: "readonly",
        Event: "readonly",
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...importPlugin.flatConfigs.errors.rules,
      ...importPlugin.flatConfigs.warnings.rules,
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "(^[_][_]*$)|(^.$)",
          caughtErrorsIgnorePattern: "(^[_][_]*$)|(^.$)",
          varsIgnorePattern: "(^[_][_]*$)|(^R$)",
        },
      ],
    },
  },
];
