import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: [
		'./src/components/**/*.{ts,tsx}',
		'./src/hooks/*.ts',
		'./src/types/*.ts',
		'./src/utils/*.ts',
	],
	format: ['esm'],
	outDir: './dist',
	sourcemap: true,
	splitting: false,
	treeshake: true,
	tsconfig: './tsconfig.json',
});
