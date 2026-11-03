import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  input: {
    home: resolve(import.meta.dirname, "index.html"),
    explore: resolve(import.meta.dirname, "explore.html"),
    library: resolve(import.meta.dirname, "library.html"),
  },
});