import { defineConfig } from "vite"
import { resolve } from "path"
import resolveExternalsPlugin from "vite-plugin-cdn-externals"

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    target: "esnext",
    minify: "terser",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PetiteVue",
      formats: ["es", "umd", "iife"],
    },
    rollupOptions: {
      plugins: [
        {
          name: "remove-collection-handlers",
          transform(code, id) {
            if (id.endsWith("reactivity.esm-bundler.js")) {
              return code
                .replace(`mutableCollectionHandlers,`, `null,`)
                .replace(`readonlyCollectionHandlers,`, `null,`)
            }
          },
        },
        resolveExternalsPlugin({
          vue: "Vue",
        }),
      ],
    },
  },
});
