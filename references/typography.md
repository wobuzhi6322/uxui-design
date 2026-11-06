# Typography

"Fix fonts and spacing and the screen changes 180 degrees". Most review feedback is font + whitespace.

## 1. Family
- One family per product; Korean/multilingual default Pretendard. Mixed KR/EN/button fonts is an immediate defect.
- Latin-only UI fonts with proven legibility and x-height ~68–72%: Inter, Space Grotesk, Work Sans, DM Sans, Satoshi, Open Sans.
  Tried-and-true fonts over "the Harry Potter font"; a simple sans-serif is right 9 times out of 10, serif in UI only where it fits.
- Brand-heavy display fonts belong in banners, not UI. A sci-fi/odd headline font next to a plain body font looks cheap.
- Need two families? Pair display + body deliberately (e.g. serif headline + sans body) and keep it everywhere; if pairing is hard, use one.
- Pick a family with 5–6+ weights so hierarchy can use weight without switching fonts.
- Swapping families changes apparent size because x-height differs; re-check sizes and line-heights after any font change.
- Decide per text whether it is live text or image before handoff.

```css
:root { --font-sans: "Pretendard Variable", Pretendard, Inter, -apple-system, system-ui, "Segoe UI", sans-serif; }
html { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
```

## 2. Scale (sizes only from the scale)
- Base scale: **12 / 14 / 16 / 20 / 24 / 28**, display 32 / 40 / 48. "Many random sizes break visual consistency and break the dev's shared classes".
- Base 14–16, ratio 1.2 (minor third) for dense UI; 1.333–1.618 only for marketing/awards-style pages.
  Production scale: labels 12/14/16 (+2 steps), headings 18/20/24/28/32/36 with line-heights 24/28/32/36/40/44 (+4 steps).
- Most frequently prescribed sizes: 14 > 16 > 12 > 13 > 18 > 20.

| Role | Default | Notes |
|---|---|---|
| Caption / date / tag / meta | 12–14 | secondary info only |
| Body (app, informational) | 14–16 | mobile informational text ≥ 14 |
| Body (marketing long-form, desktop) | 16–18 | 18 (up to 24) acceptable |
| Subtitle / section label | 18–20 | |
| Title (mobile) | 24–28 | 40 "too big → 28"; 24 "big → 20" are typical corrections |
| Hero / display | 32–48 | desktop hero headline 60–70px is fine when the rest is scaled |
| Key number / price | 24–40, light weight | "big and thin looks refined" |

Rules
- Never below 12. 10/11 is "dust".
- Never shrink information the user must not miss just to fit space; re-layout instead.
- Oversized titles/logos/avatars are as wrong as tiny text: *shrink the big, grow the small*.
- Button label volume should match the body text beside it.
- Emphasis: increase size clearly; don't rely on weight alone. Headline must be unmistakably larger than its subheadline (99/100).

```css
:root{
  --fs-12:.75rem; --fs-14:.875rem; --fs-16:1rem; --fs-18:1.125rem; --fs-20:1.25rem;
  --fs-24:1.5rem; --fs-28:1.75rem; --fs-32:2rem; --fs-40:2.5rem; --fs-48:3rem;
}
/* fluid display size: min 40px, 5vw in between, max 70px */
.hero-title{ font-size: clamp(2.5rem, 5vw, 4.375rem); }
```

## 3. Weight
- Default regular (400) / medium (500); titles semibold (600). "Drop the bold", "semibold → just medium" are the most common corrections.
- Title lacks presence → go one step (500 → 600) and increase size, not 700.
- Bold everywhere makes the screen "loud"; remove bold before adding anything.
- Use weight as the third lever, after size and tone. Do not stack weight, size, and color together.

## 4. Line-height and letter-spacing
- Default set: **line-height 140%, letter-spacing -2.5%** regardless of size. Titles 120–130% / -2% to -3%. Two-line headlines ~130%.
- Long paragraphs use 1.5; 16px/24px aligns to an 8px baseline grid. Use 1.5 for long reading text, 1.4 for UI text.
- Same-level texts must share metrics (120%/-3% next to 130%/-3.5% is a defect).
- Lines feel tight → widen; paragraphs without enough line-height read as "typography stinks".
- Positive letter-spacing on paragraphs is wrong ~99% of the time with well-made fonts. The only accepted use: small uppercase labels/tags (e.g. 12–14px, `text-transform: uppercase`, `letter-spacing: .05–.1em`).
- Labels (one line) need less line-height than paragraphs; use separate label vs paragraph styles.

```css
body{ font-size:var(--fs-16); line-height:1.4; letter-spacing:-0.025em; color:var(--text-1); }
h1,h2,h3{ line-height:1.2; letter-spacing:-0.02em; font-weight:600; text-wrap: balance; }
p.long{ line-height:1.5; max-width:65ch; }
.label-caps{ font-size:var(--fs-12); text-transform:uppercase; letter-spacing:.08em; font-weight:500; }
```

## 5. Text color (4-step system)
| Role | Value | Notes |
|---|---|---|
| Primary text / titles | #111111 (also #191919, #222) | near-black, not pure #000 for long text |
| Secondary | #505050 | body lighter than headline, e.g. #4F4F4F |
| Tertiary / meta | #767676 | |
| Disabled only | #999999 — **never for body** ("pigeon gray") | |
| On dark surfaces | — | #E3E3E3 or white at reduced opacity for body, pure white for headline |

- Hierarchy by tone before weight: "raise/lower emphasis with color, not bold".
- Contrast ≥ 4.5:1 is accessibility, not taste: "fixing it because accessibility fails, not because it's prettier". Measure, don't eyeball.
- Opacity ladders for black text: 100 → 70 → 50; readability floor ≈ 60%.

## 6. Measure, alignment, wrapping
- Line length 60–70 characters standard; ~40 for short blurbs/pull quotes; 10–14 words per line. Text containers capped ~600px. Use `max-width: 60–70ch`.
- Left-align by default; justify creates rivers — never. Center only for single short lines with a reason.
- Design for 2- and 3-line cases and the longest realistic string (names, titles); clamp with `-webkit-line-clamp` only when truncation is acceptable.
- Titles: `text-wrap: balance`; body: `overflow-wrap: anywhere` for user content.

```css
.clamp-2{ display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
```

## 7. Notation and micro-copy (see copy.md)
- Write dates fully ("10월 16일", not "10.16일"); include AM/PM for times; don't glue numbers to units when it hurts reading; use +/−/arrows for change (“+2,700P”).
- Consistent case in English (one of Title Case / Sentence case / UPPER per role).

## Do / Don't
| Do | Don't |
|---|---|
| One family, 5–6 sizes, 2–3 weights | Mixed families per language or per component |
| 14–16 body, 12 floor | 10–13 body because "no space" |
| 1.4 / -0.025em (1.5 for long text) | Default `normal` line-height on paragraphs |
| Enlarge the title, lighten the meta | Bold the title, bold the meta, bold the button |
| #505050 / #767676 for secondary text | #999 or 40% black as readable text |
| Uppercase tracked labels at 12px | Tracked paragraphs, justified text |

## Review template
- "12 is small → 14, weight 500."
- "24 is big here → 20; keep the sub at 14."
- "Drop bold, regular is enough; the hierarchy comes from size."
- "Line-height is tight → 140%; tracking -2.5% like everything else."
- "#999 reads as disabled → #767676."
