import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // For `app` directory (Next.js 13+)
    './pages/**/*.{js,ts,jsx,tsx}', // For `pages` directory
    './components/**/*.{js,ts,jsx,tsx}', // For `components` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
