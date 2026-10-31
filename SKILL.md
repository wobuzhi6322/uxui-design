---
name: uxui-design
description: Web UI design rules as concrete CSS/HTML/Tailwind values — type scale, spacing, grouping, color restraint, hierarchy, component specs, interaction states, and a review protocol. Use when building pages or components for a website or web app, reviewing UI that "looks off", or turning a design brief into frontend code. Not for operating Figma.
---

# uxui-design — web UI rules (agent runtime)

Apply when writing or changing **HTML / CSS / JS-TS / React / Tailwind** for a website or web app, or when reviewing a rendered page or screenshot. Ground truth is `BODY.md` in this directory; do not add rules that are not there.

## Load
- Always: `BODY.md` §2 (tokens) and §13 (checklist).
- Building: add §3–§9 for the parts you touch, §10 if the input is a Figma spec.
- Reviewing or fixing: add §11 (corrections → patch) and §12 (protocol).

## Non-negotiables
1. One font family (default Pretendard); one rule for Latin text.
2. Nothing under 12px. Must-read text ≥ 14px mobile / 16px desktop. Never shrink text to fit.
3. Body `line-height: 1.4; letter-spacing: -0.025em`; titles `1.2–1.3 / -0.03em`. Same level, same values.
4. Weights 400/500/600. Emphasize with size, then tone; weight last.
5. Text colors `#111111 / #505050 / #767676`; `#999999` only for disabled/placeholder. All text ≥ 4.5:1 on its real background (`#767676` passes only on pure white).
6. Left-align by default. Center only with a reason.
7. Mobile side margin 16/20/24; desktop content 1320px / 12 columns; min desktop 1280; mobile 360–390.
8. Related items touch (icon↔label 4–8), groups separate; all sizes and gaps are even numbers.
9. Fewer colors: brand + 1–2 sub + one point color used once per screen. Red = error, gray fill = disabled.
10. No box inside a box; no dividers spacing can replace; lines 1px light, never 0.5px; shadows 2–6%, never >10%.
11. Icons one style and one stroke width; sizes 16/20/24. 2–3 control heights (40/48/56) shared by buttons, inputs, selects; header 60–80.
12. Every control has default/hover/focus/pressed/disabled (+loading, selected). Desktop gets hover; compare-type info opens on click.

## Procedure
**Build**
1. Write one line: the most important information or action on this screen.
2. Paste the `:root` tokens from §2 (or map them to the project's tokens); set brand colors from the brief.
3. Lay out on the grid with left alignment; set three type levels; space with the scale; then add color only where importance demands it.
4. Define states for every control; handle 2–3-line text, empty/loading/error, 1280 and 390 breakpoints.
5. Removal pass: delete any line, box, color or effect the screen works without. Run §13.

**Review / fix**
1. Name the primary information/action. Audit in order: type → space → align/group → color → hierarchy → components → states → responsive.
2. Record findings as `[Area] problem → user impact → patch with values` (format in §12).
3. Patch shared tokens/classes first, components second, page one-offs last. Do not restructure a layout that tuning can fix.
4. Verify `:hover :focus-visible :active :disabled`, loading/toast, touch areas, `env(safe-area-inset-bottom)`, breakpoints.

## Constraints
- Do not assume Figma; translate any Figma term with §10.
- Keep brand tokens out of this skill; take them from the project.
- Report to humans short and decisive ("too strong", "too small", "remove it", "push the contrast").
