# Anti-patterns: symptom → why → fix

Use this table for fast triage. Each fix is the default; adapt values to project tokens.

## Typography
| Symptom | Why it hurts | Fix |
| --- | --- | --- |
| Text 10–11px | unreadable "dust"; accessibility | `font-size:12px` minimum; informational body 14 |
| Body 12–13 because "no space" | critical info shrunk | re-layout; 14–16; allow 2 lines |
| Title 40 on a 375 frame | eats the screen; volume unbalanced | 28; sub 14–16 |
| Bold everywhere | screen shouts; no hierarchy | 400/500 body, 600 titles; size does the emphasis |
| Same level, different metrics | inconsistency reads as sloppiness | one token: 140% / -2.5% |
| Tracked-out paragraphs | harder to read | `letter-spacing:0` on body; tracking only on small caps labels |
| Two or three families mixed | cheap, incoherent | one family; max two with a rule |
| Odd display/sci-fi headline font | looks cheap next to body | same family, larger size |
| Justified text | rivers, uneven spacing | `text-align:left` |
| #999 body text | reads as disabled | #767676 (meta) / #505050 (body) |
| Pure black long text on white | heavy for long reading | #111 headline, #505050 body |
| Line length 100+ chars | eye loses the line | `max-width:65ch` (~600px) |
| Date "10.16", no AM/PM | ambiguous | full notation |

## Spacing & layout
| Symptom | Why | Fix |
| --- | --- | --- |
| Looks "chopped up" | margins inconsistent | fix vertical margins first; tokens 8/16/24/32 |
| Related items far apart (price vs discount) | grouping breaks | put in one flex group, gap 4–8 |
| Inner gap = container padding | group doesn't read as a group | inner < padding (16 → 8) |
| Everything equally spaced | no rhythm | 8 inside, 24–40 between groups |
| Side margin 36 on mobile | floats, wastes width | 16/20/24 |
| Chips/buttons with no vertical padding | cramped, untappable | 6–12 vertical |
| Mixed left/center alignment | layout feels random | one axis, left by default |
| Centered text in a two-column hero | column edge disappears | left-align the column |
| Labels/inputs on different column edges | zig-zag scan | one column edge, labels above |
| Cards all same size everywhere | monotone grid | vary one point corner; 2/3 split |
| Boxes inside boxes, lines everywhere | clutter | remove inner containers and separators |
| Photo cuts off a person's arm | sloppy | enlarge/align to edge |
| Mixed thumbnail ratios | messy | `aspect-ratio` + `object-fit:cover` |
| Content under the bottom bar / home indicator | unreachable | `env(safe-area-inset-bottom)` |

## Color & contrast
| Symptom | Why | Fix |
| --- | --- | --- |
| 4+ chromatic colors | attention split | brand 1 + sub 1–2; remove the rest |
| Accent on labels, icons, borders, CTA | nothing stands out | accent on primary CTA only |
| Red "forgot password?" | reads as error | normal text color |
| Gray buttons/boxes | look disabled | white + 1px line, or brand |
| Colored card on gray / gray card on color | "pukey mix" | white card or same-hue tint |
| Over-saturated green/blue | crude | lower S/L one step |
| Mid-tone background | text can't contrast | light or dark background |
| Text 3–4:1 on white | fails AA | ≥ 4.5:1; #767676 minimum on white |
| Status by color only | color-blind users lost | icon + text |
| Purposeless gradient / glass / blur | noise | remove; if kept 2–10%, one direction |
| Dark mode pure black + pure white | harsh | #101114-ish bg, #E3 text |

## Components & effects
| Symptom | Why | Fix |
| --- | --- | --- |
| Drop shadow 20–25% | distracts from content | 2–3% (≤10%), blur 8–12 |
| Text shadow / emboss | dated, hurts legibility | remove |
| Shadow on low-contrast element | blurs the edge further | remove shadow, fix contrast |
| 0.5px borders | render issues, breaks the standard | 1px light |
| Icons mixing line/fill or 1.5/2px | inconsistent | one style, one stroke |
| Icon with no label | guesswork | label or `aria-label` |
| Three equal black CTAs | collide | one filled, others outline/text |
| Button without hover/focus/pressed/disabled | no feedback; a11y fail | 7 states |
| `outline:none` with no focus style | keyboard users lost | `:focus-visible` ring |
| Card always "floating" | heavy | flat default, lift on hover |
| Neumorphism / glass stack | trend, low contrast | flat card, one subtle shadow |
| Permanent big chips/tags | messy | small, quiet, or plain text |
| Hamburger on desktop | hides nav for no reason | full links; hamburger only when forced |
| No active-page state in nav | lost | `aria-current` styling |
| Carousel hiding plans/features | content hidden, rarely swiped | static list |

## Forms & UX
| Symptom | Why | Fix |
| --- | --- | --- |
| Underline-only inputs | not recognized as fields | 1px border |
| Placeholder as label | label disappears on typing | real label above |
| "Form error" banner | user can't find the error | inline error + field highlight + fix text |
| Success and failure in one message | conflicting | one message, one CTA |
| Two primary buttons (Sign in / Register) | decision friction | second as text link |
| Missing password confirmation / attach / max count | flow incomplete | add them |
| Extra steps where one click works | friction | shortcut |
| Compare via hover only | can't compare several | click to open multiple |
| No empty / loading / error state | real users see blank screens | design them |
| Slow load (~60 perf score), 3D for its own sake | users leave | optimize, cut gimmicks |
| CTA out of thumb reach on mobile | hard to tap | bottom placement / sticky CTA |

## Copy
| Symptom | Why | Fix |
| --- | --- | --- |
| "Welcome to X" headline | says nothing | what it does + what to do |
| Feature-list hero | not motivating | pain-point headline |
| "Submit", "Click here" | outcome unclear | "Send message", "Start free trial" |
| Filler words ("지금", "바로") | noise | delete |
| Walls of text | nobody reads | cut, chunk, headings |

## Feedback templates
- "12 is small. 14, medium." · "24 is too big. 20." · "Drop the bold; regular is enough."
- "12 spacing is tight. 16." · "The line isn't needed — remove it." · "Take the color out; just black."
- "Left-align only, and tone the color down a notch." · "Be bolder: make it bigger."
- "Gray looks disabled." · "Red looks like an error." · "Is this shadow really necessary?"
- "What else can we remove?" — ask it last, every time.
