# Fix the top menu layout

## What's wrong
- **Wide screens (1536px and up):** the section links (Technology … Evaluation) appear in the same row as Product / Docs / Download / Pricing. Everything is squeezed: the "LIVE 6DOF" badge breaks onto two lines, "Evaluation" touches the "Product" tab, and "中文" in the language switch breaks into two lines.
- **Narrower screens (around 750px and below):** the logo, the four tabs and the language switch barely fit. On phones they will spill past the edge, and there is no menu for the page sections.

## Fix
1. **Two rows on the home page.**
   - Top row: logo + LIVE badge on the left; Product · Docs · Download · Pricing and the language switch on the right.
   - Second, thinner row, only on the home page: the section links (Technology, Applications, Workflow, Ecosystem, Specs, Catalog, About, FAQ, Evaluation). It scrolls sideways if it doesn't fit, so nothing overlaps.
   - The Docs, Download and Pricing pages keep just the top row.
2. **No text wrapping:** the LIVE badge, the tabs and "中文" always stay on one line.
3. **Phones (below about 640px):** show only the logo, the language switch and a menu button. The menu button opens a panel with the four tabs and the section links.

## Check
- Screenshots at 390, 749, 1280 and 1600px widths on /, /guide, /download and /pricing: nothing overlaps or wraps, the page doesn't scroll sideways, and the active tab is highlighted.

## Technical details
- `src/components/site/Navbar.tsx`: split into a main bar and a sub-bar (the sub-bar only renders when `section === "product"`), add `whitespace-nowrap` and `shrink-0`, and use a mobile Sheet (from the existing shadcn `sheet`) for widths below `sm`.
- `LanguageSwitcher.tsx`: add `whitespace-nowrap` to the buttons.
