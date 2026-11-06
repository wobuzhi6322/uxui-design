# Research, critique, review process

"Use it, press it, one by one — drawing alone creates problems". "Be data-informed; don't assume everyone can use it because you can".

## 1. How this skill "uses the product" (agent routine)
1. Open the page at 375 and 1440; click every control; Tab through the whole screen; submit each form empty, wrong, and right.
2. Note anything missing from the flow (confirmation field, attach button, max count, profile popup, back path).
3. Screenshot before/after; compare with the design/tokens, not with taste.
4. Record each finding as `problem → user impact → change (selector + values)`.

## 2. Critique method
- Context first: what is the screen for, who uses it, what must happen? Then the first impression.
- Scan: Can I read everything? Is anything way too small or way too big? Is there breathing room? Does the most important thing look most important? Does the eye flow in the intended order? Anything awkward or colliding?
- Squint test / grayscale: hierarchy must survive.
- Be constructive: explain *why*, not just "I don't like it"; you don't need the solution for every note, but this skill always gives the CSS value.
- Not every suggestion must be applied; preference ≠ defect. Keep what's useful, discard the rest.
- "No reviewer gives 100% perfect feedback" — iterate; nothing is approved in one pass.

## 3. Dev-QA review (design vs build)
- Compare the build against the design side by side; most issues are small: uneven spacing, a heading one step too small, a thicker SVG stroke, a missing hover.
- Use DevTools: click the element → Inspect; margin shows orange, padding green; nudge values live (arrow keys, Shift+arrow = 10) to find the right number, then report it.
- Check at every breakpoint; check the real content, not placeholder text.
- Feedback goes to tokens/shared classes when the issue repeats across pages.

## 4. Testing with users (cheap versions)
- 5-second test: show the screen 5s, ask "what is this and what would you do?".
- Unmoderated usability test on a prototype or staging build (missions, expected path, success rate) before handing to dev.
- Mobile usability test: mirror the phone to a laptop, record screen + face + audio; same Wi-Fi; use a decent mic.
- Interviews: set an objective first; ask open "how do you…" not leading "do you use Google…"; never "would you use this feature?"; prepare the participant; ask consent before recording.
- Research removes team bias but is not a ritual; keep it proportional and tie it to business goals. Speak the client's language (growth, revenue), not usability dogma.
- Benchmark by using real competitor products, not by collecting pretty screenshots; Dribbble patterns are often unrealistic.

## 5. Process notes
- Wireframes may be messy; their job is to get ideas down and test hierarchy, not to look good.
- Design the empty/first-time/error states alongside the happy path.
- Think in three user roles (first-time, repeat, super) when deciding what a screen shows.
- Form and function are scored together: a beautiful site that loads slowly or breaks on mobile fails.
- Client work: align on direction first, reveal in stages, judge by "will this raise the company's revenue?" not personal taste.
- AI: use it to execute, not to decide; fully delegated design converges on average "slop"; taste and final calls stay human.

## 6. Finding format (copy this)
```
[Type] Body text 12px on product cards
→ Impact: informational text below 14 is hard to read on mobile; hierarchy collapses with the 12px meta.
→ Change: .card__desc { font-size: 14px; font-weight: 500; color: #505050; }   (token: --fs-14 / --text-2)

[Color] Three accent colors in the header
→ Impact: attention splits; the primary CTA no longer stands out.
→ Change: remove --accent from .nav__badge and .nav__icon; keep it on .btn-primary only.

[State] Inputs have no focus style (outline:none)
→ Impact: keyboard users lose their place; fails accessibility.
→ Change: .field input:focus-visible { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-50); }
```

## Do / Don't
| Do | Don't |
|---|---|
| Click through the real flow before styling | Review from a static screenshot only |
| Numbers from DevTools | "Feels about 20px" |
| Open questions in interviews | "Would you use this?" |
| Constructive why + value | "Looks great" / "Don't like it" |
| Proportional research | Research theater before every change |
