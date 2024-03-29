import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: "/perfum-website-app/",
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/perfum-website-app/, /node_modules/],
    },
  },
});
