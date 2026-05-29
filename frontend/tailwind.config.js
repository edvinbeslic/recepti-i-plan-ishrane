/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50:  '#f0fdf4',
            100: '#dcfce7',
            500: '#22c55e',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          accent: {
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
          },
          neutral: {
            50:  '#f9fafb',
            100: '#f3f4f6',
            300: '#d1d5db',
            500: '#6b7280',
            700: '#374151',
            800: '#1f2937',
          },
        },
      },
    },
    plugins: [],
  }