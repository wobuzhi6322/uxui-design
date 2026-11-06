# uxuidesign skill v2

An agent skill for reviewing and patching **web UI in HTML/CSS/JS/TS** with the design rules of @UXUIDesign (디자이너 마디아, Madia) as the priority source, extended with distilled, source-tagged rules from overseas UI/UX YouTube channels (DesignCourse, Mizko, Jesse Showalter, Figma, UX Design Institute, AJ&Smart, CharliMarieTV, Flux Academy).

This repository — https://github.com/wobuzhi6322/uxui-design — is the skill. Install it by copying or cloning the folder into your agent skills directory (for example `~/.cursor/skills/uxui-design/` or `~/.claude/skills/uxui-design/`). The agent reads `SKILL.md` at the root of this folder.

```
.
├── SKILL.md                      # trigger, workflow, default numbers, decision rules, checklist, reference map
├── references/
│   ├── typography.md
│   ├── spacing-layout.md
│   ├── color-contrast-accessibility.md
│   ├── hierarchy.md
│   ├── components-states.md
│   ├── design-systems-tokens.md
│   ├── forms-ux-patterns.md
│   ├── responsive.md
│   ├── motion.md
│   ├── copy.md
│   ├── research-process.md
│   ├── anti-patterns.md          # symptom → why → fix table + Madia's feedback templates
│   └── sources.md                # channels, processing method, ~130 videos used (titles + URLs)
├── assets/
│   ├── tokens.css                # drop-in CSS variables + base components (button 7 states, input, card, nav, toast)
│   └── lint-checklist.md         # automated rule table + manual browser checklist
└── scripts/
    └── ui-lint.mjs               # zero-dependency heuristic linter for CSS/HTML/JSX/Vue/Svelte (exit 1 on errors)
```

## Using it
- Agents load `SKILL.md` (≈9 KB) and open a `references/*.md` file only for the layer being reviewed (progressive disclosure).
- Lint: `node scripts/ui-lint.mjs <file|dir> [--json] [--warn-only]`.
- Tokens: import `assets/tokens.css` or copy the `:root` block into the project's token file and override brand colors.

## What changed vs v1
| | v1 | v2 |
|---|---|---|
| Language | Korean body (`BODY.md`) + short English `SKILL.md` | All English, written for agents ("do X when Y") |
| Structure | 2 files, one 12-section monolith | Lean `SKILL.md` + 13 topic references + tokens + lint (progressive disclosure) |
| Sources | @UXUIDesign only | @UXUIDesign kept verbatim in numbers and priority (`[M]`), plus 8 overseas channels (3,903 transcripts, ~9.6M words) processed programmatically; every rule tagged with its source; `sources.md` lists the videos used |
| Trigger | "Use when reviewing or patching web UI with Madia principles" | Precise description covering review/audit/polish, each UI layer, states, responsive, motion, copy, tokens; explicit exclusions (Figma, logo/brand) |
| Workflow | 5-step procedure | 7-step workflow (gather with DevTools → name the primary element → layered audit → subtract → token-first patching → verification incl. keyboard/contrast/breakpoints/lint → finding format) |
| Numbers | Madia's values | Same values, plus overseas scales where Madia had none: 4/8-pt spacing, 12-col grid margins/gutters, type-scale ratios, 60-30-10 color budget, measure (60–70 chars), motion durations (sub-second, 500ms+ sluggish), WCAG large-text rule |
| New topics | — | Design systems/tokens (atomic structure, 10-gray/5-step ramps, naming), forms & UX laws (Fitts/Hick/Jakob/Von Restorff/serial position), error-copy pattern, empty/first-time states, three user roles, responsive verification routine, motion enter/exit + reduced motion, UX writing checklist, critique and dev-QA method, 5-second test |
| Decision rules | implicit | Explicit if/then rules and recorded source conflicts (body 14–16 app vs 18 marketing; size > tone > weight; Madia's minimal palette wins) |
| Code | principle → CSS property table | CSS/JS snippets per topic, `tokens.css`, button/input/card/toast/nav patterns with all states |
| Verification | manual checklist | Manual checklist + runnable `ui-lint.mjs` (23 heuristics: min font size, tracked paragraphs, #999 text, 0.5px borders, heavy/text shadows, outline:none without focus style, contrast ratio, slow motion, missing reduced-motion, small buttons, unlabeled fields, icon-only buttons, weak CTA copy…) |
| Dropped | Portfolio/career/AI commentary, Korean quote blocks | Kept only the parts that change UI decisions (AI as executor, business-goal language) |

## Provenance
Rules were extracted from caption transcripts only. Madia's instructions take precedence on any conflict. Overseas rules are tagged per channel; untagged numbers are Madia's. Where this skill adds an implementation default not stated by a source, it is labeled "skill default".
