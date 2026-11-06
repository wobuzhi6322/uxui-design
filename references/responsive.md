# Responsive and multi-device

"Keep everything that can be common, common; the clean desktop feel must survive on mobile". "It has to work at every pixel width, not at three device presets".

## 1. Frames and breakpoints
- Design frames: mobile 360 / 375 / 390×844; desktop 1440; max 1920. Smallest real viewport 320.
- Breakpoints come from where the layout squishes, not from device names; common ones observed: ~768 (tablet), ~960–1024 (3→4 columns), 1440.
- Decide responsive (fluid) vs adaptive (fixed steps) per area; both are valid — fluid for small screens where space is tight, adaptive where you need control. "AI generating a PC layout does not give you responsive for free".
- If PC and mobile structures diverge too much, build two optimized versions rather than one compromised layout.

```css
/* CSS mobile-first; design desktop-first is fine */
.cards{ display:grid; gap:16px; grid-template-columns:1fr; }
@media (min-width:768px){ .cards{ grid-template-columns:repeat(2,1fr); gap:20px; } }
@media (min-width:1024px){ .cards{ grid-template-columns:repeat(3,1fr); gap:24px; } }
@media (min-width:1440px){ .container{ --container:1200px; } }
```

## 2. The core move: columns → rows
- Desktop has width → columns; mobile has none → rows. Collapse columns, simplify, remove. 12 columns → 8/6 → 4 → 1.
- Designing desktop first and removing is easier than adding to mobile; but plan the mobile version alongside from the start — two frames side by side.
- Nested containers: group headline + copy + image in one element so you move one thing, not three.
- Mobile margins 16 / 20 / 24; rhythm and hierarchy stay identical to desktop.

```css
.hero{ display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:1024px){ .hero{ grid-template-columns:1.2fr 1fr; align-items:center; gap:48px; } }
.hero .copy{ order:1; } .hero .visual{ order:0; } @media (min-width:1024px){ .hero .visual{ order:1; } }
```

## 3. Fluid sizing
- Relative units (`rem`, `%`, `vw`, `fr`) instead of fixed pixels for widths and type.
- Fluid type with `clamp(min, preferred, max)`: `clamp(2.5rem, 5vw, 4.375rem)` for a hero; `clamp(1rem, 2vw, 1.125rem)` for body.
- Max/min widths govern measure and image sizes: text never 3000px wide; images never below ~200px.
- Grids without media queries: `repeat(auto-fit, minmax(260px, 1fr))`.
- Container queries for components that live in different column widths.

```css
.title{ font-size:clamp(1.5rem, 1rem + 2.5vw, 2.5rem); }
.prose{ max-width:min(100%, 65ch); }
.gallery{ display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%,220px),1fr)); gap:12px; }
@container card (min-width:420px){ .card{ grid-template-columns:160px 1fr; } }
```

## 4. Mobile UX
- Horizontal margins 16/20/24; bottom bars with `env(safe-area-inset-bottom)`.
- Touch targets generous and spaced; don't shrink buttons or hide items to fit. Primary CTA within thumb reach; text not tiny.
- Hamburger only when width forces it; keep 1–2 primary links visible; on tablet show full links.
- Top CTA scrolls away → fixed bottom CTA. Bottom tabs: key items at the edges.
- Image-first grids keep tight gaps on mobile so the mass reads.

```css
.bottom-cta{ position:sticky; bottom:0; padding:12px var(--page-x) calc(12px + env(safe-area-inset-bottom)); background:#fff; border-top:1px solid var(--line); }
@media (min-width:1024px){ .bottom-cta{ position:static; border:0; padding:0; } }
```

## 5. Verification routine for agents
1. Render at 320, 375, 390, 768, 1024, 1440, 1920 (DevTools device toolbar or Playwright `setViewportSize`).
2. Drag the width continuously 320→1920: nothing may overlap, overflow horizontally, or jump oddly.
3. Check 2–3-line titles and the longest strings at each width.
4. Confirm shared components (GNB, buttons, cards) are the same component at every width.
5. Run Lighthouse on mobile; treat ~60 performance as a defect.

```js
// Playwright sketch
for (const w of [320,375,768,1024,1440,1920]) { await page.setViewportSize({width:w,height:900}); await page.screenshot({path:`shot-${w}.png`, fullPage:true}); }
```

## Do / Don't
| Do | Don't |
|---|---|
| Breakpoints where the layout breaks | Breakpoints copied from device lists only |
| `clamp()` for type and spacing | Fixed 64px hero title on 320px |
| Collapse columns into rows | Shrink the desktop layout to 50% |
| Shared components at all widths | A different GNB for mobile |
| Safe-area padding on fixed bars | Bottom bar under the home indicator |

## Review template
- "Mobile margin is 12 → 16." · "Title wraps to 3 lines on 360 → 24 and 130% line-height."
- "The GNB differs on mobile → same component, collapsed."
- "Bottom bar sits under the home bar → add safe-area."
