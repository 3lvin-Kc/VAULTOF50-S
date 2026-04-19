import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Inject meta-tag fallbacks into the HTML shell so crawlers that
    // don't execute JS still see meaningful content.
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
