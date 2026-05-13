import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  root,
  esbuild: {
    jsx: "automatic",
  },
  test: {
    dir: "tests",
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": root,
    },
  },
});
