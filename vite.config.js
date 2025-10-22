import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",

    // --- CORREÇÃO 1 (A que o erro pediu) ---
    // Diz ao Vite para "confiar" em qualquer host que termine com .replit.dev
    allowedHosts: [".replit.dev"],

    // --- CORREÇÃO 2 (A que já tínhamos) ---
    // Diz ao Vite como se comunicar com a janela de Preview
    hmr: {
      clientPort: 443,
    },
  },
});
