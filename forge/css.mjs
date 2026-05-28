/**
 * Forge theme CSS.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Forge-specific design tokens and theme-prefixed layout selectors.
 */

import manifest from "./manifest.mjs";
import COMPONENTS_CSS from "./components.mjs";

// ── Hex-to-HSL conversion ───────────────────────────────────────────────────

function parseHex(hex) {
	let h = hex.startsWith("#") ? hex.slice(1) : hex;
	if (h.length === 3) {
		h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
	}
	if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) return undefined;
	return {
		r: Number.parseInt(h.slice(0, 2), 16),
		g: Number.parseInt(h.slice(2, 4), 16),
		b: Number.parseInt(h.slice(4, 6), 16),
	};
}

function hexToHsl(hex) {
	const rgb = parseHex(hex);
	if (!rgb) return undefined;
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const d = max - min;
	if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let hue;
	if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) hue = ((b - r) / d + 2) / 6;
	else hue = ((r - g) / d + 4) / 6;
	return {
		h: Math.round(hue * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}

function resolveAccent(theme, defaultHue, defaultSat, defaultLit) {
	const primary = theme?.primaryColor ?? theme?.colors?.primary;
	if (primary) {
		const hsl = hexToHsl(primary);
		if (hsl) {
			return { hue: hsl.h, saturation: hsl.s, lightness: hsl.l };
		}
	}
	const hue = theme?.primaryHue ?? defaultHue;
	return { hue, saturation: defaultSat, lightness: defaultLit };
}

// ── Font config ─────────────────────────────────────────────────────────────

const FONT_CONFIG = {
	geist: "'Geist', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	"space-grotesk": "'Space Grotesk', -apple-system, sans-serif",
	"ibm-plex": "'IBM Plex Sans', -apple-system, sans-serif",
	"source-sans": "'Source Sans 3', -apple-system, sans-serif",
	"source-serif": "'Source Serif 4', 'Iowan Old Style', Georgia, serif",
};

// ── Per-theme CSS ───────────────────────────────────────────────────────────

const FORGE_THEME_CSS = `/*
 * Forge Theme — design tokens and layout selectors.
 * Shared component styles live in ./components.mjs (prepended above).
 */

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
  /* Nextra internals */
  --nextra-primary-hue: 228;
  --nextra-primary-saturation: 84%;
  --nextra-primary-lightness: 61%;
  --nextra-bg: 255 255 255;
  --nextra-navbar-height: 54px;

  /* --w-font-family is set inline on <html> by layout.mjs.
     --w-brand-color is also set inline whenever a site config provides
     \`primaryColor\`; this default keeps the token populated otherwise so
     \`--w-accent\` (and everything that derives from it) doesn't fall
     back to \`unset\`. We derive it from the same --nextra-primary-* HSL
     trio above, which buildForgeOverrides keeps in sync with config —
     that way Nextra's internals and the Forge tokens share one source
     of truth, and the Forge default (hue 228 = blue per manifest) shows
     through whenever a site doesn't configure its own accent. */
  --w-brand-color:   hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) var(--nextra-primary-lightness));

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        var(--w-brand-color);
  --w-accent-soft:   color-mix(in srgb, var(--w-accent) 10%, white);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 32%, white);

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #ffffff;
  --w-border:        #e5e7eb;
  --w-border-soft:   #f3f4f6;
  --w-text-strong:   #111827;
  --w-text:          #374151;
  --w-text-soft:     #6b7280;
  --w-text-faint:    #9ca3af;
  --w-hover-bg:      #f9fafb;

  /* ── Component colour tokens ────────────────────────── */
  --w-code-bg:             #f8fafc;
  --w-code-shadow:         0 1px 3px rgba(0,0,0,0.04);
  --w-filename-header-bg:  var(--w-border-soft);
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 85%, black);
  --w-inline-code-bg:      var(--w-accent-soft);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 18%, white);
  --w-card-bg:             #ffffff;
  --w-scrollbar-thumb:     #d1d5db;

  /* ── Header (navbar) ────────────────────────────────── */
  --header-bg:             #ffffff;
  --header-border:         #e5e7eb;
  --header-logo-color:     #111827;
  --header-search-bg:      #f3f4f6;
  --header-search-border:  #e5e7eb;
  --header-search-color:   #6b7280;
  --header-kbd-bg:         #ffffff;
  --header-kbd-color:      #9ca3af;

  /* ── Left-hand nav (sidebar) ────────────────────────── */
  --nav-bg:                #f3f4f6;
  --nav-border:            #e5e7eb;
  --nav-section-color:     #9ca3af;
  --nav-item-color:        #4b5563;
  --nav-item-hover-bg:     #e9ebee;
  --nav-item-hover-color:  #111827;
  --nav-active-bg:         #ffffff;
  --nav-active-color:      var(--w-accent);
  --nav-active-bar:        var(--w-accent);
  --nav-footer-bg:         #eceef1;
  --nav-footer-border:     #e5e7eb;
  --nav-footer-color:      #6b7280;
}

.dark {
  --nextra-bg: 17 17 17;
  --nextra-primary-lightness: 61%;

  --w-accent-soft:   color-mix(in srgb, var(--w-accent) 15%, #111111);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 45%, #111111);
  --w-bg:            #111111;
  --w-border:        #2d2d2d;
  --w-border-soft:   #1a1a1a;
  --w-text-strong:   #f9fafb;
  --w-text:          #d1d5db;
  --w-text-soft:     #9ca3af;
  --w-text-faint:    #6b7280;
  --w-hover-bg:      #1e1e1e;

  --w-code-bg:             #161616;
  --w-code-shadow:         none;
  --w-filename-header-bg:  #1a1a1a;
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 60%, white);
  --w-inline-code-bg:      color-mix(in srgb, var(--w-accent) 12%, #111111);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 22%, #111111);
  --w-card-bg:             #161616;
  --w-scrollbar-thumb:     #3d3d3d;

  --header-bg:             #111111;
  --header-border:         #2d2d2d;
  --header-logo-color:     #f9fafb;
  --header-search-bg:      #1e1e1e;
  --header-search-border:  #2d2d2d;
  --header-search-color:   #9ca3af;
  --header-kbd-bg:         #2d2d2d;
  --header-kbd-color:      #4b5563;

  --nav-bg:                #1a1a1a;
  --nav-border:            #2d2d2d;
  --nav-section-color:     #6b7280;
  --nav-item-color:        #9ca3af;
  --nav-item-hover-bg:     #222222;
  --nav-item-hover-color:  #f9fafb;
  --nav-active-bg:         #242424;
  --nav-active-color:      color-mix(in srgb, var(--w-accent) 60%, white);
  --nav-active-bar:        color-mix(in srgb, var(--w-accent) 60%, white);
  --nav-footer-bg:         #111111;
  --nav-footer-border:     #2d2d2d;
  --nav-footer-color:      #6b7280;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════════════════════ */

html {
  font-family: var(--w-font-family) !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.011em;
}

body { background-color: var(--w-bg); }

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR LOGO — pinned to very top of sidebar column
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-sidebar-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 295px;
  height: var(--nextra-navbar-height);
  background: var(--nav-bg);
  /* Above the navbar (z-100) so the pinned logo isn't painted over by
     the navbar's opaque background. */
  z-index: 110;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  flex-shrink: 0;
}

.forge-sidebar-logo a {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--nav-item-hover-color);
  text-decoration: none;
}
.forge-sidebar-logo a svg,
.forge-sidebar-logo a img {
  flex-shrink: 0;
  color: var(--w-accent);
}
.forge-sidebar-logo a img { height: 24px; width: auto; }
.forge-sidebar-logo a:hover { opacity: 0.75; }

/* Theme default mark + wordmark — used when a site doesn't configure
   any logo of its own. Both pieces (the anvil SVG and the "Forge"
   wordmark <b>) get the accent so the all-defaults presentation reads
   clearly as the theme's brand colour. Selector specificity (0,2,0)
   beats the broader '.forge-sidebar-logo a svg' / '.forge-navbar-logo
   svg' colour rules (0,1,2) by class count, and the rule applies to the
   <b> wordmark directly so it overrides the parent <a>/<span>
   text-strong inheritance. */
.forge-sidebar-logo .forge-logo-default,
.forge-navbar-logo  .forge-logo-default {
  color: var(--w-accent);
}

/* Sidebar logo hides with the sidebar at BP2. */
@media (max-width: 899px) {
  .forge-sidebar-logo { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR SEARCH — pinned below the logo
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-sidebar-search {
  position: fixed;
  top: var(--nextra-navbar-height);
  left: 0;
  width: 295px;
  padding: 0.625rem 1rem;
  background: var(--nav-bg);
  /* Above the navbar (z-100) for the same reason as .forge-sidebar-logo. */
  z-index: 110;
}

.forge-sidebar-search .nextra-search input {
  width: 100% !important;
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.4375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-family: inherit !important;
  color: var(--w-text-soft) !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}
.forge-sidebar-search .nextra-search input::placeholder {
  color: var(--w-text-faint) !important;
}
.forge-sidebar-search .nextra-search input:focus {
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  outline: none !important;
  color: var(--w-text-strong) !important;
}
.forge-sidebar-search .nextra-search kbd {
  background: var(--w-border-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.25rem !important;
  color: var(--w-text-faint) !important;
  font-family: inherit !important;
  font-size: 0.625rem !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}
.dark .forge-sidebar-search .nextra-search input {
  background: var(--w-border-soft) !important;
}

/* Push the sidebar scroll area below the pinned logo + search. Use margin (not
   padding) so the scroll BOX itself — and therefore its scrollbar — begins below
   the pinned header, instead of running full-height up behind the logo/search.
   The div's own p-4 then gives the first nav item a clean gap under the search.
   It's a flex grow child, so the margin correctly reduces its height. */
.nextra-sidebar > div:first-child {
  /* Clears the pinned logo (navbar-height) + the pinned search box below it.
     3.5rem is sized to the search box's height with only a hair of slack, so the
     first nav item sits snug under the search without slipping behind it. */
  margin-top: calc(var(--nextra-navbar-height) + 3.5rem) !important;
  /* Trim the scroll area's default p-4 top padding so the first nav item sits
     closer under the search. */
  padding-top: 0.375rem !important;
  /* Nudge the nav item highlight to line its left/right edges up with the search
     bar above: a touch more left padding, and less right padding (the reserved
     scrollbar lane already adds to the right inset). */
  padding-left: 1.1rem !important;
  padding-right: 0.4rem !important;
}

/* Top-level nav list spacing — across all pages the top-level rows (leaves and
   groups alike) read tighter than the nested lists. Add row-gap to the top-level
   list only. It sits directly in the scroll area (or one wrapper div in), never
   inside an li, so ul:not(li ul) targets it without touching nested lists. */
.nextra-sidebar > div:first-child ul:not(li ul) {
  row-gap: 0.25rem !important; /* match the nested lists' gap-1 */
}

/* Gap between a folder header and its first nested item — only when the folder
   is open (Nextra adds .open to the li). When closed, the collapsible wrapper
   below is 0 height, so this margin would just inflate the gap to the next group. */
.nextra-sidebar li.open > a:first-child,
.nextra-sidebar li.open > button:first-child {
  margin-bottom: 0.25rem !important;
}

/* Trim the gap below a sidebar section separator (a li with no link/button/ul
   inside — just heading text/span). Nextra's default bottom spacing reads a bit
   loose under the separator; pull it in to ~75% of current. */
.nextra-sidebar li:not(:has(a)):not(:has(button)):not(:has(ul)) {
  margin-bottom: 0.125rem !important; /* ~50% of Nextra's default mb-2 (0.5rem) */
}

/* Sidebar scrollbar — thin, no track background, just the thumb. */
.nextra-sidebar > div:first-child {
  scrollbar-width: thin !important;
  scrollbar-color: var(--w-scrollbar-thumb) transparent !important;
}
.nextra-sidebar > div:first-child::-webkit-scrollbar { width: 4px !important; height: 4px !important; }
.nextra-sidebar > div:first-child::-webkit-scrollbar-track { background: transparent !important; }
.nextra-sidebar > div:first-child::-webkit-scrollbar-thumb {
  background: var(--w-scrollbar-thumb) !important;
  border-radius: 999px !important;
}

/* Sidebar scroll fade. Nextra's .nextra-mask statically fades BOTH the top and
   bottom 20px of the scroll area — but the top is anchored by the pinned search,
   so a fade there only dims the first item and reads as extra padding. Default
   to fading the bottom edge only (single-layer gradient, crisp top); then, where
   scroll-driven animations are supported, fade the top edge in over the first
   20px of scroll so it appears only once there's content scrolled above. Browsers
   without scroll timelines keep the crisp-top fallback. */
/* NOTE: no !important here — important author declarations outrank CSS
   animations in the cascade, so it would block the scroll-driven keyframes
   below. The selector's specificity (0,3,1) already beats Nextra's .nextra-mask
   (0,1,0), so the base fade still wins without it. */
.nextra-sidebar > div:first-child.nextra-mask {
  -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
}
@supports (animation-timeline: scroll()) {
  .nextra-sidebar > div:first-child.nextra-mask {
    animation: forge-sidebar-scroll-fade linear both;
    animation-timeline: scroll(self);
    animation-range: 0 20px;
  }
}
@keyframes forge-sidebar-scroll-fade {
  from {
    -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
            mask-image: linear-gradient(to bottom, #000 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
  }
  to {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%);
  }
}

/* Portaled dropdowns (search results, navbar Menu, ThemeSwitch Select).
   Nextra renders these via HeadlessUI Menu/Listbox/Combobox with the
   anchor prop, which portals the panel into a body-level
   <div data-headlessui-portal>. The panel itself ships with x:z-30
   (z-index: 30) which would otherwise sit BELOW the navbar (z=100) and
   the pinned sidebar logo/search (z=110), causing the dropdowns to
   clip behind the header. We elevate the portal wrapper to z=200 to
   beat both. position: relative is required because z-index has no
   effect on the default position: static — without it the rule
   silently does nothing. Fixed-positioned descendants (the MenuItems
   panel) are unaffected since we don't introduce a transform/filter on
   the wrapper.
   Current stacking order: portaled dropdowns (200) > sidebar logo/search
   (110) > navbar (100) > drawer (60) > sidebar tree (10). */
.nextra-search-results,
[data-headlessui-portal],
[data-floating-ui-portal] {
  position: relative;
  z-index: 200 !important;
}

/* In-component results (fallback for non-portal renders). */
.nextra-search ul,
.nextra-search [role="listbox"],
.nextra-search [role="dialog"],
.nextra-search > div:not(:first-child),
.nextra-search > p {
  z-index: 200 !important;
  position: relative;
}

/* Sidebar search hides with the sidebar at BP2 — the navbar's own search
   stays visible since it lives in a different DOM slot. */
@media (max-width: 899px) {
  .forge-sidebar-search { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER / NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-navbar-blur {
  background-color: var(--header-bg) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: 1px solid var(--nav-bg) !important;
}

.nextra-navbar nav {
  max-width: 100% !important;
  padding-left: calc(295px + 1.5rem) !important;
  padding-right: 1.5rem !important;
  gap: 1.25rem !important;
}

.nextra-navbar nav > a:not([href="/"]) {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  font-family: inherit !important;
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
  transition: color 0.12s !important;
}
.nextra-navbar nav > a:not([href="/"]):hover {
  color: var(--w-text-strong) !important;
}

/* When the sidebar collapses (BP2), drop the 295px left reservation so
   the navbar content (incl. the navbar logo that now appears) starts
   flush with the article column instead of sitting in the empty space
   the sidebar used to occupy. */
@media (max-width: 899px) {
  .nextra-navbar nav {
    padding-left: 1.5rem !important;
  }
}
@media (max-width: 767px) {
  .nextra-navbar nav {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

/* Desktop: hide the navbar logo (sidebar logo takes over) */
.nextra-navbar nav > a[href="/"] {
  display: none !important;
}

/* Show the navbar logo whenever the sidebar (and its forge-sidebar-logo)
   has collapsed — i.e. from BP2 down — so the bar always has a logo. */
@media (max-width: 899px) {
  .nextra-navbar nav > a[href="/"] {
    display: flex !important;
    align-items: center !important;
    margin-right: auto !important;
  }
}

/* Hide page-map duplicates from the navbar pages strip on desktop —
   .forge-nav-link items render via Navbar JSX children instead. */
.nextra-navbar nav > div > a[target="_blank"]:not(.forge-nav-link) {
  display: none !important;
}

/* Layering during the BP1–BP2 transition where the sidebar coexists with
   the hamburger drawer. The drawer uses \`inset-0\` and paints its own
   background across the whole viewport (its inner content is just padded
   below the navbar) — without an explicit z-order, the drawer covers
   *both* the sidebar AND the hamburger button itself, hiding the X-icon
   transform. We pin:
     navbar  (100) — stays on top so the hamburger button + close icon
       remain visible and clickable while the drawer is open;
     drawer  (60)  — above the sidebar so the open drawer is visible;
     sidebar (10)  — below both. */
header.nextra-navbar { z-index: 100 !important; }
.nextra-mobile-nav   { z-index: 60 !important; }
aside.nextra-sidebar { z-index: 10 !important; }

/* Progressive navbar collapse. The hamburger drawer already mirrors every
   nav surface, so as the viewport narrows we move items from the bar into
   the drawer in three stages, each tied to roughly the width where the
   relevant cluster starts to crowd the bar:
     BP1 (≤1099px) — drop the inline header links (.forge-nav-link) and
       the navbar theme switcher; surface the hamburger and allow the
       mobile drawer to open at this width.
     BP2 (≤899px)  — drop the internal Navbar JSX strip (Get Started, API
       Reference, Community, …) as well; the hamburger remains the only
       visible nav surface in the bar.
     BP3 (≤767px)  — sidebar tree collapses too (handled in the LAYOUT
       section), leaving content full-bleed with hamburger-only nav. */
@media (max-width: 1099px) {
  .nextra-navbar nav > .forge-nav-link            { display: none !important; }
  .nextra-navbar nav > button[title="Change theme"] { display: none !important; }
  .nextra-navbar .nextra-hamburger                { display: flex !important; }
  .nextra-mobile-nav                              { display: flex !important; }
}

/* Pin inline header items to the theme font explicitly. */
.nextra-navbar nav > a.forge-nav-link {
  font-family: var(--w-font-family) !important;
}

/* External-link arrow on inline header items — matches the ↗ used on cards. */
.forge-nav-link[href^="http"]::after {
  content: '↗';
  display: inline-block;
  margin-left: 0.2em;
  font-size: 0.85em;
  font-family: var(--w-font-family);
  color: var(--w-text-faint);
  transition: color 0.12s;
}
.forge-nav-link[href^="http"]:hover::after { color: var(--w-text-strong); }

.forge-navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--w-text-strong);
}
.forge-navbar-logo svg,
.forge-navbar-logo img {
  flex-shrink: 0;
  color: var(--w-accent);
}
.forge-navbar-logo img { height: 24px; width: auto; }

/* Internal nav-strip (Get Started / API Reference / Community …). Hidden
   by default so Tailwind's x:flex utility can't reassert itself between
   BP2 and BP1, then re-shown at BP2 (≥900px) with the desktop flex row
   layout. The un-layered base rule beats the layered Tailwind utility
   regardless of specificity. */
.nextra-navbar nav > div:not(:has(.nextra-search)) {
  display: none;
}
@media (min-width: 900px) {
  .nextra-navbar nav > div:not(:has(.nextra-search)) {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    overflow: visible;
  }
}

.nextra-navbar .nextra-search { margin-left: auto; }
.forge-sidebar-search .nextra-search { margin-left: 0; width: 100%; }

.nextra-search input {
  width: 13rem !important;
  background: var(--header-search-bg) !important;
  border: 1px solid var(--header-search-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-family: inherit !important;
  color: var(--header-search-color) !important;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s !important;
}
.nextra-search input::placeholder { color: var(--header-search-color) !important; }
.nextra-search input:focus {
  background: var(--w-bg) !important;
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  outline: none !important;
  color: var(--w-text-strong) !important;
}

.nextra-search kbd {
  background: var(--header-kbd-bg) !important;
  border: 1px solid var(--header-search-border) !important;
  border-radius: 0.25rem !important;
  color: var(--header-kbd-color) !important;
  font-family: inherit !important;
  font-size: 0.625rem !important;
  letter-spacing: 0.02em !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}

.nextra-hamburger {
  color: var(--w-text-soft) !important;
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
}
.nextra-hamburger:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN LAYOUT — 5-col grid
   col: [sidebar 295px] [1fr] [article 920px] [toc 252px] [1fr]
   ═══════════════════════════════════════════════════════════════════════════ */

div:has(> aside.nextra-sidebar) {
  display: grid !important;
  grid-template-columns: 295px 1fr 920px 252px 1fr !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  align-items: start !important;
}

aside.nextra-sidebar { grid-column: 1 !important; grid-row: 1 !important; }
article              { grid-column: 3 !important; grid-row: 1 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }
nav.nextra-toc       { grid-column: 4 !important; grid-row: 1 !important; width: 252px !important; order: unset !important; }

/* Footer outer wrapper — Nextra renders this as a full-width div outside the
   main grid. Give it the same column template so its children land under the
   article column, not the sidebar. */
body > div:has(> footer) {
  display: grid !important;
  grid-template-columns: 295px 1fr 920px 252px 1fr !important;
  background: var(--w-bg) !important;
}

body > div:has(> footer) > * {
  grid-column: 3 !important;
  min-width: 0 !important;
  max-width: 100% !important;
}

/* Tablet: TOC hidden, article becomes fluid (max 920px). */
@media (max-width: 1279px) {
  div:has(> aside.nextra-sidebar) {
    grid-template-columns: 295px minmax(0, 1fr) !important;
  }
  body > div:has(> footer) {
    grid-template-columns: 295px minmax(0, 1fr) !important;
  }
  article {
    grid-column: 2 !important;
    max-width: 920px !important;
  }
  body > div:has(> footer) > * { grid-column: 2 !important; }
  nav.nextra-toc { display: none !important; }
}

/* Small tablet: shrink article horizontal padding. */
@media (max-width: 900px) {
  article { padding: 1rem 1.75rem 4.5rem !important; }
}

/* BP2 (≤899px): sidebar collapses behind the hamburger drawer; article
   and footer cells move to a single grid column. The 920px article
   max-width from the 1279 media query above still applies, so we center
   the article with margin: 0 auto rather than left-pinning it. Between
   BP1 (1100) and BP2 (900) the sidebar coexists with an open hamburger
   drawer; the drawer z-index override below keeps it on top. */
@media (max-width: 899px) {
  div:has(> aside.nextra-sidebar)  { grid-template-columns: 1fr !important; }
  body > div:has(> footer)          { grid-template-columns: 1fr !important; }
  aside.nextra-sidebar             { display: none !important; }
  article                          { grid-column: 1 !important; margin: 0 auto !important; }
  body > div:has(> footer) > *      { grid-column: 1 !important; }
}

/* BP3 (≤767px): phone-only padding tighten — keeps content readable on
   narrow viewports without the chunky tablet gutter. Top padding is
   reduced from the desktop/tablet 1rem since the navbar is compact
   and there's no breadcrumb spacing to absorb. */
@media (max-width: 767px) {
  article { padding: 0 1.25rem 4rem !important; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR / LEFT-HAND NAV
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-sidebar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 295px !important;
  min-width: 295px !important;
  height: 100dvh !important;
  background: var(--nav-bg) !important;
  border-right: none !important;
  z-index: 35 !important;
}

div:has(> aside.nextra-sidebar)::before {
  content: '';
  display: block;
  grid-column: 1;
  grid-row: 1;
  width: 295px;
  pointer-events: none;
}

:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul {
  gap: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) ul > li:not(:has(> a, > button)) {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--nav-section-color) !important;
  padding: 0.375rem 0.5rem 0.25rem 0.875rem !important;
  margin-top: 1.05rem !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li:first-of-type:not(:has(> a, > button)) {
  margin-top: 0.5rem !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > button {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--nav-item-color) !important;
  padding: 0.3125rem 0.5rem 0.3125rem 0.875rem !important;
  border-radius: 0.375rem !important;
  background: none !important;
  transition: background 0.1s, color 0.1s !important;
  width: 100% !important;
  text-align: start !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > a:hover,
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul {
  padding-inline-start: 0 !important;
  margin-inline-start: 0 !important;
  padding-top: 0 !important;
}
/* Clip the Nextra <Collapse> wrapper during the open/close animation
   so the inner items fold/unfold from the top instead of appearing
   instantly at full text. Without this, Nextra's wrapper has
   overflow:visible while opening (it only sets overflow:hidden via
   the closed-state class), so the inner <ul> renders at full size
   while the wrapper's height animates from 0 to natural — items
   read as "appearing instantly" while the surrounding layout slides
   down around them. After the animation completes Nextra calls
   removeProperty('height') and the wrapper sits at height:auto, so
   nothing is clipped in the steady state. */
:is(.nextra-sidebar, .nextra-mobile-nav) li > div {
  padding-top: 0 !important;
  overflow: hidden !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li.open > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li.open > button {
  padding-bottom: 0.5rem !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul::before {
  display: none !important;
  width: 0 !important;
}

/* Nested sidebar items — base styling for any nesting depth */
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > button {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--nav-item-color) !important;
  padding-top: 0.3125rem !important;
  padding-bottom: 0.3125rem !important;
  padding-right: 0.5rem !important;
  border-radius: 0.375rem !important;
  background: none !important;
  transition: background 0.1s, color 0.1s !important;
  margin: 0 !important;
  position: relative !important;
  overflow: visible !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > a:hover,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

/* Progressive indent per nesting depth.
   Each Nextra nesting wrapper is li > div > ul; chain it once per depth. */
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > button {
  padding-left: calc(0.875rem + 0.625rem) !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > div > ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > div > ul > li > button {
  padding-left: calc(0.875rem + 1.25rem) !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > div > ul > li > div > ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul > li > div > ul > li > div > ul > li > button {
  padding-left: calc(0.875rem + 1.875rem) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a:hover {
  color: var(--nav-active-color) !important;
  background: var(--nav-active-bg) !important;
}

.nextra-sidebar-footer { display: none !important; }

.nextra-navbar .nextra-theme-switch { display: flex; align-items: center; }
.nextra-navbar .nextra-theme-switch span { display: none !important; }
.nextra-navbar .nextra-theme-switch button {
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
  color: var(--w-text-soft) !important;
  background: none !important;
  border: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.1s, color 0.1s;
}
.nextra-navbar .nextra-theme-switch button:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

.nextra-mobile-nav {
  background: var(--nav-bg) !important;
}
.nextra-mobile-nav > div:first-child {
  padding: 0.75rem 1rem 1rem !important;
}
.nextra-mobile-nav .nextra-sidebar-footer {
  display: flex !important;
  background: transparent !important;
  border-top: none !important;
}
.nextra-mobile-nav .nextra-sidebar-footer button {
  font-size: 0.75rem !important;
  font-family: inherit !important;
  font-weight: 500 !important;
  color: var(--nav-footer-color) !important;
  border-radius: 0.375rem !important;
  padding: 0.3125rem 0.5rem !important;
  transition: background 0.1s, color 0.1s !important;
}
.nextra-mobile-nav .nextra-sidebar-footer button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

/* Containerize each top-level page-section / menu in the mobile drawer
   so they read as distinct cards instead of blending into a flat
   stack of items. Targets direct \`<li>\` children of the drawer's
   top-level \`<ul>\` that have a header \`<button>\` — that's how
   Nextra renders both type:page Folders (data-href="/...") and
   type:menu items (e.g. Community). External link items (Status,
   Pricing, Dashboard) render as \`<li><a>\` and don't match, so
   they stay flat above the containerized sections.
   Nextra's existing collapse/expand behavior is untouched. */
@media (max-width: 767px) {
  /* Switch the drawer UL from Nextra's grid to flex+wrap so the
     external-link items can flow inline (Status / Pricing /
     Dashboard on one row) while the containerized sections still
     take a full row each via flex-basis: 100%. Row + column gap
     replaces the per-LI margins so spacing stays consistent. */
  .nextra-mobile-nav > ul {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.5rem 0 !important;
    align-items: flex-start !important;
  }

  /* Inline external links inherit the sidebar item's left-indented
     padding (0.875rem left, 0.5rem right) which makes them sit too
     far apart in a horizontal row. Override to asymmetric padding —
     a bit more on the left so the first item doesn't sit flush
     against the drawer edge, but not so much that adjacent items
     drift apart. */
  .nextra-mobile-nav > ul > li:has(> a[target="_blank"]) > a {
    padding: 0.3125rem 0.375rem 0.3125rem 0.75rem !important;
  }

  .nextra-mobile-nav > ul > li:has(> button) {
    flex-basis: 100% !important;
    background: var(--w-bg) !important;
    border: 1px solid var(--w-border) !important;
    border-radius: 0.5rem !important;
    margin: 0 !important;
  }

  /* Section header (the collapsible button) — slightly bolder so the
     container reads as a card with a header row. */
  .nextra-mobile-nav > ul > li:has(> button) > button {
    font-weight: 600 !important;
    color: var(--w-text-strong) !important;
    padding: 0.6875rem 0.875rem !important;
    border-radius: 0.5rem 0.5rem 0 0 !important;
  }
  .nextra-mobile-nav > ul > li:has(> button):not(.open) > button {
    border-radius: 0.5rem !important;
  }
  .nextra-mobile-nav > ul > li:has(> button) > button:hover {
    background: var(--w-hover-bg) !important;
  }

  /* Inner item list when expanded — subtle divider + breathing room.
     Scoped to .open so the closed-state Collapse wrapper (height: 0
     under overflow: hidden) doesn't render a sliver of padding under
     the header. Tailwind's box-sizing: border-box would otherwise
     keep the padding visible even at height: 0. */
  .nextra-mobile-nav > ul > li.open:has(> button) > div {
    padding: 0.625rem 0.5rem 0.75rem !important;
    border-top: 1px solid var(--w-border-soft) !important;
  }

  /* Shift per-level indents one step shallower for items INSIDE a
     containerized top-level section. The container's header button
     is itself an extra wrapper level vs. the desktop sidebar (which
     just renders the page's docs subtree at the root of the
     sidebar's UL), so the same item ends up one level deeper in
     mobile and would pick up the deeper-nesting padding. Walking
     it back by one level lines the items up with the desktop
     sidebar's indentation and with the GUIDES separator (which
     uses a flat 0.875rem from elsewhere). */
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > a,
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > button {
    padding-left: 0.875rem !important;
  }
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > div > ul > li > a,
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > div > ul > li > button {
    padding-left: calc(0.875rem + 0.625rem) !important;
  }
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > div > ul > li > div > ul > li > a,
  .nextra-mobile-nav > ul > li:has(> button) > div > ul > li > div > ul > li > div > ul > li > button {
    padding-left: calc(0.875rem + 1.25rem) !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOC — right column
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-toc {
  width: 252px !important;
  min-width: 0 !important;
  padding-top: 1rem !important;
  padding-left: 2rem !important;
  position: sticky !important;
  top: var(--nextra-navbar-height) !important;
  max-height: calc(100vh - var(--nextra-navbar-height)) !important;
  overflow-y: auto !important;
}

.nextra-toc > div > p:first-child {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--w-text-faint) !important;
  padding: 1.5rem 1rem 0.5rem !important;
}

.nextra-toc ul { padding: 0.5rem 1rem 1rem !important; }
.nextra-toc ul li { margin: 0 !important; }
.nextra-toc ul li a {
  font-size: 0.8125rem !important;
  font-weight: 400 !important;
  color: var(--w-text-soft) !important;
  padding: 0.3rem 0 !important;
  display: block !important;
  transition: color 0.12s !important;
  line-height: 1.4 !important;
}
.nextra-toc ul li a:hover { color: var(--w-accent) !important; }
.nextra-toc ul li a[class*="font-semibold"] {
  color: var(--w-accent) !important;
  font-weight: 500 !important;
}

.nextra-toc > div > div:last-child { display: none !important; }
`;

// ── Override generator ──────────────────────────────────────────────────────

function buildForgeOverrides(input) {
	const hue = input.accentHue;
	const sat = input.accentSaturation ?? 84;
	const lit = input.accentLightness ?? 61;
	const accentDarkL = Math.min(lit + 7, 100);

	const fontDecl = input.fontFamily ? `  --w-font-family: ${input.fontFamily};\n` : "";
	const bgLightDecl = input.backgroundLight ? `  --w-bg: ${input.backgroundLight};\n` : "";
	const bgDarkDecl = input.backgroundDark ? `  --w-bg: ${input.backgroundDark};\n` : "";

	return `
/* ── Forge theme overrides (generated) ──────────────────────────────────── */
:root {
${fontDecl}${bgLightDecl}  --nextra-primary-hue:        ${hue};
  --nextra-primary-saturation: ${sat}%;
  --nextra-primary-lightness:  ${lit}%;
}

.dark {
${bgDarkDecl}  --nextra-primary-lightness: ${accentDarkL}%;
}
`;
}

// ── Public API ──────────────────────────────────────────────────────────────

export function buildCss(config) {
	const accent = resolveAccent(
		config?.theme,
		manifest.defaults.primaryHue,
		manifest.defaults.accentSaturation,
		manifest.defaults.accentLightness,
	);
	const requestedFont = typeof config?.theme?.fontFamily === "string" ? config.theme.fontFamily.trim() : "";
	const fontFamily = requestedFont || manifest.defaults.fontFamily;
	const fontCss = FONT_CONFIG[fontFamily] ?? FONT_CONFIG[manifest.defaults.fontFamily];

	return (
		COMPONENTS_CSS +
		"\n" +
		FORGE_THEME_CSS +
		buildForgeOverrides({
			accentHue: accent.hue,
			accentSaturation: accent.saturation,
			accentLightness: accent.lightness,
			fontFamily: fontCss,
			backgroundLight: config?.theme?.background?.light,
			backgroundDark: config?.theme?.background?.dark,
		})
	);
}
