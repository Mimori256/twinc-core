import { defineConfig } from "tsdown";

export default defineConfig({
  target: "esnext",
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  minify: true,
});
