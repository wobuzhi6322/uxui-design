# Color, contrast, accessibility

"Remove one or two colors and it already looks better". "Color is the single principle that, when wrong, hurts the design most".

## 1. Color budget
- Brand color 1 + sub colors 1–2 + neutrals. Everything else goes. Beginners: monochromatic (one hue + neutrals) is the safe default.
- Accent/point color shows up **once** per view ("if it's everywhere it isn't a point") and is reserved for the primary action. Reusing the CTA color on labels, icons, input borders and links divides attention.
- Proportions ≈ 60% neutral base / 30% brand / 10% accent.
- Color is allocated by importance, not preference: "the buy button matters, so the color goes there". No rule for why blue appears in five places → defect.
- Already-colorful areas (charts, product photos) → strip color from everything around them. Header/GNB: remove frame colors and gray backgrounds; plain black/white is more refined.
- Pick palettes from mood references (real photos of the category), not generators; align with business outcome and audience. Children's products legitimately use more colors.

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
- Red = error/warning. A red "Forgot password?" looks like an error already happened → plain text color. Red is aggressive; blue reads calm/trust.
- Yellow = caution, green = confirm/safe/eco, blue = calm. Match hue to the brand's emotion and audience (organic brand ≠ red/black).
- Gray fill = disabled. Gray boxes shaped like buttons look like disabled buttons. Gray card on a colored background, or colored card on gray, never works ("pukey mix") → white card or same-hue tint.
- Decide delete-button color by the guide, not habit; red on destructive actions only when consistent.
- Never convey state by color alone: add icon, text or shape (also for color-blind users).

## 3. Saturation, tints, shades
- "Too vivid is crude" → lower saturation/brightness one step. Green that "pops too much" is a common note.
- Make tints/shades in HSL: change **lightness only**, keep hue and saturation; don't drag toward gray. Pastel = high lightness (~70+), reduced saturation.
- Avoid mid-tone backgrounds; text can't contrast well on them. Backgrounds are light or dark.
- Overlays, strokes and shadows on a colored surface use the same hue (lighter/darker), not neutral gray. Shadow color = sample the background.
- Base color + tints ties a component together (price, CTA, icon in brand; 40% tint over image).

## 4. Contrast
- Text contrast ≥ **4.5:1** (WCAG AA); measure with a checker (DevTools, Stark, browser extensions) — 3.7:1 fails. Large text may pass at lower ratios; keep body at 4.5+.
- Only readable/usable things need high contrast: text, icons, controls. Card containers and decorative borders may be low-contrast against the page.
- Black-opacity ladder for hierarchy: 100 → 70 → 50; readability floor ≈ 60% of black.
- Too-light element loses its edge on white → raise opacity decisively, or add a faint 1px stroke/2–3% shadow.
- Same color, can't distinguish → add a shape (dot, icon).
- Checks: grayscale the screen — hierarchy must survive; squint test — the important thing must still pop.

```css
/* contrast ratio helper (WCAG) — use in scripts or DevTools console */
const lum = h => { const [r,g,b] = h.replace('#','').match(/../g).map(x => parseInt(x,16)/255)
  .map(c => c <= .03928 ? c/12.92 : ((c+.055)/1.055) ** 2.4); return .2126*r + .7152*g + .0722*b; };
const ratio = (a,b) => { const [L1,L2] = [lum(a), lum(b)].sort((x,y)=>y-x); return (L1+.05)/(L2+.05); };
// ratio('#767676','#ffffff') → 4.54 (passes); ratio('#999999','#ffffff') → 2.85 (fails)
```

## 5. Text over images
- Dim with a subtle gradient (≈10–20%) under the text.
- Or: dark backdrop behind the photo + reduce the image opacity; or a backdrop-blur panel ("blur method"). Avoid text on the busiest part of the photo; move text or image.
- Card with text on arbitrary photos must work for *any* photo: consistent overlay or text outside the image.

```css
.media-text{ position:relative; color:#fff; }
.media-text::before{ content:""; position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgb(0 0 0 / .2)); }
.glass{ background: rgb(255 255 255 / .6); backdrop-filter: blur(12px); }   /* only for important elements */
```

## 6. Dark mode and inverted themes
- Dark surfaces aren't pure black; keep a hint of the brand hue; borders/strokes get lighter, shadows get darker.
- When converting light↔dark, invert *values* only, keep hues; re-check every text contrast and tiny labels.
- Check icons/checks in both themes (white on white); logos ship in color / white / black.
- Pick one theme as primary and keep the accent CTA consistent; don't half-mix light and dark sections.

```css
@media (prefers-color-scheme: dark){ :root{ --bg:#101114; --bg-soft:#17181C; --line:#2A2C33; --text-1:#F2F2F2; --text-2:#C9CBD1; --text-3:#9A9DA6; } }
```

## 7. Gradients, glass, blur
- Gradient without purpose → remove. If used: one direction (diagonal), 2–10% intensity. Vibrant hue-to-hue gradients and colored soft shadows exist as a trend; keep them subtle.
- Glass only on truly important elements; never nested glass, never glass + gradient + shadow stacked; fill with a solid tinted color at full opacity rather than white alpha.
- Background blur only with a purpose; otherwise it feels stuffy.

## 8. Accessibility beyond contrast
- Five disability categories: vision, hearing, motor, speech, cognitive — a spectrum, including situational.
- Every interactive element: keyboard reachable, visible focus, announced by screen readers with a meaningful name. "If the screen reader doesn't know the button is there, it doesn't exist". Minimum states for a button: default + focus.
- If `outline: none` is set, a styled `:focus-visible` is mandatory.
- Automated checks catch only part; do a manual pass (Tab through, zoom 200%, screen reader on key flows).
- Respect `prefers-reduced-motion` as an accessibility mode.
- Accessibility is a business case (legal, SEO, reputation, market); inclusive design improves the product for everyone.

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

## Review template
- "Too many colors → drop the green and the yellow; go black + brand."
- "Red here reads as an error → normal text color."
- "Gray box looks disabled → white card, 1px #E5E5E5 line."
- "Contrast 3.2:1 fails → #767676 on white."
- "Gradient has no purpose → remove; if you keep it, 5%, diagonal."
