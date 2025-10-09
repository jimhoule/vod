import { resolve } from 'path';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
	test: configDefaults,
	resolve: {
		alias: {
			'@app': resolve(__dirname, './src/app'),
			'@auth': resolve(__dirname, './src/auth'),
			'@encryption': resolve(__dirname, './src/encryption'),
			'@movies': resolve(__dirname, './src/movies'),
			'@profiles': resolve(__dirname, './src/profiles'),
			'@tokens': resolve(__dirname, './src/tokens'),
			'@users': resolve(__dirname, './src/users'),
			'@uuid': resolve(__dirname, './src/uuid'),
		},
	},
});
