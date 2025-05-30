// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import stylisticJsPlugin from "@stylistic/eslint-plugin-js";
import nextJsPlugin from "@next/eslint-plugin-next";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.mocha,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: reactPlugin,
      "@stylistic/js": stylisticJsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": ["error", "always"],
      "@stylistic/js/no-trailing-spaces": "error",
      "no-undef": "warn",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{jsx,mjsx,tsx,mtsx}"],
    plugins: {
      "@next/next": nextJsPlugin,
    },
    rules: {
      ...nextJsPlugin.configs.recommended.rules,
      ...nextJsPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["jsx", "global"],
        },
      ],
    },
  },
]);
