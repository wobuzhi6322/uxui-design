# Spacing, grouping, alignment, layout

"Whitespace isn't just distance: it shows what to show, hides what to hide, and defines groups".
"If it looks fragmented, check margins first". "Start with too much space and work back".

## 1. Spacing scale
- Unit scale: **4 / 8 / 12 / 16 / 20 / 24 / 32**; between blocks 32–40; between large sections 60–120.
- Use a 4-point system (every gap divisible by 4). An 8-point grid covers spacing, radii, and type.
- Mobile horizontal margin: **16 / 20 / 24** solves almost everything (360/375 frames). Desktop 12-col grid at 1440: margin 32–40, gutter 16–20; mobile 4-col: margin 16, gutter 8.
- Text/content column max-width ≈ 600px; page container ≈ 1200–1440.

```css
:root{ --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px; --sp-10:40px; --sp-15:60px; --sp-20:80px;
       --page-x: clamp(16px, 4vw, 24px); --container: 1200px; --measure: 600px; }
.container{ width:min(100% - 2*var(--page-x), var(--container)); margin-inline:auto; }
.stack > * + *{ margin-block-start: var(--sp-4); }   /* vertical rhythm without per-element margins */
```

## 2. Grouping (proximity)
- Related things touch, different groups separate: discount price must sit with the price; icon↔label 4–8px.
- Inner gap must be smaller than the container's padding: 16px padding → 8 (or 4) inside; 16 inside 16 "feels off".
- Minimum ~6px between adjacent elements or they merge visually; tappable items 12–42px apart depending on size.
- Grouping without cards: font hierarchy + whitespace alone can form groups; wrap in a box only when needed. Cards' value *is* grouping — splitting inside a card kills it.
- Inconsistent image↔text gaps across items → unify to one token.

```css
.card{ padding:var(--sp-4); display:grid; gap:var(--sp-2); }      /* inner 8 < padding 16 */
.meta{ display:flex; align-items:center; gap:var(--sp-1); }        /* icon ↔ text 4–8 */
.section + .section{ margin-block-start: clamp(40px, 8vw, 80px); }
```

## 3. Too tight / too loose (typical corrections)
| Symptom | Fix |
|---|---|
| "12 is tight" | 16 |
| "too close" | 20 |
| "8 glued" | ≥ 12 |
| "floating, too much air" | reduce; side margin 36 → 24 |
| chips/buttons with no vertical padding | add; button that looks "fat" → vertical padding 12 |
| screen feels stuffed | shrink icons/containers, allow 2-line text to regain air |
| image-first grids (gallery, commerce thumbnails) | keep tight gaps so the mass reads as one block |

- "Roomy + emphasized beats dense: when dense, the user doesn't know where to look".
- Buttons should feel compact ("clustered"), not spread sideways; padding examples 24×12, 20×16, 12×8; comfortable padding also enlarges the tap target.

## 4. Alignment
- Left-align is the default; it "looks far better than center". Center only with a reason: logo, single title, login/empty screens, content inside circles, balancing a bottom corner.
- Never mix left-aligned and center-aligned siblings in the same column/row. In two-column heroes, left-align or justify the text column — centered text in a column almost never works.
- One primary axis: most type hangs off a single vertical (or horizontal) edge. "Don't place by feel".
- Elements "colliding" (tab and button on the same line, triangular tension) → move or re-align.
- Labels, inputs and headings start on the same column edge; indentation drift is amateur.
- C.R.A.P.: Contrast, Repetition, Alignment, Proximity — the four checks for any layout.

```css
.hero{ display:grid; grid-template-columns: 1fr 1fr; align-items:center; gap:var(--sp-10); }
.hero .copy{ text-align:left; }               /* not center inside a column */
.form .field{ display:grid; gap:var(--sp-2); } /* label above input, one column edge */
```

## 5. Grid and ratio
- "Fit the grid and it is already tidy"; dynamic layouts still need visible regularity. 12 columns on desktop → 8/6 → 4 → 1–2 on mobile.
- Flex `space-between` / grid `1fr` often replace a strict grid for app layouts (e.g. 275 / 600 / 350 px sidebar–content–aside). Pixel-perfect grid alignment is achieved in CSS, not in the mockup.
- Unify image aspect ratios first (`aspect-ratio` + `object-fit: cover`); cropping cuts subjects. Don't let photos cut off a person's arm — enlarge/align to the edge.
- Verify 2-line and 3-line text and the longest names before shipping.

```css
.grid-12{ display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); column-gap:20px; }
.cards{ display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:var(--sp-6); } /* no media queries */
.thumb{ aspect-ratio: 4/3; object-fit: cover; width:100%; }
```

## 6. Rhythm and consistency
- Layout rhythm: strong – weak – medium – strong – weak; every corner at the same intensity is monotonous. Add one "point corner" per page.
- Size contrast across items: "similar-ish sizes everywhere is wrong". Rule-of-thirds split (2/3 : 1/3) beats 50/50 for image/content.
- Common elements (GNB, footer, buttons, cards) are identical on every page; "consistency ≠ sameness": vary only the emphasized section's background.
- Rows vs columns is the whole responsive story: columns on desktop collapse into rows on mobile (see responsive.md).
- Boxy layouts: remove unnecessary background fills, strokes, and photo containers; let imagery and type breathe.

## 7. Frames
- Mobile 360 / 375 / 390×844; desktop 1440; max breakpoint 1920. Smallest to support: 320.
- GNB height ~70px (88 is tall); bottom dock needs a safe area.

## Do / Don't
| Do | Don't |
|---|---|
| 4/8-based tokens everywhere | 13px, 17px, 23px gaps |
| Related 4–8, groups 24–40 apart | even spacing between everything |
| Left edge as the axis | centered text next to left-aligned text |
| Inner gap < container padding | 16 inside 16 |
| One point corner, varied section weights | identical card grid down the whole page |
| Unified image ratios | mixed 4:3 / 1:1 / 16:9 thumbnails in one list |

## Review template
- "This looks chopped up → fix the top/bottom margins first; 24 between blocks, 8 inside."
- "Side margin 36 is wide → 24." · "Chips have no vertical padding → 6/12."
- "Center alignment has no reason here → left align everything."
- "Same button, different look on page 3 → use the shared class."
