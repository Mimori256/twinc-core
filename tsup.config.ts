import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  minify: true,
});
