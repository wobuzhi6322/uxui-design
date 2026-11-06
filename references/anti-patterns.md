# Anti-patterns: symptom → why → fix

Tags: `[M]` @UXUIDesign (priority) · `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma · `[UXDI]` UX Design Institute · `[FX]` Flux Academy · `[CM]` CharliMarieTV.
Use this table for fast triage. Each fix is the default; adapt values to project tokens.

## Typography
| Symptom | Why it hurts | Fix | Src |
|---|---|---|---|
| Text 10–11px | unreadable "dust"; accessibility | `font-size:12px` minimum; informational body 14 | M |
| Body 12–13 because "no space" | critical info shrunk | re-layout; 14–16; allow 2 lines | M |
| Title 40 on a 375 frame | eats the screen; volume unbalanced | 28; sub 14–16 | M |
| Bold everywhere | screen shouts; no hierarchy | 400/500 body, 600 titles; size does the emphasis | M |
| Same level, different metrics | inconsistency reads as sloppiness | one token: 140% / -2.5% | M |
| Tracked-out paragraphs | harder to read | `letter-spacing:0` on body; tracking only on small caps labels | DC |
| Two or three families mixed | cheap, incoherent | one family; max two with a rule | M, DC |
| Odd display/sci-fi headline font | looks cheap next to body | same family, larger size | DC |
| Justified text | rivers, uneven spacing | `text-align:left` | JS |
| #999 body text | reads as disabled | #767676 (meta) / #505050 (body) | M |
| Pure black long text on white | heavy for long reading | #111 headline, #505050 body | M, JS |
| Line length 100+ chars | eye loses the line | `max-width:65ch` (~600px) | JS, MZ |
| Date "10.16", no AM/PM | ambiguous | full notation | M |

## Spacing & layout
| Symptom | Why | Fix | Src |
|---|---|---|---|
| Looks "chopped up" | margins inconsistent | fix vertical margins first; tokens 8/16/24/32 | M |
| Related items far apart (price vs discount) | grouping breaks | put in one flex group, gap 4–8 | M |
| Inner gap = container padding | group doesn't read as a group | inner < padding (16 → 8) | MZ |
| Everything equally spaced | no rhythm | 8 inside, 24–40 between groups | M |
| Side margin 36 on mobile | floats, wastes width | 16/20/24 | M |
| Chips/buttons with no vertical padding | cramped, untappable | 6–12 vertical | M, JS |
| Mixed left/center alignment | layout feels random | one axis, left by default | M, DC |
| Centered text in a two-column hero | column edge disappears | left-align the column | DC |
| Labels/inputs on different column edges | zig-zag scan | one column edge, labels above | DC |
| Cards all same size everywhere | monotone grid | vary one point corner; 2/3 split | M, JS |
| Boxes inside boxes, lines everywhere | clutter | remove inner containers and separators | M, DC, JS |
| Photo cuts off a person's arm | sloppy | enlarge/align to edge | DC |
| Mixed thumbnail ratios | messy | `aspect-ratio` + `object-fit:cover` | M |
| Content under the bottom bar / home indicator | unreachable | `env(safe-area-inset-bottom)` | M |

## Color & contrast
| Symptom | Why | Fix | Src |
|---|---|---|---|
| 4+ chromatic colors | attention split | brand 1 + sub 1–2; remove the rest | M |
| Accent on labels, icons, borders, CTA | nothing stands out | accent on primary CTA only | JS, M |
| Red "forgot password?" | reads as error | normal text color | M |
| Gray buttons/boxes | look disabled | white + 1px line, or brand | M |
| Colored card on gray / gray card on color | "pukey mix" | white card or same-hue tint | DC |
| Over-saturated green/blue | crude | lower S/L one step | M |
| Mid-tone background | text can't contrast | light or dark background | DC |
| Text 3–4:1 on white | fails AA | ≥ 4.5:1; #767676 minimum on white | M, DC |
| Status by color only | color-blind users lost | icon + text | UXDI, M |
| Purposeless gradient / glass / blur | noise | remove; if kept 2–10%, one direction | M |
| Dark mode pure black + pure white | harsh | #101114-ish bg, #E3 text | DC, JS |

## Components & effects
| Symptom | Why | Fix | Src |
|---|---|---|---|
| Drop shadow 20–25% | distracts from content | 2–3% (≤10%), blur 8–12 | M, DC |
| Text shadow / emboss | dated, hurts legibility | remove | DC |
| Shadow on low-contrast element | blurs the edge further | remove shadow, fix contrast | DC |
| 0.5px borders | render issues, breaks the standard | 1px light | M |
| Icons mixing line/fill or 1.5/2px | inconsistent | one style, one stroke | M |
| Icon with no label | guesswork | label or `aria-label` | MZ |
| Three equal black CTAs | collide | one filled, others outline/text | M |
| Button without hover/focus/pressed/disabled | no feedback; a11y fail | 7 states | M, FG |
| `outline:none` with no focus style | keyboard users lost | `:focus-visible` ring | DC |
| Card always "floating" | heavy | flat default, lift on hover | M |
| Neumorphism / glass stack | trend, low contrast | flat card, one subtle shadow | DC, M |
| Permanent big chips/tags | messy | small, quiet, or plain text | M |
| Hamburger on desktop | hides nav for no reason | full links; hamburger only when forced | DC |
| No active-page state in nav | lost | `aria-current` styling | DC |
| Carousel hiding plans/features | content hidden, rarely swiped | static list | MZ |

## Forms & UX
| Symptom | Why | Fix | Src |
|---|---|---|---|
| Underline-only inputs | not recognized as fields | 1px border | DC |
| Placeholder as label | label disappears on typing | real label above | DC |
| "Form error" banner | user can't find the error | inline error + field highlight + fix text | JS |
| Success and failure in one message | conflicting | one message, one CTA | MZ |
| Two primary buttons (Sign in / Register) | decision friction | second as text link | JS |
| Missing password confirmation / attach / max count | flow incomplete | add them | M |
| Extra steps where one click works | friction | shortcut | M |
| Compare via hover only | can't compare several | click to open multiple | M |
| No empty / loading / error state | real users see blank screens | design them | MZ |
| Slow load (~60 perf score), 3D for its own sake | users leave | optimize, cut gimmicks | FX, JS |
| CTA out of thumb reach on mobile | hard to tap | bottom placement / sticky CTA | FX, M |

## Copy
| Symptom | Why | Fix | Src |
|---|---|---|---|
| "Welcome to X" headline | says nothing | what it does + what to do | DC |
| Feature-list hero | not motivating | pain-point headline | MZ |
| "Submit", "Click here" | outcome unclear | "Send message", "Start free trial" | DC |
| Filler words ("지금", "바로") | noise | delete | M |
| Walls of text | nobody reads | cut, chunk, headings | JS, FX |

## Madia's feedback templates (use this voice)
- "12 is small. 14, medium." · "24 is too big. 20." · "Drop the bold; regular is enough."
- "12 spacing is tight. 16." · "The line isn't needed — remove it." · "Take the color out; just black."
- "Left-align only, and tone the color down a notch." · "Be bolder: make it bigger."
- "Gray looks disabled." · "Red looks like an error." · "Is this shadow really necessary?"
- "What else can we remove?" — ask it last, every time.
