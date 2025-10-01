import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: [
		'./src/auth/*.ts',
		'./src/common/*.ts',
		'./src/env/*.ts',
		'./src/movies/*.ts',
		'./src/profiles/*.ts',
	],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
