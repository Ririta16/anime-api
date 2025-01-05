import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { path } from "motion/react-client";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173,
  },
});
