import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/movies/*.ts', './src/profiles/*.ts', './src/users/*.ts'],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
