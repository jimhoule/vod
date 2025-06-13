/** @type {import('tailwindcss').Config} */
export const tailwindcssConfig = {
    content: [
        // NOTE: UI package content relative path for an app in apps directory
        '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
		extend: {
			animation: {
				'fade-in-slide-up': 'fade-in-slide-up 0.1s ease-out',
				'fade-in-slide-down': 'fade-in-slide-down 0.1s ease-out',
				'fade-in-slide-right': 'fade-in-slide-right 0.1s ease-out',
				'fade-in-slide-left': 'fade-in-slide-left 0.1s ease-out',
			},
			keyframes: {
				'fade-in-slide-up': {
					from: {
						opacity: '0',
						transform: 'translateY(2px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'fade-in-slide-down': {
					from: {
						opacity: '0',
						transform: 'translateY(-2px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'fade-in-slide-right': {
					from: {
						opacity: '0',
						transform: 'translateX(2px)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'fade-in-slide-left': {
					from: {
						opacity: '0',
						transform: 'translateX(-2px)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
		},
	},
}
