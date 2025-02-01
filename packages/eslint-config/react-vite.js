import reactRefresh from 'eslint-plugin-react-refresh'
import { reactInternalConfig } from './react-internal.js';

/**
 * A custom ESLint configuration for libraries that use React Vite.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const reactViteConfig = [
	...reactInternalConfig,
	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
		languageOptions: {
			ecmaVersion: 2020,
		},
	},
]
