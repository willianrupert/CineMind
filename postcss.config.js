import tailwindcss from "@tailwindcss/postcss"; // <-- Importa o novo pacote
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss, // <-- Usa o novo pacote
    autoprefixer,
  ],
};
