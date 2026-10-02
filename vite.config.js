import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" lets the build work on GitHub Pages sub-paths without extra config
export default defineConfig({ plugins: [react()], base: "./" });
