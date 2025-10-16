import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./cli/index.ts", "./src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
});
