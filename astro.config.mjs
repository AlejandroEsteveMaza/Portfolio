// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  site: "https://alejandro-esteve.com",
  trailingSlash: "always",
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
