/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Indigo
        secondary: '#64748b', // Gray-blue
        accent: '#22d3ee', // Cyan
        background: '#f9fafb',
        darkBackground: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        'header': '64px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      primary:{
        DEFAULT: '#2e3bff', // Default Indigo
        forground:'hsl(var(--primary-foreground)',

      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
 
}
