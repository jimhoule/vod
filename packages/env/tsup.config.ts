import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['./src/env.ts'],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
