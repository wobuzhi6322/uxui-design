# Color, contrast, accessibility

Tags: `[M]` @UXUIDesign (priority) · `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma · `[UXDI]` UX Design Institute.
"Remove one or two colors and it already looks better" `[M]`. "Color is the single principle that, when wrong, hurts the design most" `[DC]`.

## 1. Color budget
- Brand color 1 + sub colors 1–2 + neutrals. Everything else goes `[M]`. Beginners: monochromatic (one hue + neutrals) is the safe default `[DC]`.
- Accent/point color shows up **once** per view ("if it's everywhere it isn't a point") and is reserved for the primary action `[M][JS]`. Reusing the CTA color on labels, icons, input borders and links divides attention `[JS]`.
- Proportions ≈ 60% neutral base / 30% brand / 10% accent `[JS]`.
- Color is allocated by importance, not preference: "the buy button matters, so the color goes there" `[M]`. No rule for why blue appears in five places → defect `[M]`.
- Already-colorful areas (charts, product photos) → strip color from everything around them `[M]`. Header/GNB: remove frame colors and gray backgrounds; plain black/white is more refined `[M]`.
- Pick palettes from mood references (real photos of the category), not generators; align with business outcome and audience `[MZ]`. Children's products legitimately use more colors `[JS]`.

```css
:root{
  --brand:#2B5BD7; --brand-ink:#1E46B0;           /* one brand hue + one darker step */
  --accent:#FF6B2C;                               /* appears once per view */
  --bg:#FFFFFF; --bg-soft:#F5F5F7; --line:#E5E5E5; /* neutrals do 60% of the work */
  --text-1:#111111; --text-2:#505050; --text-3:#767676; --text-disabled:#999999;
  --success:#1B8A5A; --warning:#C98A00; --danger:#D23F3F;
}
```

## 2. Meaning and misreads
- Red = error/warning. A red "Forgot password?" looks like an error already happened → plain text color `[M]`. Red is aggressive; blue reads calm/trust `[JS]`.
- Yellow = caution, green = confirm/safe/eco, blue = calm `[M]`. Match hue to the brand's emotion and audience (organic brand ≠ red/black) `[JS]`.
- Gray fill = disabled. Gray boxes shaped like buttons look like disabled buttons `[M]`. Gray card on a colored background, or colored card on gray, never works ("pukey mix") → white card or same-hue tint `[DC]`.
- Decide delete-button color by the guide, not habit; red on destructive actions only when consistent `[M]`.
- Never convey state by color alone: add icon, text or shape (also for color-blind users) `[UXDI][M]`.

## 3. Saturation, tints, shades
- "Too vivid is crude" → lower saturation/brightness one step `[M]`. Green that "pops too much" is a common note `[M]`.
- Make tints/shades in HSL: change **lightness only**, keep hue and saturation; don't drag toward gray `[DC]`. Pastel = high lightness (~70+), reduced saturation `[DC]`.
- Avoid mid-tone backgrounds; text can't contrast well on them. Backgrounds are light or dark `[DC]`.
- Overlays, strokes and shadows on a colored surface use the same hue (lighter/darker), not neutral gray `[DC][M]`. Shadow color = sample the background `[M]`.
- Base color + tints ties a component together (price, CTA, icon in brand; 40% tint over image) `[JS]`.

## 4. Contrast
- Text contrast ≥ **4.5:1** (WCAG AA); measure with a checker (DevTools, Stark, browser extensions) — 3.7:1 fails `[M][DC]`. Large text may pass at lower ratios; keep body at 4.5+ `[DC]`.
- Only readable/usable things need high contrast: text, icons, controls. Card containers and decorative borders may be low-contrast against the page `[DC]`.
- Black-opacity ladder for hierarchy: 100 → 70 → 50; readability floor ≈ 60% of black `[M]`.
- Too-light element loses its edge on white → raise opacity decisively, or add a faint 1px stroke/2–3% shadow `[M]`.
- Same color, can't distinguish → add a shape (dot, icon) `[M]`.
- Checks: grayscale the screen — hierarchy must survive `[JS]`; squint test — the important thing must still pop `[CM]`.

```css
/* contrast ratio helper (WCAG) — use in scripts or DevTools console */
const lum = h => { const [r,g,b] = h.replace('#','').match(/../g).map(x => parseInt(x,16)/255)
  .map(c => c <= .03928 ? c/12.92 : ((c+.055)/1.055) ** 2.4); return .2126*r + .7152*g + .0722*b; };
const ratio = (a,b) => { const [L1,L2] = [lum(a), lum(b)].sort((x,y)=>y-x); return (L1+.05)/(L2+.05); };
// ratio('#767676','#ffffff') → 4.54 (passes); ratio('#999999','#ffffff') → 2.85 (fails)
```

## 5. Text over images
- Dim with a subtle gradient (≈10–20%) under the text `[M]`.
- Or: dark backdrop behind the photo + reduce the image opacity; or a backdrop-blur panel ("blur method") `[DC]`. Avoid text on the busiest part of the photo; move text or image `[M]`.
- Card with text on arbitrary photos must work for *any* photo: consistent overlay or text outside the image `[MZ]`.

```css
.media-text{ position:relative; color:#fff; }
.media-text::before{ content:""; position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgb(0 0 0 / .2)); }
.glass{ background: rgb(255 255 255 / .6); backdrop-filter: blur(12px); }   /* only for important elements [M] */
```

## 6. Dark mode and inverted themes
- Dark surfaces aren't pure black; keep a hint of the brand hue; borders/strokes get lighter, shadows get darker `[DC]`.
- When converting light↔dark, invert *values* only, keep hues; re-check every text contrast and tiny labels `[DC]`.
- Check icons/checks in both themes (white on white) `[M]`; logos ship in color / white / black `[M]`.
- Pick one theme as primary and keep the accent CTA consistent; don't half-mix light and dark sections `[MZ]`.

```css
@media (prefers-color-scheme: dark){ :root{ --bg:#101114; --bg-soft:#17181C; --line:#2A2C33; --text-1:#F2F2F2; --text-2:#C9CBD1; --text-3:#9A9DA6; } }
```

## 7. Gradients, glass, blur
- Gradient without purpose → remove. If used: one direction (diagonal), 2–10% intensity `[M]`. Vibrant hue-to-hue gradients and colored soft shadows exist as a trend; keep them subtle `[DC]`.
- Glass only on truly important elements; never nested glass, never glass + gradient + shadow stacked; fill with a solid tinted color at full opacity rather than white alpha `[M]`.
- Background blur only with a purpose; otherwise it feels stuffy `[M]`.

## 8. Accessibility beyond contrast
- Five disability categories: vision, hearing, motor, speech, cognitive — a spectrum, including situational `[UXDI]`.
- Every interactive element: keyboard reachable, visible focus, announced by screen readers with a meaningful name. "If the screen reader doesn't know the button is there, it doesn't exist" `[FG]`. Minimum states for a button: default + focus `[FG]`.
- If `outline: none` is set, a styled `:focus-visible` is mandatory `[DC]`.
- Automated checks catch only part; do a manual pass (Tab through, zoom 200%, screen reader on key flows) `[UXDI]`.
- Respect `prefers-reduced-motion` as an accessibility mode `[FG][UXDI]`.
- Accessibility is a business case (legal, SEO, reputation, market); inclusive design improves the product for everyone `[UXDI]`.

```css
:focus-visible{ outline:2px solid var(--brand); outline-offset:2px; border-radius:4px; }
button:focus:not(:focus-visible){ outline:none; }
.sr-only{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
```
```html
<button aria-label="Search"><svg aria-hidden="true">…</svg></button>
<span class="status"><svg aria-hidden="true">…</svg> Failed</span> <!-- icon + text, not color alone -->
```

## Do / Don't
| Do | Don't |
|---|---|
| 1 brand + 1–2 sub + neutrals | 5 hues "because the brand guide has them" |
| Accent once, on the primary action | Accent on links, labels, borders, icons |
| HSL lightness steps of one hue | New hex picked by eye for every shade |
| Light or dark backgrounds | Mid-gray or mid-tone backgrounds |
| Text ≥ 4.5:1, measured | "Looks readable to me" |
| Icon + text for status | Color-only status dots |
| Styled `:focus-visible` | `outline: none` and nothing else |

## Review template (Madia voice)
- "Too many colors → drop the green and the yellow; go black + brand."
- "Red here reads as an error → normal text color."
- "Gray box looks disabled → white card, 1px #E5E5E5 line."
- "Contrast 3.2:1 fails → #767676 on white."
- "Gradient has no purpose → remove; if you keep it, 5%, diagonal."
