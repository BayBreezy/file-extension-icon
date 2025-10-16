import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json", "html"],
      reportOnFailure: true,
      exclude: [
        "node_modules/",
        "dist/",
        "src/data/",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.config.ts",
        "examples/",
        "scripts/",
        "src/index.ts",
        "commitlint.config.js",
        "cli/",
        "knip.ts",
      ],
    },
  },
});
