import { defineConfig } from "vite";

export default defineConfig({
  base: "/reservee/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "index.html",
        reservation: "reservation.html",
        admin: "admin.html",
        restaurant: "restaurant.html",
        tools: "tools.html",
      },
    },
  },
});
