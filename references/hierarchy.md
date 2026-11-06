# Visual hierarchy and gaze path

"The most important thing in this kind of design is information hierarchy". "If everything is important, nothing is".

## 1. Decide before styling
1. Name the single most important information or action on the screen.
2. Order the rest as the user will look: e.g. product → options → total price; chart/KPI before its explanation; login = information only, no decoration.
3. Assign three levels: **1 = main title, 2 = sub/section title, 3 = body**; keep the same three everywhere. Neighboring texts with different roles must look different; identical styling for label + value + link is the classic failure.
4. "Shrink what should shrink, enlarge what should pop" — decisively. Refinement comes from bold contrast, not from adding force everywhere.

## 2. Tools, in order of power
| Order | Tool | Notes |
|---|---|---|
| 1 | **Size / scale** | biggest lever for hierarchy; titles up, meta down |
| 2 | **Tone** (color/opacity) | 100 → 70 → 50 black; #111 / #505050 / #767676 |
| 3 | **Weight** | one step (500 → 600); not bold everywhere |
| 4 | Space | more whitespace around the primary element |
| 5 | Accent color | once, on the primary action |
| 6 | Underline / background / icon | secondary cues; apply only after 1–3 |

Typography wrong hurts more than scale wrong — fix type first, then scale.

## 3. What to shrink, what to grow
- Shrink: avatars, logos, thumbnails and decorative images that outweigh the information; rarely used functions (address change); counts/status chips all set at the same size.
- Grow: the final payable amount (bigger than its components; the calculation "from what, minus what, equals what" must be readable); the plan the user should move to (not the current one); the primary CTA.
- Price/number blocks: large and thin.
- Group the total with the discount it depends on; separated numbers lose meaning.
- Most-used action in a list of actions gets the prominent treatment.

## 4. Buttons and actions
- Button hierarchy by fill: primary = filled brand; secondary = outline/gray; tertiary = text. "Forward dark, back light".
- One primary per view; two equal-weight CTAs force a decision. "Register" next to "Sign in" becomes a text link ("Don't have an account? Register").
- The most important CTA sits first/left (LTR) and is the solid one. Order by what users want first (work before contact).
- Multiple heavy black buttons collide → weaken the secondary.
- Links must look different from labels and placeholders (underline, color, weight).

## 5. Subtraction (remove these first)
- Lines between items, boxes inside boxes, background fills, extra strokes, gradients, glass, heavy shadows, drop shadows on text, chips that could be text, extra weights, extra colors.
- "Seeing a lot at once is not readability"; people scan, they don't read — fewer words, shorter headlines.
- A label whose meaning is obvious from content can become a watermark or disappear.
- Decorative elements are watermarks: low contrast, never competing with content.

## 6. Gaze path and placement
- Tabs and primary actions in conventional positions; "the eye goes here first, so…". Logo left, nav right 9/10.
- On image overlaps, place text away from the subject so both image and text read.
- Hero: headline unmistakably larger than sub-headline; nav smaller than headline. Reduce oversized hero banners to expose real content above the fold.
- Portfolio/landing: the work/product visible within seconds; intros, banners and motion must not steal hierarchy.
- Bottom tab bars: most important items first and last (serial position), within thumb reach.

## 7. Tests
- **5-second test**: show the screen for 5s → can someone say what it is for and what to do?
- **Squint test / grayscale**: blur or desaturate — the primary element must still dominate.
- **Read it back**: can you read every text at 100% zoom? Too small/too big titles are red flags.

## CSS pattern: three-level hierarchy on a card
```css
.card{ display:grid; gap:8px; padding:16px; }
.card__eyebrow{ font-size:12px; color:var(--text-3); text-transform:uppercase; letter-spacing:.06em; }   /* level 3 */
.card__title{ font-size:20px; font-weight:600; line-height:1.3; color:var(--text-1); }                  /* level 1 */
.card__desc{ font-size:14px; line-height:1.4; color:var(--text-2); }                                     /* level 2 */
.card__price{ font-size:28px; font-weight:300; letter-spacing:-.02em; color:var(--text-1); }            /* big & thin */
.card__was{ font-size:14px; color:var(--text-3); text-decoration:line-through; margin-left:8px; }       /* grouped with price */
.card__cta{ justify-self:start; }                                                                        /* one primary */
```

## Do / Don't
| Do | Don't |
|---|---|
| Name the #1 element, then style | Style everything, hope hierarchy emerges |
| Size → tone → weight | Bold + color + underline + badge on one label |
| Total bigger than parts, grouped | Same size for list price, discount, total |
| One filled CTA, rest outline/text | Three black buttons in a row |
| Remove lines and inner boxes | Add a border to "separate" things |

## Review template
- "What's #1 here? The total. Make it 28 light; the rest 14 #505050."
- "Avatar is bigger than the content → 40px."
- "Don't separate with color, separate with hierarchy: shrink these, enlarge that."
- "Be bolder: 20 → 28 and drop the box."
