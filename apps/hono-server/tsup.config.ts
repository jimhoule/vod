import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	entry: ['./src/main.ts'],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
