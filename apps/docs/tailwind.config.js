import { tailwindcssConfig } from '@repo/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
		...tailwindcssConfig.content,
        './app/**/*.{jsx,tsx}',
    ],
};
