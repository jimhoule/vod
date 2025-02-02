import { tailwindcssConfig } from '@repo/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
		...tailwindcssConfig.content,
        './src/**/*.{js,ts,jsx,tsx}',
    ],
	theme: {
		screens: {
			xs: '350px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
			'2xl': '1760px',
		},
		extend: {
			colors: {
				brand: {
					light: '#58A7DB',
					dark: '#013C63',
					neutral: '#ADD4ED'
				},
			},
		},
	},
};
