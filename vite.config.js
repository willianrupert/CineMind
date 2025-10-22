import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss"; // <-- Importa o plugin Tailwind
import autoprefixer from "autoprefixer";       // <-- Importa o Autoprefixer

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: [".replit.dev"],
    hmr: {
      clientPort: 443,
    },
  },
  // --- NOVA CONFIGURAÇÃO CSS ---
  css: {
    postcss: {
      plugins: [
        tailwindcss, // <-- Usa o plugin Tailwind aqui
        autoprefixer, // <-- Usa o Autoprefixer aqui
      ],
    },
  },
  // --- FIM DA NOVA CONFIGURAÇÃO ---
});
