# UI lint checklist (agent-runnable)

Two parts: (A) automated heuristics via `node scripts/ui-lint.mjs <path>`; (B) manual checks you run in a browser/DevTools.

## A. Automated rules (`scripts/ui-lint.mjs`)
| ID | Level | Check | Fix |
| --- | --- | --- | --- |
| T1-min-font-size | error | `font-size` < 12px (px/rem/em, Tailwind `text-[Npx]`, inline styles) | 12 minimum; informational body 14–16 |
| T2-tracked-paragraph | warn | positive `letter-spacing` on non-uppercase text | `-0.025em` (or 0); tracking only on small caps labels |
| T3-line-height | warn | unitless `line-height` < 1.2 on text selectors | 1.4 body, 1.5 long text, 1.2–1.3 titles |
| T4-justify | warn | `text-align: justify` | left |
| T5-bold-overuse | info | > 4 rules with weight ≥ 700 | 400/500 body, 600 titles |
| T6-font-families | warn | > 2 distinct families | one family (two with a rule) |
| C1-999-text | warn | `color: #999` outside disabled/placeholder | #767676 / #505050 |
| C2-color-sprawl | info | > 16 distinct hex outside `:root` | tokens; brand 1 + sub 1–2 |
| C3-contrast | warn/error | fg/bg in the same rule < 4.5:1 (3:1 large) | darken text or lighten bg |
| B1-half-pixel-border | error | 0.5px border/outline (incl. Tailwind) | 1px light |
| B2-outline-none | error | `outline: none/0` and no `:focus(-visible)` style in the file | add a focus ring |
| S1-heavy-shadow | warn/error | `box-shadow` alpha > 10% / > 25%, or opaque shadow color | 2–3% alpha, soft blur |
| S2-text-shadow | warn | any `text-shadow` | remove |
| M1-slow-motion | info | transition/animation > 600ms on UI elements | 150–400ms |
| M2-reduced-motion | info | motion present, no `prefers-reduced-motion` | add the media query |
| K1-small-button | warn | button `height`/`min-height` < 40px | 40–60 (44/48) |
| K2-button-states | info | button rules without `:hover` and/or `:focus` | default/hover/focus/pressed/disabled/loading |
| L1-off-scale-spacing | info | margin/padding/gap px not on 2/4/6/8 · multiples of 4 | 4/8 scale |
| H1-img-alt | warn | `<img>` without `alt` | add alt (empty for decorative) |
| H2-unlabeled-field | warn | input/select/textarea with no label/aria-label | label above the field |
| H4-icon-only-button | warn | `<button>` with no text and no `aria-label` | add label |
| H5-weak-cta-copy | info | "Click here", "Submit", "Learn more", "Read more" | outcome-based label |
| H6-welcome-headline | info | `<h1>Welcome to …` | say what it is / what to do |

Run: `node scripts/ui-lint.mjs src/ --json` (exit 1 on errors; `--warn-only` to never fail).

## B. Manual checks (DevTools / browser)
Typography
- [ ] Sizes only from 12/14/16/20/24/28(+32–48); body ≥ 14; captions 12–14
- [ ] Same-level text shares size, weight, line-height, color
- [ ] Titles not oversized for the frame; big numbers large and thin
- [ ] Paragraph measure ≤ ~65ch / 600px; 2–3-line wrap and longest strings tested
- [ ] One family; swapped font re-checked for apparent size (x-height)

Spacing / layout
- [ ] Side margins 16/20/24 on mobile; container ≤ 1200–1440
- [ ] Related items 4–8 apart, groups 24–40 apart; inner gap < container padding
- [ ] Left-aligned by default; no mixed left/center siblings; one axis
- [ ] No box-in-box, no needless separators; image ratios unified
- [ ] Rhythm: one point corner, varied section weights

Color / contrast / a11y
- [ ] ≤ 3 chromatic colors; accent once; gray not used for enabled controls; red only for errors
- [ ] Text contrast measured ≥ 4.5:1 (DevTools color picker shows the ratio)
- [ ] Grayscale/squint: hierarchy survives
- [ ] Tab through: focus visible everywhere, logical order; icon buttons announced
- [ ] Status never by color alone; `prefers-reduced-motion` respected

Components / states
- [ ] Buttons 40–60 tall, padding 24×12 / 20×16, one filled primary per view
- [ ] hover / focus-visible / active / disabled / loading all visible; nav active page marked
- [ ] Borders 1px light; shadows ≤ 10% (2–3% cards); no text shadows
- [ ] Icons one style, one stroke width, 16/20/24; labels or aria-labels
- [ ] Cards: white on off-white or 1px line; hover lift, not permanent float

Forms / UX
- [ ] Single column, labels above, visible borders, brand focus ring
- [ ] Inline errors with fix instructions; one CTA; no success+failure mixed
- [ ] Flow complete: confirm password, attach, max count, back path
- [ ] Empty / loading / error / first-time states exist
- [ ] Toast for confirmations, alert for decisions

Responsive / motion / copy
- [ ] 320–1920 continuous resize: no overflow, same shared components; safe-area on fixed bars
- [ ] Transitions 150–400ms, ease-out; hidden elements kept in DOM at opacity 0
- [ ] Headline says what it is; button labels say the outcome; dates/units/AM-PM complete; filler words removed
- [ ] Lighthouse mobile performance not ~60

Final
- [ ] "What else can be removed?" — remove it if the screen still works
- [ ] Findings written as `problem → impact → selector + values`
