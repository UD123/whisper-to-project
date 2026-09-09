# Replace NACHI logo with the provided image

## Goal
Update the NACHI logo in the Hardware Ecosystem section to use the red NACHI wordmark image the user supplied.

## Steps
1. **Prepare the logo asset**
   - Download the provided PNG (`encrypted-tbn0.gstatic.com` link).
   - Crop whitespace and normalize colors (solid red `#E11`/`#D90B17` range).
   - Convert the clean raster to a path-based SVG so it behaves like the other ecosystem logos (grayscale → color on hover, small file size).

2. **Replace the current file**
   - Overwrite `src/assets/logos/nachi.svg` with the new vector.

3. **Verify the integration**
   - Confirm `BrandLogo.tsx` still renders NACHI with the `.logo-muted` filter and the red color restores on hover.
   - Check the Ecosystem grid at desktop and mobile widths to ensure no layout breakage.

4. **Build & visual check**
   - Run `bun run build`.
   - Take Playwright screenshots of `/` focused on the Ecosystem section.

## Out of scope
- No other logos or navigation changes.
- No GitHub push (handled by platform sync).
