import globals from "globals";
import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSXを有効化
        },
        ecmaVersion: "latest", // 最新のECMAScriptバージョンを使用
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": pluginReact,
    },
    rules: {
      // 必要なルールをここに追加
    },
    settings: {
      react: {
        version: "detect", // Reactのバージョンを自動検出
      },
    },
  },
];
