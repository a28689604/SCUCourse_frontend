import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      ".git/",
      ".firebase/",
      "public/",
      "*.min.js",
      "*.bundle.js",
      "coverage/",
      ".env*",
      "vite.config.js",
      "tailwind.config.js",
      "postcss.config.js",
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // React specific rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "warn",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "warn",

      // React Refresh
      "react-refresh/only-export-components": "warn",

      // Import rules
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/no-absolute-path": "error",
      "import/no-self-import": "error",
      "import/no-cycle": "warn",
      "import/no-unused-modules": "warn",

      // Simple import sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // General JS rules
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "warn",
      "prefer-const": "error",
      "no-var": "error",

      // Prettier integration
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
  {
    files: [
      "**/*.config.js",
      "vite.config.js",
      "tailwind.config.js",
      "postcss.config.js",
    ],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
  },
  prettierConfig, // This disables ESLint rules that conflict with Prettier
];
