import { defineConfig } from "vite";

export default defineConfig({
  base: "/reservee/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
