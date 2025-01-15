import { tailwindcssConfig } from '@repo/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
        './app/**/*.{jsx,tsx}',
        '../../packages/**/*.{jsx,tsx}',
    ],
};