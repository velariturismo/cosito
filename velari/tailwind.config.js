/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Velari brand palette
				velari: {
					deep:    '#1e2b3a',   // Azul Profundo
					petrol:  '#314053',   // Azul Petróleo
					sand:    '#ceb59c',   // Arena
					beige:   '#dfd7cb',   // Beige Claro
				},
				// shadcn/ui token layer
				border: 'hsl(var(--border))',
				input:  'hsl(var(--input))',
				ring:   'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground:  'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				// Velari brand fonts
				// Primary: Helony (titles) — falls back to Cormorant Garamond
				heading:  ['Helony', 'Cormorant Garamond', 'Georgia', 'serif'],
				// Body: Codec Pro — falls back to Inter
				body:     ['Codec Pro', 'Inter', 'system-ui', 'sans-serif'],
				// Accent: Chocolate Covered Raindrops Bold — falls back to Caveat
				accent:   ['Chocolate Covered Raindrops Bold', 'Caveat', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to:   { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to:   { height: 0 },
				},
				'fade-up': {
					from: { opacity: 0, transform: 'translateY(24px)' },
					to:   { opacity: 1, transform: 'translateY(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%':      { transform: 'translateY(-8px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up':   'accordion-up 0.2s ease-out',
				'fade-up':        'fade-up 0.6s ease-out both',
				'float':          'float 4s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
