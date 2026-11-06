---
name: uxuidesign
description: >-
  Review, critique, or patch web UI implemented in HTML/CSS/JS/TS (any framework).
  Trigger when the user asks to review, audit,
  polish, "make it look professional/clean", fix typography, spacing, alignment,
  color, contrast, hierarchy, buttons/cards/forms/nav, hover/focus/disabled
  states, responsive breakpoints, motion, UI copy, or to set up design tokens /
  a style guide; also when generating new UI that must look production-quality.
  Not for Figma/Sketch files, logo or brand identity work.
---
# Web UI quality — agent runtime

Scope: screens already in code (HTML/CSS/JS/TS, React/Vue/Svelte, Tailwind, CSS-in-JS)
or UI you are about to write. Output is concrete CSS/JS/markup changes, not prose.

## How to apply these rules
- Do not invent rules. If a case is not covered, say so and fall back to:
  **type → space → align/group → fewer colors → hierarchy → states/usability**, and *subtract first*.

## Review workflow (run in this order)
1. **Gather**: screenshot or render at 375 and 1440 wide; read the relevant CSS/tokens and the DOM
   of the component. In a browser, use DevTools to read computed `font-size`, `line-height`,
   `margin`/`padding` (orange/green overlays) instead of guessing.
2. **State the one primary info/action** on the screen in one line. If you cannot, that is finding #1.
3. **Audit in order** — stop at each layer and list findings before moving on:
   type → spacing/grouping → alignment/grid → color count/contrast → hierarchy/gaze path →
   components/icons/images → states/usability/forms → responsive → motion → copy.
   Per layer, open the matching file in `references/`.
4. **Subtract before adding**: remove lines, boxes-in-boxes, gradients, glass, heavy shadows,
   extra colors, extra weights, extra words. Then adjust size/space/tone. Redesign layout last.
5. **Patch order**: tokens/CSS variables → shared component classes → page one-offs.
   Never fork a shared component for one page (GNB/buttons/cards must be identical everywhere).
6. **Verify**: `:hover` `:focus-visible` `:active` `:disabled` + loading/empty/error states; keyboard
   Tab order and visible focus; contrast ≥ 4.5:1 on text; 2–3-line text wrapping; 320/375/768/1024/1440;
   `env(safe-area-inset-bottom)` on fixed bottom bars. Run `scripts/ui-lint.mjs` on changed CSS/HTML.
7. **Report** each finding as: `problem → why (user impact) → change (selector + values)`.
   Tone: short and decisive ("12 is small → 14, weight 500"; "line not needed → remove").

## Numbers to apply by default (project tokens override; keep ratios)
| Area | Default |
|---|---|
| Font family | one family (Pretendard for KR; Latin-only: Inter / DM Sans / Work Sans class, x-height ~68–72%) |
| Size scale | 12 / 14 / 16 / 20 / 24 / 28 (+32–48 display). Min 12. Body 14–16. Captions/tags 12–14. Marketing long-form body may be 18 |
| Line-height / tracking | body 1.4 / -0.025em; titles 1.2–1.3 / -0.02 to -0.03em; long paragraphs 1.5. Never positive tracking on paragraphs |
| Weight | body 400–500, titles 600; 700 only as deliberate exception |
| Text colors | #111111 / #505050 / #767676; #999999 = disabled only (never body). Contrast ≥ 4.5:1 |
| Spacing | 4 / 8 / 12 / 16 / 20 / 24 / 32; blocks 32–40; sections 60–120; icon↔text 4–8; mobile side margin 16 / 20 / 24 |
| Inner < outer | gap inside a container must be smaller than its padding (16 padding → ≤ 8 inside) |
| Buttons | height 40–60 (44/48/52/56 common); padding 24×12 or 20×16; radius 4/8/12/16 or 9999 (pill) |
| Lines & shadows | border 1px light (#E5E5E5–#DBDBDB), never 0.5px; shadow alpha 2–3% (max 10%), never on text |
| Icons | 16 / 20 / 24; one style (line *or* filled) and one stroke width per screen |
| Color budget | brand 1 + sub 1–2 + neutrals; accent appears once per view; ~60/30/10 neutral/brand/accent |
| Frames | 360 / 375 / 390 mobile (320 minimum), 1440 desktop, 1920 max; GNB height ~70, not 88 |
| Motion | UI transitions 150–400ms; 500ms+ feels sluggish; prefer ease-out/cubic-bezier over linear |

## Decision rules
- Too small vs too big: *shrink the big, grow the small* until the whole screen has even volume.
- Need emphasis? Use **size first, then tone (color/opacity), then weight**. Do not bold everything.
- Looks fragmented? Check margins first, then grouping, then alignment — before touching color.
- Too many colors? Remove one or two; keep the accent for the primary CTA only. Gray boxes/buttons read as disabled; red reads as error.
- Gray card on a colored background or colored card on gray never works — use white or the same hue tinted.
- Card inside card, box inside box, line between everything → remove the inner container/line.
- Center-align only with a reason (logo, single title, login, circular element). Never mix left- and center-aligned siblings.
- Text on photos: 10–20% gradient dim, or dark backdrop + reduced image opacity / background blur.
- Multiple equally strong black buttons clash → one primary filled, others outline/gray/text.
- Forms: single column, label above field, visible field border, distinct focus style, specific inline error copy.
- Icon-only control? Add a label or `aria-label`; never rely on the icon alone.
- Hamburger only where the width forces it; primary destinations stay visible.
- Missing a state (empty, loading, error, first-time) → that is a bug, not polish.
- Body text size for apps is 14–16; 18 is allowed only for marketing long-form.
- Keep color and weight minimal: size, then tone, then weight. Do not add weight, underline, and background together.

## Checklist (minimum pass before you say "done")
- [ ] One primary info/action is obvious in 5 seconds
- [ ] One font family; sizes only from the scale; nothing under 12px; body ≥ 14
- [ ] Same-level text shares size/weight/line-height/color; titles not oversized for the frame
- [ ] Spacing values from the scale; related items tight, groups separated; inner gap < container padding
- [ ] Left-aligned by default; grid/column edges consistent; image ratios unified; 2–3-line copy tested
- [ ] ≤ 3 chromatic colors; accent once; no purposeless gradient/glass/blur; text contrast ≥ 4.5:1
- [ ] No box-in-box, no needless lines, shadows ≤ 10% alpha, borders 1px light
- [ ] Buttons/inputs have hover, focus-visible, active, disabled, loading; nav shows active page
- [ ] Forms: labels, visible borders, inline errors with fix instructions, one primary CTA
- [ ] Touch targets ≥ 40px tall with spacing between them; bottom bars respect safe-area
- [ ] Works at 320–1920 with shared components unchanged; `prefers-reduced-motion` respected
- [ ] Copy: accurate dates/units/case, no filler words, button text says the action
- [ ] One more pass: "what else can be removed?"

## Reference map (open only what the current layer needs)
| Layer | File |
|---|---|
| Fonts, sizes, line-height, tracking, measure, text color | `references/typography.md` |
| Spacing scale, margins, grid, alignment, rhythm, grouping | `references/spacing-layout.md` |
| Palette budget, contrast, dark mode, a11y beyond contrast | `references/color-contrast-accessibility.md` |
| What to enlarge/shrink, gaze path, emphasis tools | `references/hierarchy.md` |
| Buttons, cards, icons, nav, shadows, states CSS | `references/components-states.md` |
| Tokens, naming, atomic structure, patch order | `references/design-systems-tokens.md` |
| Forms, CTAs, feedback, laws of UX, flow completeness | `references/forms-ux-patterns.md` |
| Breakpoints, fluid type, mobile nav, safe areas | `references/responsive.md` |
| Durations, easing, enter/exit, reduced motion | `references/motion.md` |
| Headlines, button labels, error copy, notation | `references/copy.md` |
| Testing with users, critique method, dev-QA review | `references/research-process.md` |
| Fast lookup: symptom → fix table, feedback templates | `references/anti-patterns.md` |
| Drop-in CSS variables and base components | `assets/tokens.css` |
| Runnable heuristics + manual checklist | `scripts/ui-lint.mjs`, `assets/lint-checklist.md` |

## Constraints
- Do not assume Figma. Fix in CSS/tokens and JS state classes; use `aria-*` for state semantics.
- Keep layout structure unless local fixes cannot solve it; prefer editing shared classes over new ones.
- Shared skill: no site-specific brand tokens here; take them from the project.
- Report what you did not verify (e.g., "did not run in browser").
