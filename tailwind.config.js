export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        surface: '#f8fafc',
        border: '#e2e8f0',
      },
    },
  },
  plugins: [],
};
