/** @type {import('tailwindcss').Config} */
export default {
  // Tente usar um padrão mais amplo temporariamente:
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}", // Simplificado para garantir
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
