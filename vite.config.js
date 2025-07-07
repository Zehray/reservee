import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    target: ["es2015", "safari11"], // Safari uyumluluğu
    rollupOptions: {
      input: {
        main: "index.html",
        reservation: "reservation.html",
        admin: "admin.html",
        restaurant: "restaurant.html",
        tools: "tools.html",
      },
      output: {
        format: "es",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  esbuild: {
    target: "es2015", // Safari için eski JavaScript syntax
  },
});
