import { tailwindcssConfig } from '@packages/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
		...tailwindcssConfig.content,
        './app/**/*.{jsx,tsx}',
    ],
};
