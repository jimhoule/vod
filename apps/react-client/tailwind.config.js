import { tailwindcssConfig } from '@repo/tailwind-config/tailwindcss-config';

export default {
    ...tailwindcssConfig,
    content: [
		...tailwindcssConfig.content,
        './src/components/**/*.{js,ts,jsx,tsx}',
		'./src/routes/**/*.{js,ts,jsx,tsx}',
    ],
	theme: {
		...tailwindcssConfig.theme,
		screens: {
			xs: '350px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
			'2xl': '1760px',
		},
		extend: {
			...tailwindcssConfig.theme.extend,
			backgroundImage: {
				'blank-img': "url('../assets/blank.jpg')",
			},
			colors: {
				light: '#58A7DB',
				dark: '#013C63',
				neutral: '#ADD4ED',
				transparent: 'transparent',
			},
		},
	},
};
