import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',    // Ejemplo de un azul índigo
          dark: '#3730A3',
        },
      },
    },
  },
  plugins: [],
};

export default config;
