# UI copy and notation

Tags: `[M]` @UXUIDesign (priority) · `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma (Config: "Writing is designing") · `[CM]` CharliMarieTV.
"Words are material" `[FG]`. "Less words. Words are heavy; they take space" `[JS]`. "'Now' isn't needed — just this" `[M]`.

## 1. Notation accuracy `[M]`
- Dates in full: "10월 16일", not "10.16일"; times with AM/PM; don't omit required information (payment time, unit).
- Numbers: use + / − / arrows to carry meaning ("+2,700P"); don't cram number and unit when it hurts legibility.
- Consistent case per role (Title Case for titles, Sentence case for body, one choice for buttons).
- Text-style buttons ("Learn more") are light by nature — don't over-dress them.

## 2. Headlines and hero copy
- One message per hero: what you do, in one sentence; three messages at once confuse `[MZ]`. "Welcome to X" is not a headline `[DC]`.
- Target the user's pain, not your feature list: "Struggling to keep up with multiple social accounts?" beats "Simpler social media tools" `[MZ]`.
- 5-second test: a stranger must say what the page is and what to do `[DC]`.
- People scan: short lines, no buzzwords, no long paragraphs above the fold `[JS]`. Portfolio/landing text walls without hierarchy are skipped `[FX]`.
- Headline visually first; supportive imagery helps the sentence land `[MZ][DC]`.

## 3. Buttons and labels
- Label = the action's outcome: "See my work", "Start free audit", "Add to cart" — not "Submit", "Click here", a scroll arrow, or "Contact" when a value proposition converts better `[DC][MZ]`.
- Before writing a button label, ask `[FG]`: What did the user see before? What happens after? Does it do the thing or open a screen to do it? Is a button even the right component (menu item, link)? What is the inverse action? Will it truncate when translated (Norwegian was the example)? Does it fit voice and tone?
- Icon-only controls need a visible label or `aria-label`; "what does this icon do?" is a daily complaint `[MZ]`.
- Prioritize: one primary action label; "Cancel / Exit / Try again / Contact care" together means nobody chose `[MZ]`.

## 4. Errors, feedback, micro-copy
- Error pattern `[MZ]`: **what happened → why → way out → how to fix**, one CTA, no mixed messages ("Your changes were saved" next to "Could not connect" conflicts).
- Inline, specific, instructive: "Email needs an @ — e.g. name@example.com" instead of "Form error" `[JS]`.
- Confirmations are short and immediate (toast "Added to cart"); decisions get an alert with clear options `[M]`.
- Placeholders hint, don't label: "Search movies and shows", "Enter your dream home's address" `[JS]`.
- Frame the page with a question/instruction instead of assuming ("Where are you heading?") `[MZ]`.
- Keep "important kindness", remove "excessive kindness": one helpful line, not three disclaimers `[M]`.

## 5. Content for mockups and reviews
- Use realistic content, not lorem ipsum: generate a fictional but plausible brief and real-length strings so layouts are tested honestly `[DC]`.
- Test the longest real strings (names, product titles, translations) and 2–3-line wraps `[M]`.
- Designers and copywriters iterate together; copy changes layout and vice versa `[CM]`.

## 6. Feedback tone (how this skill speaks) `[M]`
Short, decisive, value-first: "Too strong." "Too small — 14." "Remove." "Push the contrast." "Keep it clean." Every note ends in a value or an action.

## Rewrite table
| Before | After | Why |
|---|---|---|
| Welcome to Egg Timer | Simple countdown timer — start in one tap | says what it is `[DC]` |
| Simpler social media tools | Struggling to keep up with five social accounts? | pain, not feature `[MZ]` |
| Submit | Send message | outcome `[DC]` |
| Form error | Email needs an @ — e.g. name@example.com | specific, fixable `[JS]` |
| Your changes were saved. We could not connect your account. | We couldn't connect your account (network issue on our side). Try again → | no conflict, one CTA `[MZ]` |
| 10.16일 결제 | 10월 16일 오후 3:20 결제 | complete notation `[M]` |
| 지금 바로 확인하기 | 확인하기 | filler removed `[M]` |

## CSS/HTML helpers
```css
.btn{ white-space:nowrap; }                 /* labels that wrap look broken; shorten the copy instead */
.truncate{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }   /* only where truncation is acceptable */
[lang="no"] .btn{ padding-inline:16px; }    /* make room for longer translations [FG] */
```
```html
<button aria-label="Close dialog"><svg aria-hidden="true">…</svg></button>
<input placeholder="Search movies and shows" aria-label="Search">
```
