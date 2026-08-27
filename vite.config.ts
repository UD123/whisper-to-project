// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// BUILD_STATIC=true produces a fully prerendered static site (for GitHub Pages).
// It skips the nitro Cloudflare worker build, whose bundle cannot boot in the
// Node preview server TanStack Start uses for prerendering. Lovable builds keep
// the default SSR + nitro behavior.
const isStaticBuild = process.env["BUILD_STATIC"] === "true";

export default defineConfig({
  ...(isStaticBuild ? { nitro: false, vite: { base: "/whisper-to-project/" } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStaticBuild
      ? {
          prerender: { enabled: true },
          basename: "/whisper-to-project/",
        }
      : {}),
  },
});
