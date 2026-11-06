#!/usr/bin/env node
/**
 * uxuidesign ui-lint — heuristic checks derived from the skill's rules.
 * Usage: node scripts/ui-lint.mjs <file|dir> [...more] [--warn-only] [--json]
 * Scans .css .scss .less .html .htm .vue .svelte .jsx .tsx .js .ts (inline <style>, style="" and Tailwind arbitrary values).
 * Exit 1 when any ERROR is found (unless --warn-only). No dependencies. Regex-based: treat results as leads, not proof.
 */
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const args = process.argv.slice(2);
const warnOnly = args.includes('--warn-only');
const asJson = args.includes('--json');
const targets = args.filter(a => !a.startsWith('--'));
if (!targets.length) { console.error('usage: node ui-lint.mjs <file|dir> [--warn-only] [--json]'); process.exit(2); }

const EXT = new Set(['.css', '.scss', '.less', '.html', '.htm', '.vue', '.svelte', '.jsx', '.tsx', '.js', '.ts']);
const SKIP_DIR = /node_modules|\.git|dist|build|\.next|coverage/;
const files = [];
const walk = p => { const s = statSync(p); if (s.isDirectory()) { if (!SKIP_DIR.test(p)) readdirSync(p).forEach(f => walk(join(p, f))); } else if (EXT.has(extname(p))) files.push(p); };
targets.forEach(walk);

const findings = [];
const report = (level, rule, file, line, msg) => findings.push({ level, rule, file, line, msg });
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

// ---------- helpers ----------
const toPx = v => { const m = /^(-?[\d.]+)(px|rem|em)?$/.exec(v.trim()); if (!m) return null; const n = parseFloat(m[1]); return m[2] === 'rem' || m[2] === 'em' ? n * 16 : n; };
const hexToRgb = h => { h = h.replace('#', ''); if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join(''); const n = parseInt(h.slice(0, 6), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const contrast = (a, b) => { const [L1, L2] = [lum(a), lum(b)].sort((x, y) => y - x); return (L1 + .05) / (L2 + .05); };
const parseColor = v => { v = v.trim(); if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) return hexToRgb(v); const m = /^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(v); return m ? [+m[1], +m[2], +m[3]] : null; };
const alphaOf = v => { // alpha of rgba()/rgb(/ a)/#rrggbbaa; null if opaque or unknown
  let m = /rgba?\([^)]*?[,/]\s*([\d.]+%?)\s*\)/i.exec(v); if (m) { const a = m[1]; return a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a); }
  m = /#[0-9a-f]{6}([0-9a-f]{2})\b/i.exec(v); if (m) return parseInt(m[1], 16) / 255;
  return /\btransparent\b/.test(v) ? 0 : null;
};
const shadowAlphas = v => v.split(/,(?![^(]*\))/).map(alphaOf).filter(a => a != null);

// ---------- CSS rule extraction (flat; nested @media handled by stripping wrappers) ----------
function* cssRules(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '));
  const re = /([^{}]+)\{([^{}]*)\}/g; let m;
  while ((m = re.exec(clean))) {
    const sel = m[1].trim().split('\n').pop().trim(); // last line = selector (skips @media header lines)
    if (sel.startsWith('@') && !sel.includes(':')) continue;
    const decls = {}; m[2].split(';').forEach(d => { const i = d.indexOf(':'); if (i > 0) { const k = d.slice(0, i).trim().toLowerCase(); decls[k] = d.slice(i + 1).trim().replace(/!important/i, '').trim(); } });
    yield { sel, decls, idx: m.index, raw: m[2] };
  }
}

function lintCss(css, file, lineBase = 0) {
  const L = idx => lineBase + lineOf(css, idx);
  const families = new Set(); const hexes = new Set(); let boldCount = 0; let hasFocusStyle = /:focus(-visible)?\b/.test(css); let outlineNoneAt = [];
  let hasMotion = /transition|animation|@keyframes/.test(css); const hasReduced = /prefers-reduced-motion/.test(css);
  const btnSelectors = []; let btnHover = false, btnFocus = /(^|[\s,}])(:focus-visible|\*:focus-visible|:focus)\s*[{,]/m.test(css); let offScale = 0;

  for (const { sel, decls, idx } of cssRules(css)) {
    const s = sel.toLowerCase(); const ln = L(idx);
    const isBtn = /\bbutton\b|\.btn|\[type="?(submit|button)"?\]/.test(s) && !/::?(before|after)/.test(s);
    const isTokenRoot = /^:root\b|^html$|\[data-theme|^\.theme-/.test(s);
    const isTextish = /\b(p|body|html|li|td|dd|span|label|small)\b|prose|desc|body|text|copy|paragraph/.test(s);
    const isCapsLabel = /caps|label|eyebrow|tag|chip|badge|overline|kicker/.test(s) || /uppercase/.test(decls['text-transform'] || '');
    const isDisabledish = /disabled|placeholder|readonly/.test(s);

    // T1 min font size
    if (decls['font-size']) { const px = toPx(decls['font-size']); if (px != null && px < 12) report('error', 'T1-min-font-size', file, ln, `${sel} font-size ${decls['font-size']} < 12px — never below 12; informational body ≥ 14`); }
    // T2 positive tracking on paragraphs
    if (decls['letter-spacing']) { const v = decls['letter-spacing']; const n = parseFloat(v); if (!isNaN(n) && n > 0 && !isCapsLabel) report('warn', 'T2-tracked-paragraph', file, ln, `${sel} letter-spacing ${v} — positive tracking only on small uppercase labels; use -0.025em (or 0) for text`); }
    // T3 tight line-height on text
    if (decls['line-height'] && isTextish) { const v = decls['line-height']; const n = parseFloat(v); if (!isNaN(n) && !/px|rem|em|%/.test(v) && n < 1.2 && n !== 1) report('warn', 'T3-line-height', file, ln, `${sel} line-height ${v} — body 1.4 (long text 1.5), titles 1.2–1.3`); }
    // T4 justify
    if (/justify/.test(decls['text-align'] || '')) report('warn', 'T4-justify', file, ln, `${sel} text-align: justify — causes rivers; left-align`);
    // T5 bold count
    if (/^(700|800|900|bold|bolder)$/.test(decls['font-weight'] || '')) boldCount++;
    // T6 families
    if (decls['font-family']) decls['font-family'].split(',').slice(0, 1).forEach(f => { const n = f.trim().replace(/["']/g, '').toLowerCase(); if (n && !n.startsWith('var(') && !/^(inherit|initial|unset|system-ui|sans-serif|serif|monospace|-apple-system)$/.test(n)) families.add(n); });
    // C1 #999 as text
    if (decls['color'] && /#999(999)?\b|rgb\(\s*153\s*,?\s*153\s*,?\s*153/i.test(decls['color']) && !isDisabledish) report('warn', 'C1-999-text', file, ln, `${sel} color ${decls['color']} — #999 is the disabled color; use #767676 (meta) or #505050 (body)`);
    // C2 collect hex
    if (!isTokenRoot) Object.values(decls).join(' ').match(/#[0-9a-f]{3,8}\b/gi)?.forEach(h => hexes.add(h.toLowerCase()));
    // C3 contrast when both colors present
    const bg = decls['background-color'] || (decls['background'] && !/url|gradient|var\(/.test(decls['background']) ? decls['background'].split(/\s+/)[0] : null);
    if (decls['color'] && bg) { const fg = parseColor(decls['color']); const b = parseColor(bg); if (fg && b) { const r = contrast(fg, b); const fs = toPx(decls['font-size'] || '16px') || 16; const large = fs >= 24 || (fs >= 18.66 && /^(600|700|800|900|bold)$/.test(decls['font-weight'] || '')); const need = large ? 3 : 4.5; if (r < need) report(r < 3 ? 'error' : 'warn', 'C3-contrast', file, ln, `${sel} ${decls['color']} on ${bg} = ${r.toFixed(2)}:1 (< ${need}:1)`); } }
    // B1 0.5px borders
    const bw = Object.entries(decls).filter(([k]) => /^border|^outline/.test(k)).map(([, v]) => v).join(' ');
    if (/(^|\s)0?\.5px\b/.test(bw)) report('error', 'B1-half-pixel-border', file, ln, `${sel} uses a 0.5px line — use 1px light (#E5E5E5)`);
    // B2 outline none
    if (/^(none|0)$/.test((decls['outline'] || '').trim()) || (decls['outline-width'] || '') === '0') outlineNoneAt.push({ sel, ln });
    // S1 shadow alpha
    if (decls['box-shadow'] && decls['box-shadow'] !== 'none') { const as = shadowAlphas(decls['box-shadow']); const mx = Math.max(0, ...as); if (mx > 0.25) report('error', 'S1-heavy-shadow', file, ln, `${sel} box-shadow alpha ${mx} — cards 2–3%, never above 10%`); else if (mx > 0.10) report('warn', 'S1-heavy-shadow', file, ln, `${sel} box-shadow alpha ${mx} — keep ≤ 10% (2–3% for cards)`); if (!as.length && /#[0-9a-f]{3,6}\b|\b(black|gray|grey)\b/i.test(decls['box-shadow'])) report('warn', 'S1-heavy-shadow', file, ln, `${sel} box-shadow with an opaque color — use rgb(… / .03)`); }
    // S2 text shadow
    if (decls['text-shadow'] && decls['text-shadow'] !== 'none') report('warn', 'S2-text-shadow', file, ln, `${sel} text-shadow — no shadows on text`);
    // M1 slow transitions
    for (const k of ['transition', 'transition-duration', 'animation', 'animation-duration']) { const v = decls[k]; if (!v) continue; const ms = [...v.matchAll(/([\d.]+)(ms|s)\b/g)].map(m => m[2] === 's' ? parseFloat(m[1]) * 1000 : parseFloat(m[1])); const mx = Math.max(0, ...ms); if (mx > 600 && !/@keyframes|shimmer|spin|infinite/.test(v) && !/skeleton|spinner|loader|marquee|hero|reveal/.test(s)) report('info', 'M1-slow-motion', file, ln, `${sel} ${k} ${mx}ms — UI transitions 150–400ms; 500ms+ feels sluggish`); }
    // K1 small buttons
    if (isBtn) { btnSelectors.push(sel); if (/:hover/.test(s)) btnHover = true; if (/:focus/.test(s)) btnFocus = true; for (const k of ['min-height', 'height']) { const px = decls[k] ? toPx(decls[k]) : null; if (px != null && px < 40) report('warn', 'K1-small-button', file, ln, `${sel} ${k} ${decls[k]} — buttons 40–60px tall (44/48 common)`); } }
    // L1 off-scale spacing
    for (const k of ['margin', 'padding', 'gap', 'row-gap', 'column-gap', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-inline', 'margin-block', 'padding-inline', 'padding-block']) {
      const v = decls[k]; if (!v) continue; for (const m of v.matchAll(/(-?\d+(?:\.\d+)?)px/g)) { const n = Math.abs(parseFloat(m[1])); const onScale = n <= 8 ? n % 2 === 0 : n % 4 === 0; if (!onScale) { offScale++; if (offScale <= 5) report('info', 'L1-off-scale-spacing', file, ln, `${sel} ${k}: ${v} — use the 4/8 scale (2 4 6 8 · 12 16 20 24 32 40)`); } }
    }
  }
  if (outlineNoneAt.length && !hasFocusStyle) outlineNoneAt.forEach(({ sel, ln }) => report('error', 'B2-outline-none', file, ln, `${sel} outline:none with no :focus-visible style anywhere — keyboard users lose focus`));
  if (boldCount > 4) report('info', 'T5-bold-overuse', file, 0, `${boldCount} rules use 700+ weight — body 400/500, titles 600; bold is the exception`);
  if (families.size > 2) report('warn', 'T6-font-families', file, 0, `${families.size} font families (${[...families].join(', ')}) — one family, max two with a rule`);
  if (hexes.size > 16) report('info', 'C2-color-sprawl', file, 0, `${hexes.size} distinct hex colors — brand 1 + sub 1–2 + neutrals; move to tokens`);
  if (btnSelectors.length && !(btnHover && btnFocus)) report('info', 'K2-button-states', file, 0, `button rules found but ${!btnHover ? 'no :hover' : ''}${!btnHover && !btnFocus ? ' and ' : ''}${!btnFocus ? 'no :focus(-visible)' : ''} — define default/hover/focus/pressed/disabled/loading`);
  if (hasMotion && !hasReduced) report('info', 'M2-reduced-motion', file, 0, `animations/transitions without a prefers-reduced-motion rule`);
  if (offScale > 5) report('info', 'L1-off-scale-spacing', file, 0, `${offScale} spacing values off the 4/8 scale in total`);
}

function lintMarkup(src, file) {
  // inline <style> blocks
  for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) lintCss(m[1], file, lineOf(src, m.index) - 1);
  // style="" attributes → pseudo rules
  for (const m of src.matchAll(/style\s*=\s*"([^"]*)"/gi)) lintCss(`[inline]{${m[1]}}`, file, lineOf(src, m.index) - 1);
  // Tailwind arbitrary values
  for (const m of src.matchAll(/\btext-\[(\d+(?:\.\d+)?)px\]/g)) if (parseFloat(m[1]) < 12) report('error', 'T1-min-font-size', file, lineOf(src, m.index), `Tailwind text-[${m[1]}px] — never below 12px`);
  for (const m of src.matchAll(/\bborder-\[0?\.5px\]/g)) report('error', 'B1-half-pixel-border', file, lineOf(src, m.index), `Tailwind border-[0.5px] — use 1px light`);
  // H1 img alt
  for (const m of src.matchAll(/<img\b[^>]*>/gi)) if (!/\balt\s*=/.test(m[0])) report('warn', 'H1-img-alt', file, lineOf(src, m.index), `<img> without alt`);
  // H2 inputs without label
  const labelFor = new Set([...src.matchAll(/<label\b[^>]*\bfor\s*=\s*"([^"]+)"/gi)].map(m => m[1]));
  for (const m of src.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const t = m[0]; if (/type\s*=\s*"(hidden|submit|button|reset|checkbox|radio|image)"/i.test(t)) continue;
    const id = /\bid\s*=\s*"([^"]+)"/i.exec(t)?.[1]; const labelled = (id && labelFor.has(id)) || /aria-label(ledby)?\s*=/.test(t) || /<label\b[^>]*>[^<]*$/i.test(src.slice(Math.max(0, m.index - 300), m.index));
    if (!labelled) report('warn', 'H2-unlabeled-field', file, lineOf(src, m.index), `${m[1]} without a <label for> / aria-label — placeholder is a hint, not a label`);
  }
  // H4 icon-only buttons
  for (const m of src.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) { const text = m[2].replace(/<[^>]+>/g, '').trim(); if (!text && !/aria-label(ledby)?\s*=/.test(m[1])) report('warn', 'H4-icon-only-button', file, lineOf(src, m.index), `icon-only <button> without aria-label`); }
  // H5 weak link/CTA copy
  for (const m of src.matchAll(/>\s*(click here|learn more|submit|read more)\s*</gi)) report('info', 'H5-weak-cta-copy', file, lineOf(src, m.index), `"${m[1]}" — say the outcome ("Send message", "See my work")`);
  for (const m of src.matchAll(/<h1\b[^>]*>\s*welcome to\b/gi)) report('info', 'H6-welcome-headline', file, lineOf(src, m.index), `"Welcome to …" headline — say what it is and what to do`);
}

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  if (/\.(css|scss|less)$/.test(f)) lintCss(src, f); else lintMarkup(src, f);
}

const order = { error: 0, warn: 1, info: 2 };
findings.sort((a, b) => order[a.level] - order[b.level] || a.file.localeCompare(b.file) || a.line - b.line);
if (asJson) console.log(JSON.stringify({ files: files.length, findings }, null, 2));
else {
  for (const x of findings) console.log(`${x.level.toUpperCase().padEnd(5)} ${x.rule.padEnd(22)} ${x.file}:${x.line}  ${x.msg}`);
  const c = l => findings.filter(x => x.level === l).length;
  console.log(`\n${files.length} files · ${c('error')} errors · ${c('warn')} warnings · ${c('info')} info. Heuristics only — confirm in the browser (375/1440, Tab order, contrast).`);
}
process.exit(!warnOnly && findings.some(x => x.level === 'error') ? 1 : 0);
