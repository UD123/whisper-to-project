// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: { enabled: true },
  },
  vite: {
    plugins: [
      {
        // The prerender preview server imports dist/server/server.js (named after the
        // server entry), while the nitro cloudflare preset emits index.mjs. Write a
        // re-export shim after the app build so prerendering can boot the server.
        name: "prerender-server-entry-shim",
        apply: "build",
        buildApp: {
          order: "post",
          async handler() {
            const { writeFileSync, existsSync } = await import("node:fs");
            if (existsSync("dist/server/index.mjs")) {
              writeFileSync(
                "dist/server/server.js",
                'export { default } from "./index.mjs";\n',
              );
            }
          },
        },
      },
    ],
  },
});
