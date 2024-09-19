import { nextui } from '@nextui-org/theme';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {},
  },

  darkMode: 'class', // Enable dark mode support
  plugins: [nextui(), daisyui], // Include NextUI and DaisyUI as plugins
};
