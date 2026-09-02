/**
 * Utility to construct relative video paths that work on both local dev and GitHub Pages.
 * Instead of relying on absolute Lovable asset URLs (/__l5e/...), we import videos directly
 * as modules and construct relative paths.
 */

// Import all video asset metadata
import heroLoop from "@/assets/hero-16x9-loop.mp4.asset.json";
import objectScanningVideo from "@/assets/object-scanning-zoom.mp4.asset.json";
import objectLocalizationVideo from "@/assets/object-localization.mp4.asset.json";
import machineTendingVideo from "@/assets/machine-tending-loop.mp4.asset.json";
import randomBinPickingVideo from "@/assets/bin-picking-loop.mp4.asset.json";
import palletizingVideo from "@/assets/palletizing.mp4.asset.json";
import assemblyVideo from "@/assets/assembly.mp4.asset.json";
import agvDockingVideo from "@/assets/agv-docking.mp4.asset.json";
import agritechVideo from "@/assets/agritech.mp4.asset.json";

/**
 * Get the relative path to a video asset.
 * Uses the original_filename from the asset metadata to construct a path
 * that works with Vite's asset handling in both dev and production.
 */
export function getVideoPath(assetJson: typeof heroLoop): string {
  const filename = assetJson.original_filename;
  // Return a path relative to the built assets directory
  return new URL(`../assets/${filename}`, import.meta.url).href;
}

/**
 * Alternative: construct paths using the asset ID for better caching
 * This assumes videos are copied to public/videos/ during build
 */
export function getVideoPathStatic(assetJson: typeof heroLoop): string {
  const filename = assetJson.original_filename;
  return `/videos/${filename}`;
}

// Video asset registry
export const videos = {
  heroLoop: heroLoop,
  objectScanning: objectScanningVideo,
  objectLocalization: objectLocalizationVideo,
  machineTending: machineTendingVideo,
  randomBinPicking: randomBinPickingVideo,
  palletizing: palletizingVideo,
  assembly: assemblyVideo,
  agvDocking: agvDockingVideo,
  agritech: agritechVideo,
} as const;

export type VideoKey = keyof typeof videos;

/**
 * Get video URL that respects base path in builds (e.g., GitHub Pages)
 * In development: uses asset resolution
 * In production (GitHub Pages): paths are relative to vite base setting
 */
export function resolveVideoUrl(videoAsset: typeof heroLoop): string {
  // Extract just the filename from the asset metadata
  const filename = videoAsset.original_filename;
  
  // Return a relative path that Vite will handle correctly
  // The base path is handled by vite's build configuration
  return new URL(`../assets/${filename}`, import.meta.url).href;
}
