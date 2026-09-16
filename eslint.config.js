// @ts-check
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  { ignores: [".next/**", "node_modules/**"] },
  prettierConfig,
];

export default config;
