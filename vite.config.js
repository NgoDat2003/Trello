import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
