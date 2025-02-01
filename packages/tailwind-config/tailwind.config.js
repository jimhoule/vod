/** @type {import('tailwindcss').Config} */
export const tailwindcssConfig = {
    content: [
        // NOTE: Packages content path an app in apps diectory
        '../../packages/**/*.{jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
