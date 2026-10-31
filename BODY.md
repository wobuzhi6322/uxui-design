# Web UI Design Rules for Coding Agents

> Rules for building and reviewing web UI. Figma operations are translated into CSS/HTML so the rules can be applied directly to a website or web app.

---

## 0. How to read this file

- **Units.** Values are CSS px (1rem = 16px; divide by 16 for rem). Figma percent line-height becomes unitless (`140%` → `1.4`); percent letter-spacing becomes em (`-2.5%` → `-0.025em`).
- **Tags.** `[MUST]` always enforce; never trade away. `[DEFAULT]` use unless the project's own tokens say otherwise. `[CONTEXT]` depends on content type (commerce, dashboard, editorial...).
- **Work order** (same for building and reviewing): hierarchy → type → spacing → alignment/grouping → color reduction → components → states → responsive. Do not start with color or effects.
- **Mode.** Adjust, do not redesign. Keep the layout structure and components; fix `font-size`, `font-weight`, `line-height`, `color`, `margin/padding/gap`, borders, shadows and state styles first. Rebuild a layout only when the hierarchy cannot be fixed by tuning.
- **Tokens first.** Patch shared tokens/classes before page-level one-offs.

---

## 1. Doctrine

1. **Type is the job.** Handle type well first. Judge the balance of the whole text set (family + size + weight + line-height + tracking + color), not a single element. Changing only the font sizes and whitespace transforms a screen.
2. **Most problems are font size and whitespace.** The three fundamentals: type, whitespace, rhythm. Gradients, glass, shadows and color are not fundamentals; if the skeleton (type + spacing + hierarchy) is wrong, nothing on top looks good.
3. **Decide the eye path, then remove.** Name the single most important thing on the screen. Give it the one strong accent; make everything else quieter. Keep removing colors, lines, boxes and effects while the screen still works. Seeing a lot at once is never the same as readability.

Spine: **type → whitespace → alignment/grouping → fewer colors → hierarchy/eye path → states/usability.**

---

## 2. Design tokens (drop-in)

Replace `--brand-*` from the project brief. Everything else is the default set.

```css
:root {
  /* Type */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
               Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  --text-12: 12px;  /* floor: captions, dates, tags, footer legal */
  --text-14: 14px;  /* secondary body; minimum for must-read text on mobile */
  --text-16: 16px;  /* body */
  --text-18: 18px;  /* lead / small sub-title */
  --text-20: 20px;  /* sub-title, mobile page title */
  --text-24: 24px;  /* mobile title, desktop card/section sub-title */
  --text-28: 28px;  /* desktop section title, mobile hero */
  --text-32: 32px;
  --text-40: 40px;  /* desktop hero */
  --text-48: 48px;  /* desktop hero (semibold, line-height 1.2) */
  --leading-body: 1.4;
  --leading-title: 1.2;      /* 1.2–1.3 for titles and large numbers */
  --tracking: -0.025em;      /* Korean body default; use 0 for Latin-only labels or digits that look cramped */
  --tracking-title: -0.03em;
  --w-regular: 400; --w-medium: 500; --w-semibold: 600;  /* 700 only by exception */

  /* Text colors on white (contrast vs #FFF) */
  --text-primary:   #111111;  /* 18.9:1 titles, body */
  --text-secondary: #505050;  /* 8.1:1  body, descriptions */
  --text-tertiary:  #767676;  /* 4.54:1 captions, meta — lightest readable gray; only on pure white */
  --text-disabled:  #999999;  /* 2.85:1 disabled + placeholder only, never for content */
  --text-inverse:   #FFFFFF;

  /* Surfaces, lines */
  --bg: #FFFFFF;
  --bg-subtle: #F7F7F7;         /* project token; keep it light, never heavy */
  --line: #DBDBDB;              /* 1px, "there but not there"; never 0.5px */
  --line-hairline: rgba(17,17,17,.08);

  /* Radius (12 and pill most used; 8/16/20/24 common; 4 for small controls) */
  --radius-4: 4px; --radius-8: 8px; --radius-12: 12px; --radius-16: 16px;
  --radius-20: 20px; --radius-24: 24px; --radius-pill: 9999px;

  /* Shadows: 2–6% opacity, never above 10% */
  --shadow-hairline: 0 1px 3px rgba(0,0,0,.06);        /* border substitute */
  --shadow-card:     0 8px 16px rgba(0,0,0,.02);       /* "there but not there" */
  --shadow-float:    10px 10px 30px rgba(0,0,0,.06);   /* floating card / dashboard widget */

  /* Spacing — even numbers only */
  --sp-4: 4px; --sp-8: 8px; --sp-12: 12px; --sp-16: 16px; --sp-20: 20px; --sp-24: 24px;
  --sp-32: 32px; --sp-40: 40px; --sp-48: 48px; --sp-60: 60px; --sp-80: 80px; --sp-120: 120px;
  --gutter-mobile: 20px;        /* 16 / 20 / 24 */
  --gutter-tablet: 32px;
  --container: 1320px;          /* desktop content width, 12 columns */
  --grid-gap: 24px;             /* 20–24 */

  /* Controls — pick 2–3 heights and reuse them for buttons, inputs and selects site-wide */
  --control-40: 40px; --control-48: 48px; --control-56: 56px;
  --header-h: 72px;             /* 60–80; 88 is too tall */
  --icon-16: 16px; --icon-20: 20px; --icon-24: 24px; --icon-32: 32px;
  --icon-stroke: 1.5px;         /* one stroke width per screen: 1, 1.5 or 2 — never mixed */

  /* Motion */
  --dur-fast: 150ms;            /* 100–200ms state changes */
  --dur-slow: 600ms;            /* showcase transitions, ease-in-out */
  --ease: ease-in-out;
}
```

Tailwind `theme.extend` equivalent (abridged):

```js
fontFamily: { sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'] },
fontSize: { 12:'12px',14:'14px',16:'16px',18:'18px',20:'20px',24:'24px',28:'28px',32:'32px',40:'40px',48:'48px' },
lineHeight: { body:'1.4', title:'1.2' },
letterSpacing: { kr:'-0.025em', title:'-0.03em' },
colors: { ink:{900:'#111111',700:'#505050',500:'#767676',300:'#999999'}, line:'#DBDBDB' },
borderRadius: { 4:'4px',8:'8px',12:'12px',16:'16px',20:'20px',24:'24px' },
boxShadow: { hairline:'0 1px 3px rgba(0,0,0,.06)', card:'0 8px 16px rgba(0,0,0,.02)', float:'10px 10px 30px rgba(0,0,0,.06)' },
maxWidth: { container:'1320px' },
```

Pretendard web font:

```html
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
```

---

## 3. Typography

### 3.1 Family `[MUST]`
- One family per product. Default **Pretendard** (Korean + Latin). If a separate Latin font is used, state the rule once (e.g. "all Latin = Inter") and apply it everywhere — mixing Pretendard Latin on one line and another Latin font on the next is the most common font error.
- Buttons, inputs, nav, body: same family. No display/brand-heavy fonts inside UI (banner graphics excepted).
- Define a size scale and use only those sizes; many different sizes break visual consistency and make shared CSS impossible.

### 3.2 Scale by role `[DEFAULT]`

| Role | Mobile (360–390) | Desktop (≥1280) | Weight | Line-height | Tracking | Color |
|---|---|---|---|---|---|---|
| Hero / billboard title | 28–32 | 40–48 (56 max) | 600 | 1.2 | -0.03em | primary |
| Page / section title | 20–24 | 28–32 | 600 | 1.2–1.3 | -0.03em | primary |
| Card / block title | 16–18 | 18–20 | 500–600 | 1.3 | -0.025em | primary |
| Body | 14–16 | 16 | 400–500 | 1.4 | -0.025em | primary / secondary |
| Secondary body, description | 14 | 14–16 | 400 | 1.4 | -0.025em | secondary |
| Meta: date, caption, tag, category | 12–14 | 12–14 | 400–500 | 1.4 | -0.025em | tertiary |
| Button label | 14–16 | 14–16 | 500–600 | 1 | -0.025em | per button type |
| Key number / price | 20–40, thin (400–500) | 24–48, thin | 400–500 | 1.1–1.2 | 0 to -0.025em | primary |
| Footer legal | 12 | 12 | 400 | 1.4–1.5 | 0 | tertiary |

### 3.3 Size rules
- `[MUST]` **Nothing below 12px.** 10–11px is "speck text". Must-read information is ≥14px on mobile and 16px on desktop. Never shrink a font to make content fit — cut words, wrap to two lines, or re-group instead.
- `[MUST]` **Too big is also wrong.** Typical corrections: title 40 → 28 (mobile), 24 → 20, 18 → 16, 64 → 56 (desktop hero), button 64 → 56 tall. Over-sized logos, avatars and thumbnails are reduced the same way.
- **Shrink the big, grow the small** until the whole screen has even visual volume. A button label and the body text right above it should feel the same volume.
- **Emphasize with size, not weight.** Do not emphasize with weight alone; make the size clearly bigger. A two-step size jump (14 → 20) reads better than bold at the same size.
- **Numbers big and thin.** Prices and KPIs: 16 → 24 → 32 → 40 with weight 400–500; thin large digits look refined.

### 3.4 Weight
- Default regular (400) / medium (500). "Drop the bold" and "semibold → medium" are the most frequent weight corrections.
- Titles that look weak: medium → semibold (600), one step only. Bold (700) only when the brief demands it; bold everywhere makes the screen "loud".
- The same text level must use the same weight across the site (a title in bold on one page and semibold on another is a bug).

### 3.5 Line-height and tracking `[MUST]`
- Body: `line-height: 1.4; letter-spacing: -0.025em` regardless of size. Titles and large numbers: `1.2–1.3` and `-0.02em` to `-0.03em`. Two-line titles: 1.3.
- Too tight → widen to 1.4; 1.8 body is too loose.
- Same level, same values. `1.2/-3%` on one title and `1.3/-3.5%` on its sibling is a defect.

### 3.6 Text color and contrast
- Four tiers: `#111111` (titles, body) → `#505050` (body, descriptions) → `#767676` (meta) → `#999999` (disabled/placeholder only). Use tone, not weight, to lower importance.
- `[MUST]` **#999999 is never content.** It is the disabled color; do not use pigeon gray for text. Anything the user must read is ≥ 4.5:1; 3:1 is only for disabled states and large icons.
- `#767676` is 4.54:1 on `#FFFFFF` and drops to 4.24:1 on `#F7F7F7`. On any tinted background, step up to `#505050` or recompute.
- Black opacity tiers for hierarchy on white: 100% → 70% → 50%; readability floor ≈ 60%.
- Dark text at full opacity on dark backgrounds / white on white: check both themes; icons and checkmarks must survive both.
- Text over images: add a dim or gradient (10% minimum, ~30% typical, up to 60% when text must dominate) — see §8.8.

### 3.7 Copy and notation
- Write dates fully (`10월 16일`, not `10.16`); include AM/PM in times; show the sign on deltas (`+2,700 P`, `-10%`).
- One casing rule for Latin (all caps or sentence case), one rule for units (space or no space), applied everywhere.
- Delete filler words ("지금", "바로"); prefer the short label.
- Secondary actions as text links ("더 알아보기"), not boxed buttons.

---

## 4. Spacing and grouping

### 4.1 Whitespace is grouping, not padding
- Whitespace exists to show what belongs together and hide what doesn't. Fixing only the vertical rhythm often resolves a screen.
- If a screen looks "fragmented", check margins first.
- You can group with type hierarchy and whitespace alone; wrapping things in boxes is the lazy version.

### 4.2 Proximity rules `[MUST]`
- Related items touch, unrelated items separate. Discount badge sits beside the price; icon sits 4–8px from its label; a title sits closer to its own body than to the previous block.
- Same relationship, same distance everywhere (image→title gap identical across all cards).
- A gap inside a group is smaller than the gap between groups — always.

### 4.3 Too tight / too loose — typical corrections
- Tight: 8 → 12/16 ("12 is tight, go 16"), 12 → 16/20. Chips and buttons lacking vertical padding.
- Loose: mobile side margin 36–40 → 20/24 ("floats away"); 180% line-height → 140%.
- Dense screens: reduce icon and panel sizes, then recover whitespace; deliberately wrap to two lines if it buys breathing room.
- `[CONTEXT]` Image-heavy grids (galleries, commerce thumbnails) stay tight (8–12) so the mass reads as one block.

### 4.4 Inner padding
- Buttons: `12px 24px` (default), `16px 20px` (tall CTA), `8px 12px` (small/chip). Fat-looking button → reduce vertical to 12. A button must look compact, not stretched sideways.
- Chips/tags: at least 4–6px vertical; if a chip has to be large to be readable, use plain text instead.

### 4.5 Where each spacing value goes `[DEFAULT]`

| Value | Use |
|---|---|
| 4 / 6 / 8 | icon↔label, badge↔price, tightly bound pairs |
| 8 / 12 / 16 | gap between cards in a grid; title↔body inside a card (12) |
| 16 / 20 / 24 | mobile side margins (pick one per product; 20 most common); padding inside cards |
| 24 / 32 | between blocks in a list or form section |
| 32 / 40–48 | between sections on mobile (32 tight, 40–48 relaxed) |
| 60 / 80 / 120 | between sections on desktop (120 for editorial/marketing pages) |

### 4.6 Even numbers only `[MUST]`
Every size and distance — font size, padding, gap, icon, stroke, radius, element width/height — is an even integer. Odd values center on half pixels and render blurry (5px ÷ 2 = 2.5). Audit for odd numbers before shipping; fix by moving one pixel, not by changing the scale.

---

## 5. Layout, alignment, grid, responsive

### 5.1 Alignment `[MUST]`
- **Left-align by default.** Left alignment reads far better than centered for body, lists, cards and form labels.
- Center only with a reason: logo, a single hero title, login/sign-up screens, content inside circular icons, or to balance a centered block below.
- Never mix alignments inside one group. Elements that "collide" (tab row and button on the same baseline, triangular compositions) get moved, not nudged.
- Place by rules, not by feel; the layout must be understandable with the graphics removed.

### 5.2 Grid and canvas widths `[DEFAULT]`
- Desktop content width **1320px, 12 columns, gutter 20–24** — the closest thing to a perfect grid for current monitors. 1500+ is too wide (every font grows with it); 1200 is acceptable but narrow; dashboards may use 1280 full-bleed.
- Design canvas 1920 (most common monitor); **1280 is the minimum desktop** (1440 is not low-res; 1280 is). Tablet 800. Mobile 360 / 375 / 390 (×844).
- Two desktop versions when responsive: a max (1920) and a min (1280/1320) layout. Wider screens widen the margins only.
- Left-align content to the grid; column counts of 2/3/4/6 should land on grid lines.

```css
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter-mobile); }
@media (min-width: 800px)  { .container { padding-inline: var(--gutter-tablet); } }
@media (min-width: 1368px) { .container { padding-inline: 0; } }   /* 1320 + 2×24 */
.grid-12 { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--grid-gap); }
```

### 5.3 First fold `[CONTEXT]`
- At 1920×1080 the hero/billboard is about 1080 tall at most; taller pushes everything below the fold.
- Dashboards: check what is visible within 1080 of height — 1080 is narrower than you think. Shrink oversized titles and gaps so the key widgets are in view.

### 5.4 Rhythm `[MUST]`
- Pages need strong–weak–medium–strong rhythm. Every section at the same intensity is monotonous; cards all the same size are "so-so".
- Size contrast creates dynamics even with the same aspect ratio (one big card + small cards).
- Put one "point corner" per page: a section with a different background, a full-bleed image, or an oversized number.
- `[CONTEXT]` Commerce (especially female-target) avoids an endless uniform grid; interleave curated/editorial blocks.

### 5.5 Consistency
- One header/GNB, one footer, one button set, one card — identical on every page. Common means identical, not similar. Same function, same control everywhere.
- Consistency is not sameness: change a section background to mark emphasis, keep the components.

### 5.6 Images and content cases
- Fix one aspect ratio per image role (thumbnail 1:1, card 4:3 or 16:9) and crop with `object-fit: cover`. 438×400 "almost square" is wrong — make it square.
- Design and test the 2-line and 3-line text cases and the longest realistic string (names, titles, prices). Truncate deliberately (`-webkit-line-clamp`) or allow wrap; never let a layout depend on short sample text.

### 5.7 Responsive
- Keep as much as possible common across breakpoints; the clean desktop feel must survive on mobile.
- Decide breakpoints and whether each component reflows (responsive) or swaps (adaptive). Generating the desktop version does not give you a responsive version — the mobile layout is designed.
- On mobile the sticky bottom CTA ("total price + pay") is preferred when the desktop puts it in a side panel.
- If desktop and mobile structures diverge too much, build two optimized layouts rather than one compromise.

---

## 6. Color

### 6.1 Reduce `[MUST]`
- Remove one or two colors and the screen already looks better. Color spreads attention; fewer colors = clearer hierarchy.
- Header/GNB: remove the frame color and gray background; black or white reads more refined.
- Screens that are already colorful (charts, product photos) keep everything else neutral — no colored backgrounds, strokes or buttons around them.
- Too saturated looks crude ("the green is jumping"): lower saturation/lightness.

### 6.2 Palette structure
- Brand 1 (+ sub 1–2 derived from it) + point 1. Point color only works when it is used **once** per screen on the goal action; used everywhere it stops being a point.
- Color is distributed by importance ("the buy button matters, so the color goes there"), not by preference.
- If two colors are used without a stated rule ("why is blue here and there?"), remove one.
- Brand color is non-negotiable even if unattractive, but badges/labels in brand color should not multiply.

### 6.3 Meaning `[MUST]`
- Red = error/warning. A red "Forgot password?" link looks like an error already happened — make it neutral text. Reconsider red delete buttons unless the guide defines them.
- Yellow = caution, green = confirmed/safe/eco, blue = calm. The site mood is set by color.
- **Gray fills read as disabled.** A gray button looks inactive; a gray box the same shape as a button looks like a button. Use white + 1px line, or brand, or text.

### 6.4 Opacity and contrast
- Measured, not felt: text ≥ 4.5:1 (see §3.6); disabled 3:1.
- White on white / black on black: add a hairline stroke or 2–6% shadow for the edge; or raise the element opacity decisively.
- Same-colored items that must be distinguished get a shape (dot, icon), not another color.

### 6.5 Dark mode, gradients, glass
- Logos/symbols in brand / white / black variants; check icons and checkmarks on both themes.
- Shadow color: tint toward the background hue instead of pure black.
- Gradients need a purpose; otherwise remove. If used: one direction (diagonal), subtle (2–10% difference), never stacked with glass and shadow.
- Glass (`backdrop-filter`) only for one key element; no glass-inside-glass; fill with an opaque tinted color rather than translucent white when legibility matters.
- Always color-correct images (saturation, contrast) to the site tone.

---

## 7. Hierarchy and eye path

### 7.1 Three levels `[MUST]`
Level 1 = page/section title, level 2 = sub-title, level 3 = body/meta. Apply the same three levels across the whole product. If counts, statuses and labels are all the same size, the hierarchy is missing.

### 7.2 Tools, in order
Size → tone (color/opacity) → weight. Use size for the main jump, color to lower importance, weight last and only one step. Opacity tiers must be discrete (100/70/50), not arbitrary.

### 7.3 Emphasize the goal action, mute the rest
- Give power to what the user should do next (the next plan, the points to use now, the buy button). Rarely used functions (change address, settings) are quiet.
- Avatars, logos and thumbnails larger than the information are reduced. Ask: is the profile that important?
- Stop trying to add force to the design. Clean ordering beats added effects. When a hierarchy exists but is timid, make the contrast bolder.

### 7.4 Eye path
- Order elements the way the user reads: product → options → total; chart/KPI before its description; primary tab/action where users expect it.
- Price math must be readable as a story: list price → discount → **final total (largest)**; total and discount are one group.
- On image overlays, keep text away from the subject so both stay visible.
- Login and similar utility screens: convey information plainly; visual flourish is noise there.

### 7.5 Button hierarchy
Primary = filled brand/black; secondary = 1px line or light gray background; tertiary = text. Forward is dark, back is light. Two filled black buttons side by side collide — demote one.

---

## 8. Components

### 8.1 Header / GNB
- Height 60–80 (88 → "70s"). No gray frame fill; logo not oversized (mobile logo ~24 tall). One GNB reused on every page.
- Menu items 14–16, medium; hover area is the padding, not a visual box (see §9.2).

### 8.2 Buttons
- Heights: 40 (small/tab), 48 (default), 56 (mobile primary CTA); 60–64 is too tall. Use the same 2–3 heights for inputs and selects.
- Padding `12px 24px` / `16px 20px` / `8px 12px`. Radius 8–12, or pill (9999) for chips and some CTAs. Label 14–16, weight 500–600.
- Icon slot on left and right; variants: filled / outline / text; shapes: round / square / circle. Define all states (§9.1).
- Merge sibling actions into one when possible (text + single button). Reconsider every button shadow.

### 8.3 Inputs and selects
- Height 40 or 48 (site-wide 2–3 sizes, shared with buttons). 1px line `#DBDBDB`, radius 4–12. Placeholder `#999999`; typed text `#111111`.
- Active/focus state uses the brand color on the border (clear 1–2px), not a gray glow. Password fields get a show/hide icon (24px).
- Sign-up requires id, password, **password confirm**, and a guest path when applicable.

### 8.4 Cards and boxes `[MUST]`
- No box inside a box: the card already frames its content — do not frame it again. Card inside card, gray panel inside card, nested borders are flattened.
- Cards are for grouping; if the grouping works with whitespace alone, lay content directly on the page background ("spread on the floor").
- Card radius 12–24, padding 16–24 (mobile) / 24–32 (desktop); gap between cards 8/12/16.
- Cards should not be pre-elevated; elevate on hover if at all.

### 8.5 Dividers and lines `[MUST]`
- The line can probably go — this is the single most frequent correction. Remove dividers between list items when spacing already separates them.
- If kept: 1px, light (`#DBDBDB` or 8% black), never 0.5px, never darker than the text it separates. Table rules must not dominate the content.
- Dashboards: prefer a 2–3% shadow to a visible stroke for panel edges.

### 8.6 Chips, tags, tabs
- Small and quiet: 12–14px label, 4–8px vertical padding, pill or 4–8 radius. Large chips look messy — use plain text or a text tab with an underline indicator.
- Selected tab: `#111111` + 2px underline or filled dark pill; unselected: `#767676`.

### 8.7 Icons `[MUST]`
- One style per product: all line or all filled. One stroke width per screen (1 / 1.5 / 2) — mixed 1 and 1.5 is a defect. Icons that grow must thicken proportionally.
- Sizes 16 / 20 / 24 (most used 20 and 24); search icon 20–24; large play/action 56–64; decorative illustrations are a separate system.
- Meaning must be instant: use universal metaphors (star for rating, magnifier for search, folder vs camera distinct). Distorted circles and off-pixel icons are redrawn. Do not attempt the hard icon; get the basic one right.

### 8.8 Images and thumbnails
- Changing only the images changes the perceived quality completely. Editorial, fashion and commerce depend on image performance.
- Balance: mix quiet images between strong ones; replace images full of primary colors; tone all images to the site mood.
- Text on image: bottom-to-top gradient or flat dim — 10% minimum, 30% typical, up to 60% when text must win: `background: linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 60%)`.
- Thumbnail smaller than its title in importance → shrink it; if the image is the hero, go big and remove the background box.
- Product mockups: generous margin, product centered and in focus.

### 8.9 Shadows and effects
- Shadows are a touch, not a feature: 2–6% opacity, never > 10%; a 24% drop shadow is removed or cut to 6%.
- Inner shadows for depth need at least two (light face + dark face); never a single generic inner shadow.
- Background blur only with a purpose; without a criterion it just feels stuffy.
- Strong effects erase the structure you built. If an effect is strong enough to notice, it is too strong.

### 8.10 Footer
- Realistic footers are dense (categories, policies, company info); legal text 12px tertiary — small is acceptable here but not below 12.
- Do not let the footer's dark block make the whole site feel heavy; drop extra boxes inside it.

### 8.11 Mobile bottom dock
- Each dock icon is an independent tap target; spacing must prevent mis-taps. Reserve a safe area: `padding-bottom: env(safe-area-inset-bottom)`.
- Sticky bottom CTA appears when the top CTA scrolls away.

### 8.12 Popups, toasts, alerts
- Confirm/cancel decisions → modal alert. Instant feedback ("added to cart") → toast, no action required.
- Immediate visual feedback on the key button; the direction of modern UI is simpler screens and fewer visible buttons.

---

## 9. States, interaction, completeness

### 9.1 State set `[MUST]`
Every control defines: default, hover, focus, pressed, disabled, plus loading and done/selected where applicable. Name them like the component (`default / hover / focus / pressed / disabled`). Checkbox and radio need checked and unchecked; verify on light and dark surfaces.

```css
.btn { background: var(--brand); color: #fff; transition: background var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease); }
.btn:hover            { background: color-mix(in srgb, var(--brand) 88%, #fff); }   /* slightly lighter */
.btn:focus-visible    { outline: 2px solid var(--brand); outline-offset: 2px; }
.btn:active           { background: color-mix(in srgb, var(--brand) 88%, #000); }   /* slightly darker */
.btn:disabled, .btn[aria-disabled="true"] { background: #DBDBDB; color: var(--text-disabled); cursor: not-allowed; }
.btn[data-loading="true"] { pointer-events: none; opacity: .7; }
```

### 9.2 Hover and click
- Desktop always gets hover states; an item should lift/brighten on hover rather than sit pre-elevated.
- Hover/touch area = padding around the content; when a nav item needs an extended hover region, extend the padding and pull back with negative margin so the text stays aligned to the grid.
- Information users compare (plans, categories with content) opens on **click** and stays open so several can be compared; hover menus close on the slightest exit.
- Icon buttons reserve their pressed area (≥ control height) even when the glyph is 20–24px.

### 9.3 Touch and usability
- Do not shrink buttons to fit or hide items in overflow menus to clean up; if it is not there, it cannot be used.
- Use absolute spacing between tap targets with touch in mind; dock icons and list rows use the control heights (40/48/56) as tap heights (the 44px platform minimum is a separate HIG value).
- Use the flow yourself: tap every path. Chat without attach, select-list without a max count, avatar without a profile popup, order without a guest path — these are missing features, not styling issues.
- Never add a step where one click would do.

### 9.4 Motion
- State changes 100–200ms; showcase/slide transitions 600ms `ease-in-out`; slow reveals up to 1s. Motion is a detail layer, never a substitute for hierarchy.

### 9.5 Completeness check before styling
Profile → profile popup; selection → max count shown; forms → confirm field + error text + success state; lists → empty state; async → loading + toast; destructive → confirm modal; long names → 2-line case handled.

---

## 10. Figma → CSS translation

| Figma concept | Web implementation |
|---|---|
| Auto Layout (direction, item spacing) | `display: flex; flex-direction; gap` |
| Auto Layout padding | `padding` |
| Hug contents / Fill container / Fixed | `width: fit-content` / `flex: 1 1 0` or `width: 100%` / fixed px |
| Constraints (left+right, top+bottom, scale) | fluid width with fixed margins; anchored `position`; `clamp()` |
| Frame with max width | `max-width: 1320px; margin-inline: auto` |
| Layout grid 12 col, gutter 20–24 | `display: grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap: 24px` |
| Component set / variants (default, hover, pressed, disabled) | one class + `:hover` `:focus-visible` `:active` `:disabled` / `aria-*` attributes |
| Component properties (icon left/right, label) | component props / slots |
| Text style: size, weight, line-height %, letter-spacing % | `font-size`, `font-weight`, unitless `line-height` (= %/100), `letter-spacing` in em (= %/100) |
| Fill opacity / layer opacity 100→70→50 | `rgba()` or `color-mix()` for fills; `opacity` for whole elements |
| Stroke 1px inside | `border: 1px solid` or `box-shadow: inset 0 0 0 1px` (outside: `outline`) |
| Corner radius 12 / 100 | `border-radius: 12px` / `9999px` |
| Drop shadow x y blur spread color opacity | `box-shadow: x y blur spread rgba(0,0,0,.0X)` |
| Inner shadow | `box-shadow: inset x y blur color` |
| Background blur (glass) | `backdrop-filter: blur(Npx)` + semi-opaque background |
| Layer blur | `filter: blur(Npx)` |
| Gradient fill, dim over image | `linear-gradient()`; `::after { background: rgba(0,0,0,.3) }` |
| Image in frame, crop | `object-fit: cover; aspect-ratio: 1 / 1` |
| Smart Animate, ease in and out, 300–600ms | `transition: property 300ms ease-in-out` |
| Prototype hover → variant | `:hover` rule on the same element |
| Status bar / home indicator | `padding-top/bottom: env(safe-area-inset-*)` |
| Text truncation | `text-overflow: ellipsis; -webkit-line-clamp: 2` |
| Color / text styles, spacing variables | CSS custom properties (§2) |

---

## 11. Most frequent corrections → patch

| Observed | Verdict | Patch |
|---|---|---|
| Body 12px, meta 10–11px | 12 is small. 14, medium. | `font-size:14px; font-weight:500` (meta 12 minimum) |
| Mobile title 40, card title 24 | 40 is too big → 28, 24 is big → 20 | reduce one or two scale steps |
| Bold on body, semibold on labels | Drop the bold, regular is enough | `font-weight:400/500`; titles 600 |
| Title emphasized by weight only | Make the size clearly bigger | +2 scale steps, keep weight ≤600 |
| Line-height 1.2 on body / 1.8 on body | Too tight — widen / 1.8 too loose | `line-height:1.4` |
| Different tracking/leading on same level | Unify | same `line-height`/`letter-spacing` token |
| Two font families / Latin font mixed | Set the rule once and follow it | one `--font-sans`; one Latin rule |
| Body text `#999999` or lighter | 999 is disabled color | `#505050` (body) / `#767676` (meta on white) |
| Gap 8–12 between cards/text blocks | 12 is tight → 16 | `gap:16px` |
| Mobile side margin 36–40 | Way too wide | `padding-inline:20px` (16/24) |
| Chip/button without vertical padding | No vertical margin at all | `padding:8px 12px` / `12px 24px` |
| Dividers between every item | The line can go | remove; rely on spacing; else 1px `#DBDBDB` |
| 0.5px lines, 1 and 1.5px icons mixed | Pick one | 1px lines; one icon stroke width |
| Colored header frame, gray header bg | Pull the color out — black/white | `background:#fff` or `#111`, no fill |
| Point color on 5 elements | Point color only once | brand/point on the single goal action |
| Red text link | Looks like an error | `color: var(--text-secondary)` |
| Gray filled secondary button | Looks disabled | white + 1px line, or text button |
| Two black filled buttons side by side | Black on black collide | one primary, one outline |
| Card inside card / gray panel inside card | Don't frame it twice | flatten; remove inner background and border |
| Drop shadow 20–25% | Too heavy | `rgba(0,0,0,.02–.06)` or remove |
| Centered body text / mixed alignment | Left-align | `text-align:left`; one alignment per group |
| Thumbnails 438×400 / varying ratios | Make it square; unify ratios | `aspect-ratio:1/1; object-fit:cover` |
| Header 88px tall | 70s | `height:72px` |
| Button 64px tall | Cut it down | `height:56px` |
| Odd spacing (15, 23, 9) | Everything even | nearest even value |
| Price, discount, total same size | What minus what equals what must be visible | total largest; discount adjacent to price |
| Profile/logo/thumbnail oversized | Is the profile that important? | reduce; title first |
| Text over busy image | Muddy | dim 10–30% or move text off the subject |
| Gradient / glass without purpose | Strip it | remove; keep one subtle effect max |
| Hover state missing on desktop | Add hover; lift on hover, not by default | `:hover` lift; no default elevation |
| Compare-type info on hover | Click so several can stay open | click-to-toggle, multiple open |
| Font shrunk to fit | Never shrink must-read text | wrap/shorten/regroup; keep ≥14 |

---

## 12. Review protocol

1. Write one line: the single most important information or action on this screen.
2. Audit in the work order (§0). Collect findings as `[Area] problem → user impact → patch with values`.
3. Patch shared tokens/classes first (§2), then components, then page one-offs.
4. Re-check states (`:hover :focus-visible :active :disabled`, loading, toast), 2/3-line text cases, touch areas, safe area, and the 1280 / 390 breakpoints.
5. Final pass: "What else can be removed?" Remove it; if the screen still works, keep it removed.

Finding format (one line each):

```
[Type]  body 12px #999 → unreadable on mobile, 2.85:1 → .card__desc { font-size:14px; color:#505050 }
[Space] card gap 8px, side margin 36px → fragmented and floating → .grid { gap:16px } .page { padding-inline:20px }
[Color] blue used on 3 unrelated labels → no point of emphasis → keep brand on .btn-primary only; labels → #505050
[Comp]  dividers + 24% shadow on every card → heavy, boxes inside boxes → remove borders; box-shadow: 0 8px 16px rgba(0,0,0,.02)
[State] no hover/focus on nav links → desktop feels dead, a11y fails → .nav a:hover{color:#111} :focus-visible{outline:2px solid var(--brand)}
```

Tone when reporting to humans: short and decisive — "too strong", "too small", "remove it", "push the contrast", "keep it clean".

---

## 13. Checklist (in order)

**0 Purpose**
- [ ] One most-important information/action named.

**1 Type**
- [ ] One family (Pretendard default); one Latin rule; buttons/inputs same family.
- [ ] Nothing < 12px; must-read ≥ 14 mobile / 16 desktop; nothing shrunk to fit.
- [ ] No oversized titles/logos/avatars; only scale sizes used.
- [ ] Weights 400/500/600; bold by exception; same level = same weight.
- [ ] Body 1.4 / -0.025em; titles 1.2–1.3 / -0.03em; same level = same values.
- [ ] Colors from the four tiers; `#999` not on content; all text ≥ 4.5:1 on its actual background.
- [ ] Dates, units, signs, casing correct; filler removed.

**2 Space**
- [ ] Side margin one of 16/20/24 (mobile), consistent; desktop content ≤ 1320.
- [ ] Related items touch (badge↔price, icon↔label 4–8); groups separated more than their contents.
- [ ] Chips/buttons have vertical padding; buttons compact not stretched.
- [ ] No cramped or floating zones; all values even.

**3 Layout**
- [ ] Left-aligned by default; every centered block has a reason.
- [ ] On the 12-column grid; image ratios unified; 2/3-line and longest-string cases handled.
- [ ] Shared header/footer/buttons identical everywhere.
- [ ] Rhythm: strong–weak sections, one point corner; first fold checked at 1080.

**4 Color**
- [ ] Brand 1 + sub 1–2 + point 1; at least one color removed when in doubt.
- [ ] Point color used once, on the goal action.
- [ ] No red that reads as error, no gray that reads as disabled.
- [ ] No purposeless gradient, glass or background fill.

**5 Hierarchy**
- [ ] Three clear levels; size before color before weight.
- [ ] Goal action strongest; rare functions quiet; totals largest in price math.
- [ ] Reading order matches user task order.

**6 Components**
- [ ] Icons one style, one stroke width, 16/20/24; meaning instant.
- [ ] No box-in-box, no unnecessary lines; lines 1px light; shadows 2–6%.
- [ ] Images toned and balanced; text over images legible (dim 10–30%).
- [ ] 2–3 control heights shared by buttons/inputs/selects; header 60–80.

**7 States and UX**
- [ ] default/hover/focus/pressed/disabled/loading defined; checked/unchecked; both themes.
- [ ] Flow complete: attach, confirm field, popup, max count, empty/error/loading, guest path.
- [ ] Tap targets and safe area; no extra steps; desktop hover present.
- [ ] 1280 and 390 breakpoints verified; common parts unchanged.

**8 Finish**
- [ ] One more removal pass done.
- [ ] Findings in `problem → impact → patch` form; tokens fixed before one-offs.

---

## 14. Scope notes

In scope: web/app UI rules that map to HTML/CSS/JS. Out of scope: Photoshop/Illustrator technique, portfolio and career advice, AI-tool reviews, and Figma-specific operation (plugins, prototyping clicks) — they do not change what a coding agent writes. Where no fixed number is given (e.g. light gray surface hex), the token is a project value, not a rule.
