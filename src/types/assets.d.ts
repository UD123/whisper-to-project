// Type declarations for imported static assets (Vite import patterns)
// Prevents TypeScript errors like "Cannot find module '*.svg?url'" during build.

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.png?url' {
  const src: string;
  export default src;
}

declare module '*.jpg?url' {
  const src: string;
  export default src;
}

declare module '*.jpeg?url' {
  const src: string;
  export default src;
}

declare module '*.mp4?url' {
  const src: string;
  export default src;
}

declare module '*.webm?url' {
  const src: string;
  export default src;
}

// Also allow plain SVG imports (used for logo assets imported as modules)
declare module '*.svg' {
  const src: string;
  export default src;
}

// Lovable asset metadata JSON files
declare module '*.asset.json' {
  const value: any;
  export default value;
}
