/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,astro}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'inherit',
              fontWeight: '700',
            },
            h2: {
              color: 'inherit',
              fontWeight: '700',
            },
            h3: {
              color: 'inherit',
              fontWeight: '600',
            },
            h4: {
              color: 'inherit',
              fontWeight: '600',
            },
            code: {
              color: 'inherit',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: '0.375rem',
              padding: '1rem',
              overflowX: 'auto',
            },
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        serif: ['var(--font-serif)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};