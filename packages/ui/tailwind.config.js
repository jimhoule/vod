import { tailwindcssConfig } from '@repo/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
        './src/**/*.{jsx,tsx}'
    ],
};