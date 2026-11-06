# Motion and micro-interactions

Tags: `[M]` @UXUIDesign (priority) · `[DC]` DesignCourse · `[MZ]` Mizko · `[JS]` Jesse Showalter · `[FG]` Figma (Motion/Edu) · `[UXDI]` UX Design Institute · `[FX]` Flux Academy.
"Key buttons give immediate visual feedback; screens get simpler and buttons fade back" `[M]`. "There is room for some movement in every project — some more, some less" `[DC]`.

## 1. Purpose first
- Motion exists for feedback (pressed, loading, success), orientation (where did it go), and hierarchy (reveal the primary first) `[M][JS]`.
- Hover effects on PC are expected; a card that lifts on hover beats a card that is always floating `[M]`.
- Moving visuals must never steal attention from content: fast-moving portfolio pieces make work unreadable `[FX]`; auto-rotating carousels hide primary content `[MZ]`.
- Add delight only after the basics work `[JS]`.

## 2. Durations and easing
- UI runs sub-second: ~250ms feels quick, 400ms is a comfortable reveal, 500ms+ starts to feel sluggish `[FG]`. Hover transitions in practice 200–500ms `[DC]`.
- Never linear for UI; use ease-out or a `cubic-bezier` curve `[DC]`. Stagger lists by 100–200ms per item `[DC]`.
- Larger or longer moves get the longer end; color/opacity changes get the short end.

```css
:root{ --dur-fast:150ms; --dur-base:250ms; --dur-slow:400ms; --ease-out:cubic-bezier(.2,.8,.2,1); --ease-in-out:cubic-bezier(.4,0,.2,1); }
.btn{ transition: background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.card{ transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.card:hover{ transform:translateY(-2px); box-shadow:var(--shadow-2); }
```

## 3. Enter / exit patterns
- Every animated element needs a defined start and end state. Keep it in the DOM at `opacity:0` (and `visibility:hidden`), don't remove it, or it cannot animate back `[MZ]`.
- Mask reveal: parent `overflow:hidden`, child `translateY(100%) → 0`, ~1s with cubic-bezier for hero text (DesignCourse used 1.7s on a headline) `[DC]`. Stagger headline → sub-headline → CTA with small delays `[DC]`.
- Toast ≠ alert `[M]`; skill default timing: fade/slide in 250ms, hold ~2.5s, fade out 200ms.
- Dropdown/menu: chevron rotates on open, hover-driven with eased transitions `[DC]`; skill default: fade + 4–8px translate, 200ms.
- Loading: spinner or skeleton instead of a blank flash `[JS]`.

```css
.reveal{ overflow:hidden; }
.reveal > *{ transform:translateY(110%); animation: rise .7s var(--ease-out) forwards; }
.reveal > :nth-child(2){ animation-delay:.12s } .reveal > :nth-child(3){ animation-delay:.24s }
@keyframes rise{ to{ transform:none; } }

.toast{ position:fixed; left:50%; bottom:calc(24px + env(safe-area-inset-bottom)); translate:-50% 8px; opacity:0; visibility:hidden;
        transition: opacity var(--dur-base) var(--ease-out), translate var(--dur-base) var(--ease-out), visibility 0s linear var(--dur-base); }
.toast.is-visible{ opacity:1; visibility:visible; translate:-50% 0; transition-delay:0s; }

.menu{ opacity:0; translate:0 -6px; pointer-events:none; transition: opacity 200ms var(--ease-out), translate 200ms var(--ease-out); }
.menu.is-open{ opacity:1; translate:0 0; pointer-events:auto; }
.skeleton{ background:linear-gradient(90deg,#EEE 25%,#F6F6F6 50%,#EEE 75%); background-size:200% 100%; animation:shimmer 1.2s linear infinite; }
@keyframes shimmer{ to{ background-position:-200% 0; } }
```

## 4. Scroll and page transitions
- Scroll-triggered reveals via `IntersectionObserver`, once per element `[DC]`; skill default: short distance (16–24px), ≤400ms.
- Page/route transitions: short translate + fade with cubic-bezier; keep under ~500ms `[DC]`.
- Heavy canvas/3D/GSAP effects only where they carry meaning (education, product demo); check mobile performance `[FX][DC]`.

```js
const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.2});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
```

## 5. Accessibility and performance
- Respect `prefers-reduced-motion`: drop transforms and large movements, keep opacity fades or remove animation entirely `[FG][UXDI]`.
- Animate only `transform` and `opacity`; avoid animating layout properties.
- Autoplay media and parallax need a stop/skip; motion is part of accessibility review `[UXDI]`.

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; scroll-behavior:auto !important; }
}
```

## Do / Don't
| Do | Don't |
|---|---|
| 150–400ms, ease-out | 800ms+ linear hover effects |
| Opacity + transform only | Animating width/height/top/left |
| Keep hidden elements in DOM at opacity 0 | Remove/re-create nodes to "animate" |
| Hover lift on cards, pressed state on buttons | Permanently floating cards, shadows that pulse |
| Reduced-motion fallback | Mandatory intro animations |

## Review template (Madia voice)
- "The card is always floating → flat by default, lift on hover."
- "Button gives no feedback → pressed state, 150ms."
- "Carousel hides the plans → show all three statically."
