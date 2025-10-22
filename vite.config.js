import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Remova as importações de tailwindcss e autoprefixer daqui, se as adicionou
// import tailwindcss from "@tailwindcss/postcss";
// import autoprefixer from "autoprefixer";

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
  // Remova ou comente esta seção inteira:
  // css: {
  //   postcss: {
  //     plugins: [
  //       tailwindcss,
  //       autoprefixer,
  //     ],
  //   },
  // },
});

