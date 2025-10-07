import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: [
		'./src/BaseError.ts',
		'./src/application/**/*.ts',
		'./src/infrastructure/**/*.ts',
		'./src/presentation/**/*.ts',
	],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
