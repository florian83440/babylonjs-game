// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals"; // Make sure 'globals' package is installed: npm install globals
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import vue from "eslint-plugin-vue";

export default defineConfig([
  js.configs.recommended,
  vue.configs["flat/recommended"],
  prettierConfig,
  {
    files: ["src/**/*.js", "src/**/*.vue"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["*.cjs", "*.mjs", "vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
