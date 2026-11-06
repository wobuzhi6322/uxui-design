# Design systems and tokens (for code)

Tags: `[M]` @UXUIDesign (priority) · `[MZ]` Mizko · `[FG]` Figma · `[CM]` CharliMarieTV · `[DC]` DesignCourse.
"You already have a design system — it just isn't documented" `[CM]`. "Set the guide first: buttons, colors, font sizes, selects, icons, margins" `[M]`.

## 1. Structure (atomic → code)
| Level `[MZ]` | Examples | In code |
|---|---|---|
| Atoms | color, type style, spacing, radius, shadow | CSS custom properties (tokens) |
| Molecules | button, input, checkbox, chip | component classes / small components |
| Organisms | header/GNB, sidebar, card list, form | composed components |
| Templates / pages | layout shells, screens | page CSS, minimal one-offs |

- Fix atoms first; shaky atoms make every higher level wobble `[MZ]`. Patch order `[M]`: tokens → shared classes → page one-offs.
- Common parts are shared and identical everywhere (GNB, footer, buttons, cards) `[M]`; one source of truth reduces rework and rebuilds `[FG]`.
- Prefer component props (`variant`, `size`, `icon`) over an explosion of variants `[FG]`.
- Not every project needs a documented system on day one; it is a living thing that grows `[DC]`. A marketing site still benefits from systematized spacing/components `[CM]`.

## 2. Token sets (values from Madia unless tagged)
Typography
```css
:root{
  --font-sans:"Pretendard Variable",Pretendard,Inter,system-ui,sans-serif;
  --fs-12:.75rem; --fs-14:.875rem; --fs-16:1rem; --fs-18:1.125rem; --fs-20:1.25rem; --fs-24:1.5rem; --fs-28:1.75rem; --fs-32:2rem; --fs-40:2.5rem; --fs-48:3rem;
  --lh-tight:1.2; --lh-title:1.3; --lh-body:1.4; --lh-read:1.5;      /* 1.5 for long text [DC][JS] */
  --ls-body:-0.025em; --ls-title:-0.02em; --ls-caps:.06em;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600;
}
```
Color — Madia's 4 text grays + a small ramp. Mizko ships 10 grays and 5 steps per chromatic role (primary/secondary/success/warning/error), named 50–900 `[MZ]`; keep ramps small and don't add raw hex in components `[MZ][M]`.
```css
:root{
  --gray-50:#F7F7F8; --gray-100:#F0F0F2; --gray-200:#E5E5E5; --gray-300:#DBDBDB; --gray-400:#BDBDBD;
  --gray-500:#999999; --gray-600:#767676; --gray-700:#505050; --gray-800:#2B2B2B; --gray-900:#111111;
  --text-1:var(--gray-900); --text-2:var(--gray-700); --text-3:var(--gray-600); --text-disabled:var(--gray-500);
  --bg:#fff; --bg-soft:var(--gray-50); --line:var(--gray-200); --line-strong:var(--gray-300);
  --brand-500:#2B5BD7; --brand-600:#1E46B0; --brand-50:#EEF3FD;
  --success-500:#1B8A5A; --warning-500:#C98A00; --danger-500:#D23F3F;
}
```
Spacing, radius, shadow, motion
```css
:root{
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px; --sp-8:32px; --sp-10:40px; --sp-15:60px; --sp-20:80px;
  --radius-1:4px; --radius-2:8px; --radius-3:12px; --radius-4:16px; --radius-pill:9999px;
  --shadow-1:0 1px 3px rgb(17 17 17/.03),0 4px 12px rgb(17 17 17/.03);      /* 2–3% [M] */
  --shadow-2:0 2px 6px rgb(17 17 17/.04),0 12px 32px rgb(17 17 17/.06);
  --dur-fast:150ms; --dur-base:250ms; --dur-slow:400ms; --ease-out:cubic-bezier(.2,.8,.2,1);
  --control-h:48px; --gnb-h:72px; --page-x:clamp(16px,4vw,24px); --container:1200px; --measure:600px;
}
```
See `assets/tokens.css` for the drop-in file.

## 3. Naming
- Two layers: primitives (`--gray-700`, `--brand-500`) and semantic aliases (`--text-2`, `--bg-soft`, `--line`). Components reference semantic names only `[MZ][FG]`.
- Name roles, not looks: `--danger` not `--red`; "error color" has a name in the guide `[M]`.
- Keep design and code names aligned (same token names in Figma variables and CSS) so handoff needs no translation `[FG]`.
- States follow one vocabulary everywhere: `default / hover / focus / pressed / disabled / loading` `[M]`.

## 4. Figma concept → CSS mapping (for reading design specs)
| Figma | CSS |
|---|---|
| Auto layout, gap | `display:flex/grid; gap` |
| Padding | `padding` |
| Hug / Fill container | `width:max-content` / `flex:1`, `width:100%` |
| Constraints / min-max | `min-width`, `max-width`, `clamp()` |
| Color / text styles, variables | custom properties |
| Variants | modifier classes or props |
| Layout grid 12 col, margin 32–40, gutter 20 `[MZ]` | `grid-template-columns:repeat(12,1fr); column-gap:20px; padding-inline:32px` |

## 5. Governance for agents
- Before changing a value, search for its token; change the token if the change should be global, else add a semantic alias — never a hard-coded override in a page file `[M]`.
- Keep color count honest: count distinct hex values in CSS; more than ~12 usually means the ramp leaked `[M]`.
- Every component documents its states and sizes in one place (CSS file header or story).
- Don't bloat ramps (50 shades) — reuse the 10-step gray and 5-step brand `[MZ]`.
- Changing a token re-themes everything that references it; test with the lint script and a screenshot diff at 375/1440 `[FG]`.

## Do / Don't
| Do | Don't |
|---|---|
| Semantic aliases in components | `color:#505050` sprinkled in 40 files |
| One `.btn` with modifiers | `.btn-home`, `.btn-cart-page`, `.btn2` |
| 10 grays, 5 brand steps | 50 shades "just in case" |
| Token names shared with design | `--blue2` in CSS, `Primary/Hover` in Figma |
