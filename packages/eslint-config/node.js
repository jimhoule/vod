import globals from 'globals';
import { baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Node.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nodeConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  
];
