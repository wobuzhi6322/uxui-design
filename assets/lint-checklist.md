# UI lint checklist (agent-runnable)

Two parts: (A) automated heuristics via `node scripts/ui-lint.mjs <path>`; (B) manual checks you run in a browser/DevTools. Every rule carries its source tag: `[M]` @UXUIDesign (Madia) wins conflicts; `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma · `[UXDI]` UX Design Institute · `[CM]` CharliMarieTV · `[FX]` Flux Academy.

## A. Automated rules (`scripts/ui-lint.mjs`)
| ID | Level | Check | Fix | Src |
|---|---|---|---|---|
| T1-min-font-size | error | `font-size` < 12px (px/rem/em, Tailwind `text-[Npx]`, inline styles) | 12 minimum; informational body 14–16 | M |
| T2-tracked-paragraph | warn | positive `letter-spacing` on non-uppercase text | `-0.025em` (or 0); tracking only on small caps labels | DC, M |
| T3-line-height | warn | unitless `line-height` < 1.2 on text selectors | 1.4 body, 1.5 long text, 1.2–1.3 titles | M |
| T4-justify | warn | `text-align: justify` | left | JS, M |
| T5-bold-overuse | info | > 4 rules with weight ≥ 700 | 400/500 body, 600 titles | M |
| T6-font-families | warn | > 2 distinct families | one family (two with a rule) | M |
| C1-999-text | warn | `color: #999` outside disabled/placeholder | #767676 / #505050 | M |
| C2-color-sprawl | info | > 16 distinct hex outside `:root` | tokens; brand 1 + sub 1–2 | M, MZ |
| C3-contrast | warn/error | fg/bg in the same rule < 4.5:1 (3:1 large) | darken text or lighten bg | M, DC |
| B1-half-pixel-border | error | 0.5px border/outline (incl. Tailwind) | 1px light | M |
| B2-outline-none | error | `outline: none/0` and no `:focus(-visible)` style in the file | add a focus ring | DC |
| S1-heavy-shadow | warn/error | `box-shadow` alpha > 10% / > 25%, or opaque shadow color | 2–3% alpha, soft blur | M, DC |
| S2-text-shadow | warn | any `text-shadow` | remove | DC |
| M1-slow-motion | info | transition/animation > 600ms on UI elements | 150–400ms | FG, DC |
| M2-reduced-motion | info | motion present, no `prefers-reduced-motion` | add the media query | FG, UXDI |
| K1-small-button | warn | button `height`/`min-height` < 40px | 40–60 (44/48) | M, JS |
| K2-button-states | info | button rules without `:hover` and/or `:focus` | default/hover/focus/pressed/disabled/loading | M, FG |
| L1-off-scale-spacing | info | margin/padding/gap px not on 2/4/6/8 · multiples of 4 | 4/8 scale | M, MZ |
| H1-img-alt | warn | `<img>` without `alt` | add alt (empty for decorative) | UXDI |
| H2-unlabeled-field | warn | input/select/textarea with no label/aria-label | label above the field | DC, JS |
| H4-icon-only-button | warn | `<button>` with no text and no `aria-label` | add label | MZ, FG |
| H5-weak-cta-copy | info | "Click here", "Submit", "Learn more", "Read more" | outcome-based label | DC, MZ |
| H6-welcome-headline | info | `<h1>Welcome to …` | say what it is / what to do | DC |

Run: `node scripts/ui-lint.mjs src/ --json` (exit 1 on errors; `--warn-only` to never fail).

## B. Manual checks (DevTools / browser)
Typography
- [ ] Sizes only from 12/14/16/20/24/28(+32–48); body ≥ 14; captions 12–14 `[M]`
- [ ] Same-level text shares size, weight, line-height, color `[M]`
- [ ] Titles not oversized for the frame; big numbers large and thin `[M]`
- [ ] Paragraph measure ≤ ~65ch / 600px `[JS][MZ]`; 2–3-line wrap and longest strings tested `[M]`
- [ ] One family; swapped font re-checked for apparent size (x-height) `[FG]`

Spacing / layout
- [ ] Side margins 16/20/24 on mobile; container ≤ 1200–1440 `[M][MZ]`
- [ ] Related items 4–8 apart, groups 24–40 apart; inner gap < container padding `[M][MZ]`
- [ ] Left-aligned by default; no mixed left/center siblings; one axis `[M][DC][JS]`
- [ ] No box-in-box, no needless separators; image ratios unified `[M]`
- [ ] Rhythm: one point corner, varied section weights `[M]`

Color / contrast / a11y
- [ ] ≤ 3 chromatic colors; accent once; gray not used for enabled controls; red only for errors `[M][JS]`
- [ ] Text contrast measured ≥ 4.5:1 (DevTools color picker shows the ratio) `[M][DC]`
- [ ] Grayscale/squint: hierarchy survives `[JS][CM]`
- [ ] Tab through: focus visible everywhere, logical order; icon buttons announced `[DC][FG]`
- [ ] Status never by color alone `[UXDI]`; `prefers-reduced-motion` respected `[FG]`

Components / states
- [ ] Buttons 40–60 tall, padding 24×12 / 20×16, one filled primary per view `[M]`
- [ ] hover / focus-visible / active / disabled / loading all visible; nav active page marked `[M][DC]`
- [ ] Borders 1px light; shadows ≤ 10% (2–3% cards); no text shadows `[M][DC]`
- [ ] Icons one style, one stroke width, 16/20/24; labels or aria-labels `[M][MZ]`
- [ ] Cards: white on off-white or 1px line; hover lift, not permanent float `[DC][M]`

Forms / UX
- [ ] Single column, labels above, visible borders, brand focus ring `[DC][M]`
- [ ] Inline errors with fix instructions; one CTA; no success+failure mixed `[JS][MZ]`
- [ ] Flow complete: confirm password, attach, max count, back path `[M]`
- [ ] Empty / loading / error / first-time states exist `[MZ]`
- [ ] Toast for confirmations, alert for decisions `[M]`

Responsive / motion / copy
- [ ] 320–1920 continuous resize: no overflow, same shared components; safe-area on fixed bars `[DC][M]`
- [ ] Transitions 150–400ms, ease-out; hidden elements kept in DOM at opacity 0 `[FG][DC][MZ]`
- [ ] Headline says what it is; button labels say the outcome; dates/units/AM-PM complete; filler words removed `[DC][MZ][M]`
- [ ] Lighthouse mobile performance not ~60 `[FX]`

Final
- [ ] "What else can be removed?" — remove it if the screen still works `[M]`
- [ ] Findings written as `problem → impact → selector + values` `[M]`
