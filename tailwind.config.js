/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#289df4',
        secondary: '#71d175',
        accent: '#ff9f43',
        background: '#f8f9fa',
        text: '#333333',
        muted: '#6c757d',
        light: '#e9ecef',
        dark: '#343a40'
      }
    }
  },
  plugins: [],
};
