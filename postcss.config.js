// postcss.config.js
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss, // Certifique-se que está usando '@tailwindcss/postcss'
    autoprefixer,
  ],
};
