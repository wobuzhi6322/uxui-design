# Forms, CTAs, feedback, UX patterns

Tags: `[M]` @UXUIDesign (priority) · `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma · `[AJ]` AJ&Smart · `[FX]` Flux Academy.
"The real foundation is usability: is it actually easy to use?" `[M]`. "Use it yourself, press everything; drawing alone creates gaps" `[M]`.

## 1. Flow completeness (click through before polishing) `[M]`
- Sign-up: ID, password, **password confirmation**, guest path. Chat: attach-file button. Avatar: tap → basic profile popup. Multi-select: show the maximum count.
- "What exists must exist to be usable" — think in flows, not single screens.
- Never add steps where one click works; comparisons need multiple items visible at once (click, not hover).
- Also design the **empty**, **loading**, **error**, and **first-time** states; devs will ask for them `[MZ]`. Empty states guide to the next best action `[FG]`.
- Consider three user roles: first-time (needs orientation), repeat (wants to re-do fast: reorder, recent), super user (wants shortcuts and insights) `[MZ]`.

## 2. Laws worth applying `[JS]`
| Law | Rule | CSS/UX consequence |
|---|---|---|
| Fitts | Target acquisition depends on size and distance | big, spaced, reachable buttons; `min-height:44–48px`; 12–42px between tappables |
| Hick | More choices → slower decisions | fewer options per step; progressive disclosure |
| Jakob | Users live on other sites | follow conventions (logo left, nav right, cart top-right, search in header) |
| Von Restorff | The odd one stands out | exactly one accent element per view |
| Serial position | First and last are remembered | most important tab items first/last; key nav at edges |
| Miller | ~7 items at a time | chunk lists, limit menu items, group fields |

Also: people scan, they don't read; cut text, avoid marketing buzzwords; icons with labels can replace paragraphs `[JS]`.

## 3. Forms
- Single column; label **above** the field. Side-by-side label/input creates a zig-zag scan `[DC][JS]`. Pair only contextually linked fields (country code + phone) `[JS]`.
- Field must look like a field: visible 1px border, not an underline only; on light gray backgrounds use a mid-gray border `[DC]`.
- Focus/active state clearly different, in brand color `[M][DC]`. Same stroke on inputs and checkboxes `[DC]`.
- Placeholder is a hint, never the label; if floating labels are used they must stay accessible `[DC]`. Dark placeholder text competes with labels → lighten `[DC]`. Hint what to type ("Search movies and shows") `[JS]`.
- Remove fields that don't earn their place (a "subject" field on a contact form) — less friction `[DC]`.
- Errors: inline, next to the field, highlight the field, say what's wrong and how to fix ("Email needs an @") — not "Form error" `[JS]`. Error text pattern: what happened → why → way out → how to fix; one primary CTA; no mixed success/failure messages `[MZ]`.
- Form is the most important element → left column; don't leave half the page empty — center the card or fill the second column with relevant copy `[DC]`.
- Equal inner padding on all sides of the form container; icons inside buttons not oversized `[DC]`.

```html
<div class="field">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" inputmode="email"
         placeholder="name@example.com" aria-describedby="email-err" aria-invalid="true">
  <p id="email-err" class="field__error" role="alert">Email needs an “@”. Example: name@example.com</p>
</div>
```
```css
.field{ display:grid; gap:8px; }
.field label{ font-size:14px; font-weight:500; color:var(--text-1); }
.field input{ min-height:48px; padding:0 14px; border:1px solid var(--line-strong); border-radius:8px; font-size:16px; background:#fff; }
.field input::placeholder{ color:var(--text-3); }
.field input:focus-visible{ outline:0; border-color:var(--brand); box-shadow:0 0 0 3px var(--brand-50); }
.field input[aria-invalid="true"]{ border-color:var(--danger-500); }
.field__error{ font-size:13px; color:var(--danger-500); display:flex; gap:6px; align-items:center; }
```

## 4. Calls to action
- One primary per view; secondary as outline/text; "Register" next to "Sign in" becomes a text link `[JS][M]`.
- Judge a CTA on five axes: color/contrast, size, position, copy, relevance `[DC]`. The important one is first/left and filled `[DC]`.
- Copy says the outcome ("See my work", "Start free audit") rather than "Contact" or a scroll arrow `[DC][MZ]`.
- Big key buttons get instant visual feedback (pressed state) `[M]`. Keep the top CTA reachable: sticky bottom button when it scrolls away `[M]`; within thumb reach on mobile `[JS][FX]`.
- Buttons never shrink below tappable size to save space; hidden items can't be found `[M]`.

## 5. Feedback and system status
- Every interaction answers: hover, pressed, success, error, loading `[JS][M]`. Alerts for decisions, toasts for instant confirmations ("added to cart") `[M]`.
- Searching/submitting shows progress (spinner, skeleton, "on its way") instead of a blank flash `[JS]`.
- Load fast: 2–3 s target; optimize every image; a performance score around 60 is a failing UX regardless of visuals `[JS][FX]`.

```js
form.addEventListener('submit', async e=>{ e.preventDefault(); submit.classList.add('is-loading'); submit.setAttribute('aria-busy','true');
  try{ await send(new FormData(form)); toast('Message sent'); form.reset(); }
  catch{ showError(emailField,'We couldn’t send this. Check your connection and try again.'); }
  finally{ submit.classList.remove('is-loading'); submit.removeAttribute('aria-busy'); } });
```

## 6. Navigation and discovery patterns
- Follow platform guidelines (iOS HIG / Material) for overlays vs push, tab bars, back behavior; know the rules before breaking them `[AJ]`.
- Hamburger holds secondary destinations only; primary ones stay visible `[DC]`. Carousels hide primary content — avoid; show the templates/features statically `[MZ]`.
- Icons need labels `[MZ]`. Search box: button + hint + space + conventional placement `[JS]`.
- Landing: headline answers the pain point, supportive imagery shows the product, trust via real people and logos; no walls of text `[MZ]`.

## 7. Mobile specifics
- Touch areas generous and spaced; absolute spacing between targets `[M][JS]`. Bottom dock with safe area `[M]`.
- Primary CTA reachable with one thumb; text not tiny on mobile `[FX]`.
- Inputs at 16px with 48px height keep Madia's body range and stay comfortable to tap `[M]`.

## Do / Don't
| Do | Don't |
|---|---|
| Label above, one column | Zig-zag label/input rows |
| Visible 1px border + brand focus ring | Underline-only inputs, same look when active |
| Inline, specific error + highlighted field | "Form error" banner at the top |
| One filled CTA | Two equal CTAs ("Sign in" / "Register") |
| Design empty/loading/error states | Only the happy path |
| Toast for "saved" | Modal for "saved" |

## Review template (Madia voice)
- "Password confirmation is missing → add it." · "Max selectable count isn't shown → show it."
- "Hover to compare is a chore → click opens several at once."
- "Input active state is invisible → brand-color border."
- "Two primary buttons → one filled, one text."
