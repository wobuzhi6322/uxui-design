# Components, icons, images, states

Rule zero: a component is shared. Fix the class/token, never one instance.

## 1. Buttons
- Heights 40 / 44 / 48 / 52 / 56 / 60; radius 4 / 8 / 12 / 16 or pill (9999). Padding 24×12, 20×16, 12×8. Generous padding = tappable + legible label.
- Label volume matches adjacent body text; icons allowed left *and* right as slots.
- Variants: filled / outline / text, square / rounded / pill — one set, reused. Similar buttons merge into one ("Download" text + one button).
- Several heavy black buttons clash → one primary; "does this button really need a shadow?".
- States: **default, hover, focus, pressed, completed, disabled, loading** (6–7 states) with names matching the component library. A11y minimum = default + focus. Hover on PC is expected.
- Disabled = #999 text / gray fill, so gray must not be used for enabled buttons.

```css
.btn{ --h:48px; min-height:var(--h); padding:0 24px; border-radius:8px; font:500 16px/1 var(--font-sans);
      display:inline-flex; align-items:center; justify-content:center; gap:8px; border:1px solid transparent;
      transition: background-color .2s ease, color .2s ease, transform .1s ease; cursor:pointer; }
.btn-primary{ background:var(--brand); color:#fff; }
.btn-primary:hover{ background:var(--brand-ink); }
.btn-primary:active{ transform: translateY(1px); }
.btn-secondary{ background:#fff; color:var(--text-1); border-color:var(--line); }
.btn-text{ background:none; color:var(--brand); padding-inline:8px; }
.btn:focus-visible{ outline:2px solid var(--brand); outline-offset:2px; }
.btn:disabled,.btn[aria-disabled="true"]{ background:#F0F0F0; color:var(--text-disabled); cursor:not-allowed; }
.btn.is-loading{ color:transparent; position:relative; pointer-events:none; }
.btn.is-loading::after{ content:""; position:absolute; width:18px; height:18px; border:2px solid #fff; border-right-color:transparent; border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin{ to{ transform:rotate(360deg);} }
```
```js
// state toggling: class + aria, never visual-only
btn.classList.add('is-loading'); btn.setAttribute('aria-busy','true');
```

## 2. Inputs (details in forms-ux-patterns.md)
- Visible rectangle (border 1px mid-gray on light backgrounds), not underline-only. Active/focus state in brand color, clearly different from default.
- Same 1px stroke on inputs, checkboxes, radios; checked/unchecked both designed; verify on white and black backgrounds.
- Height aligned to the button scale (44–48) so rows line up.

## 3. Icons
- One style per screen: line **or** filled; one stroke width (all 1px or all 2px, never 1.5 mixed with 2). Fractional strokes render badly and break the standard.
- Sizes 16 / 20 / 24 ("search icon is small → 20"); hero actions 56–64; thicker stroke as size grows.
- Universal symbols (star for rating), instantly readable; "looks like a photo, not a camera" is a redo. Distorted ellipses/pixelated icons: redraw.
- Icon-only controls get a text label or `aria-label`. Icon↔text gap 4–8.
- Pre-define the hover/pressed area of every icon control; 40px square.

```css
.icon{ width:20px; height:20px; stroke-width:1.5px; flex:none; }   /* pick ONE stroke-width project-wide */
.icon-btn{ width:40px; height:40px; display:grid; place-items:center; border-radius:8px; }
.icon-btn:hover{ background:var(--bg-soft); }
```

## 4. Cards, lines, boxes
- No gray box inside a card; no box inside a box; the card's value is grouping. If a card isn't needed, lay content on the page.
- Modern default: off-white page (#F5F5F7-ish) + white card, or white page + 1px light stroke; the container needs no high contrast — only its content does.
- Lines: 1px, faint (#EDEDED–#DBDBDB), "there but not there"; never 0.5px. "The line isn't needed" is the most frequent note. Borders make a design look cheap when overused.
- Image : content split ≈ 2/3 : 1/3 reads better than 50/50; radius ~6–12.
- Tags/chips: small and quiet, or plain text; large chips look messy. Tag style = 12px uppercase, light tracking, soft background.
- Hover: a card lifting on hover beats a permanently floating card.

```css
.card{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px; transition: box-shadow .2s ease, transform .2s ease; }
.card:hover{ box-shadow:0 4px 12px rgb(0 0 0 / .06); transform:translateY(-2px); }
.card .card{ border:0; padding:0; background:none; }   /* kill boxes-in-boxes */
```

## 5. Shadows and effects
- Card/dashboard shadow 2–3% alpha, never above 10%; prefer a faint shadow over a dark stroke. "Shadows are an afterthought, not a discussion piece". ≤10% alpha; the less blur, the lower the alpha.
- Never on text; no emboss; no shadow on an element that already has low contrast with its background.
- Shadow color sampled from the background, not black. Layer 2–3 shadows (comma-separated) for depth instead of one dark one.
- Inner shadows: either none, or two (light + dark side) for real depth — graphics only.
- Glass: important elements only, no nested glass, no glass+gradient+shadow (recipe: fill alpha ~20%, white stroke 20%, blur 20, shadow 5%). Neumorphism-style soft double shadows: a trend that is easy to overdo and low in contrast; don't stack it with gradients/glows.

```css
:root{ --shadow-1: 0 1px 3px rgb(17 17 17 / .03), 0 4px 12px rgb(17 17 17 / .03);
       --shadow-2: 0 2px 6px rgb(17 17 17 / .04), 0 12px 32px rgb(17 17 17 / .06); }
```

## 6. Navigation
- Logo left, nav right (9/10); differentiate logo vs nav, primary vs secondary nav, dropdown parents vs plain links. GNB identical on every page; ~70px tall.
- Always show the **active** page (color/weight/underline/background) and a **hover** state. Include an explicit Home link.
- Contrast ≥ 4.5:1 for nav text; keyboard focus visible.
- Hamburger only when width forces it; never on desktop; primary destinations stay visible as buttons. Replace scroll indicators with a labeled CTA.
- Mobile bottom tabs: most important first/last, within thumb reach; add `env(safe-area-inset-bottom)`. Top CTA scrolls away → sticky bottom button appears.

```css
.nav a{ color:var(--text-2); padding:8px 12px; border-radius:6px; }
.nav a:hover{ color:var(--text-1); background:var(--bg-soft); }
.nav a[aria-current="page"]{ color:var(--text-1); font-weight:600; }
.bottom-bar{ position:fixed; inset-inline:0; bottom:0; padding:12px 16px calc(12px + env(safe-area-inset-bottom)); }
```

## 7. Search, modals, toasts
- Search: visible button, hint placeholder ("Search movies, shows…"), breathing room, conventional placement, loading feedback.
- Alert (choice/confirm) vs toast (instant feedback: "added to cart") are different components. Toast = non-blocking, auto-dismiss, `role="status"`.
- Error modal copy: what happened → why → way out → how to fix; **one** primary CTA; never a success line next to a failure line.
- Needed popups exist: avatar tap → profile card; selection → max count visible.

```html
<div class="toast" role="status" aria-live="polite">Added to cart</div>
```
```js
const toast=(msg,ms=2500)=>{ const el=document.querySelector('.toast'); el.textContent=msg; el.classList.add('is-visible'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('is-visible'),ms); };
```

## 8. Images and thumbnails
- Unified ratios; correct tone (saturation/contrast) to the site mood; replace images with too many primaries. "Change the image alone and quality transforms".
- Mix strong and quiet images; thumbnails smaller than the title unless the image is the point. Mockups with whitespace and centered product.
- Text over image muddy → move text down or add a 10–20% dim. Transparent-background photos integrate better than boxed photos.

## Do / Don't
| Do | Don't |
|---|---|
| 7 states, named like the component | Hover only; disabled that looks enabled |
| One icon style and stroke | Mixed line/filled, 1.5px here, 2px there |
| 1px #E5E5E5 or 3% shadow | 0.5px lines, 24% drop shadows |
| White card on off-white | Gray box inside a white card |
| Active + hover + focus on nav | Hamburger on desktop |
| Toast for feedback, alert for choices | Modal for "saved" |

## Review template
- "Line not needed → remove." · "Shadow 24% → 3%, Y 2 blur 8."
- "Icons: pick line or fill, 2px everywhere." · "Chips are big → 12px text, or just text."
- "Three black buttons fight → one filled, two outline."
