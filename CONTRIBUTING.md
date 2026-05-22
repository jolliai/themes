# Contributing to `themes`

This repo contains **theme overlays** for [Nextra](https://nextra.site) `nextra-theme-docs` documentation sites. Each top-level folder (`jollia/`, `ember/`, `slate/`, `flux/`, `forge/`, `atlas/`, …) is a self-contained theme that ships a small set of `.mjs` files. Those files are consumed by the build pipeline and rendered into a Nextra site as **CSS + an `app/layout.tsx`**.

Nothing in this repo is itself a running site. There is no `package.json`, no `npm install`, no dev server here. Edits are validated by:

1. **CI** ([`.github/workflows/validate.yml`](.github/workflows/validate.yml)) — parses every theme's `manifest.mjs` and `index.mjs` and checks `registry.json` ↔ manifest version agreement.
2. **The developer**, by pointing a local sample-site build at the edited theme and visually diffing the result.

---

## The three projects

Any change you make here must be understood in the context of three repos that work together at build time:

| # | Project | Role |
|---|---------|------|
| 1 | **`themes`** (this repo) | Source of truth for theme overlays. Ships `manifest.mjs`, `index.mjs`, `css.mjs`, `layout.mjs`, and `components.mjs` per theme. **Only CSS + layout — no content.** |
| 2 | **`sample-site`** | The reference content: MDX articles, `_meta.js` files, assets. Provides the *pages* that the theme renders. Lives at <https://github.com/jolliai/sample-site>. |
| 3 | **Built site** | The Nextra Next.js app produced when the builder pulls `sample-site` content + a chosen theme from this repo and writes out `app/layout.tsx` + `styles/themes/<name>.css`. This is the only project that actually runs (`next dev` / `next build`). **Must be supplied by the developer working on the task** — ask for the local path at the start of any visual work, and read `app/layout.tsx` and `styles/themes/<name>.css` there to see exactly what your `.mjs` files produced. |

The user supplies a `sites.json` file in the built site. Its full shape is documented in [`sites-schema.md`](sites-schema.md) — that file is the **source of truth for the `config` argument** passed to every theme's `buildCss(config)` and `generateLayout(config)`. Read it before consuming any new field.

The data flow is one-way:

```
themes/<name>/{manifest,index,css,layout,components}.mjs
        │
        ▼ (build step in the builder, not in this repo)
sample-site MDX content + theme overlay
        │
        ▼
built site:  app/layout.tsx           <-- generated from layout.mjs
             styles/themes/<name>.css <-- generated from css.mjs (which imports components.mjs)
        │
        ▼
next dev / next build  -->  rendered docs
```

Because the build is one-way, **you cannot edit the built site to fix a theme.** Any change must land in the corresponding `.mjs` file here, then be rebuilt.

---

## Repo layout

```
themes/
├── registry.json              # canonical list of published themes + versions
├── sites-schema.md            # user-facing `sites.json` schema (the `config` contract)
├── .github/workflows/         # CI validation
├── atlas/
├── ember/
├── flux/
├── forge/
├── jollia/
└── slate/
    ├── manifest.mjs           # identity + defaults
    ├── index.mjs              # entry point — wires manifest + css + layout
    ├── css.mjs                # exported `buildCss(config)` returning a CSS string
    ├── layout.mjs             # exported `generateLayout(config)` returning an app/layout.tsx string
    └── components.mjs         # default-exports a CSS string of shared component styles (uses --w-* tokens)
```

Every theme has **exactly these five files** under the target convention. CI fails if `manifest.mjs` or `index.mjs` is missing or fails to parse.

> **Migration note.** The themes currently in this repo (`jollia`, `ember`, `slate`, `flux`, `atlas`) inline all of their CSS — both per-theme tokens and shared component styles — into a single `css.mjs` string, with per-theme `--<themeName>-*` token prefixes. The target convention is to **factor shared component styles out into the theme's own `components.mjs` and switch each theme to the `--w-*` token namespace**. Forge has been migrated end-to-end and is the reference implementation; new themes should be written to the new convention from day one. Existing themes should be migrated incrementally — see [Shared components vs. per-theme styles](#shared-components-vs-per-theme-styles).

---

## What each file owns

### `manifest.mjs`
Pure data. The theme's identity and defaults. The shape used by all current themes:

```js
const manifest = {
  name: "jollia",              // must match folder name and registry.json entry
  version: "1.0.0",            // must match registry.json version
  displayName: "Jollia",
  tagline: "…",
  defaults: {
    primaryHue: 158,           // 0–360, drives --nextra-primary-hue
    defaultTheme: "light",     // "light" | "dark" | "system"
    fontFamily: "inter",
  },
  // optional: supports: { pages: false, menuPages: false }
};
export default manifest;
```

See [`jollia/manifest.mjs`](jollia/manifest.mjs) and [`ember/manifest.mjs`](ember/manifest.mjs) for the minimal and `supports`-enabled variants.

### `index.mjs`
The entry point the builder imports. Always re-exports `manifest`, `buildCss`, `generateLayout` as a single default object. Boilerplate — copy from any existing theme, e.g. [`jollia/index.mjs`](jollia/index.mjs):

```js
import manifest from "./manifest.mjs";
import { buildCss } from "./css.mjs";
import { generateLayout } from "./layout.mjs";

export default {
  manifest,
  buildCss(config) { return buildCss(config); },
  generateLayout(config) { return generateLayout(config); },
};
```

### `css.mjs`
Exports `buildCss(config)` returning a CSS **string**. The builder writes this verbatim to `styles/themes/<name>.css` in the built site. The layout imports that file, so anything you put here becomes the theme's stylesheet.

The structure a `css.mjs` should produce, in order:

1. The shared component styles from this theme's [`components.mjs`](forge/components.mjs) — imported as a default-exported string and concatenated to the head of the output.
2. `:root` and `.dark` blocks defining the `--w-*` token values for this theme.
3. `--nextra-primary-*` hue/saturation/lightness overrides matching `manifest.defaults.primaryHue`.
4. Theme-prefixed layout selectors (e.g. `.<theme>-sidebar-logo`) that correspond to JSX rendered only by this theme's `layout.mjs`.
5. Any per-theme overrides of component styles — placed *after* the components string so they win.

Other conventions:

- One big template literal assigned to `const <NAME>_THEME_CSS`; `buildCss` returns `COMPONENTS_CSS + theme + overrides`.
- Liberal use of `!important` is the existing pattern, because we are overriding Nextra's bundled CSS that loads after ours would otherwise. Match the existing style; don't refactor it away.
- Keep mobile rules at the bottom under `@media (max-width: 767px)`.

See [`forge/css.mjs`](forge/css.mjs) for the reference implementation under the new convention. [`jollia/css.mjs`](jollia/css.mjs), [`flux/css.mjs`](flux/css.mjs), [`ember/css.mjs`](ember/css.mjs), [`slate/css.mjs`](slate/css.mjs), and [`atlas/css.mjs`](atlas/css.mjs) still inline shared component styles and use per-theme token prefixes — they should be migrated to match Forge.

### `components.mjs`
Default-exports a CSS **string** of structural and component-level styling that should look the same across themes: article typography, headings, paragraphs, lists, tables, code blocks, breadcrumbs, callouts, cards, sidebar item shapes, navbar mechanics, search-box mechanics.

\`\`\`js
const componentsCss = \`
  article h1 { color: var(--w-text-strong) !important; ... }
  article p  { color: var(--w-text) !important; ... }
  /* ... */
\`;
export default componentsCss;
\`\`\`

**Hard rule: `components.mjs` may not contain a single hard-coded color value.** Every color, background, border, and shadow must be expressed as a `var(--w-*)` reference — the per-theme `css.mjs` is what supplies values for those variables in `:root` and `.dark`.

`components.mjs` lives **inside each theme's folder**, not at the repo root. Each theme owns its own copy so it can diverge for that theme's needs without coordinating cross-theme edits. See [`forge/components.mjs`](forge/components.mjs) for the reference content; new themes should copy and tailor it rather than starting from scratch.

### `layout.mjs`
Exports `generateLayout(config)` returning a **string** of valid JSX/TSX that the builder writes to `app/layout.tsx` in the built site. This is where you decide what Nextra components render (`<Navbar>`, `<Footer>`, `<Search>`, `<ThemeSwitch>`, `<SidebarTabs>`, etc.) and how user config (`config.title`, `config.header.*`, `config.footer.*`, `config.theme.*`) is interpolated.

Key rules learned from existing themes:

- **`config` is untrusted user input.** Its shape is fixed by [`sites-schema.md`](sites-schema.md); read fields from there, not by guessing. Pass strings through `JSON.stringify(…)` when interpolating into JSX attribute or expression positions, so quotes/braces are escaped (see [`jollia/layout.mjs:8-9`](jollia/layout.mjs#L8-L9)). For URLs, sanitize first — see the `sanitizeUrl` / `escapeHtml` helpers inlined at the top of [`forge/layout.mjs:7-30`](forge/layout.mjs#L7-L30). Reuse that pattern rather than reinventing it.
- Always import the theme's own CSS file by name derived from the manifest:
  ```js
  import './themes/${manifest.name}.css'
  ```
  Hard-coding the filename will break if the theme is renamed.
- Always wrap the page tree in `ScopedNextraLayout` (provided by the built site, not by us) — never the bare `Layout` from `nextra-theme-docs`.
- Themes that need top-of-sidebar tabs render `<SidebarTabs />` inside `ScopedNextraLayout`. Themes that don't (Ember) omit it.

---

## The `config` object

`buildCss(config)` and `generateLayout(config)` both receive a single `config` argument: the parsed contents of the user's `sites.json`. The complete shape — every field, type, and constraint — is documented in [`sites-schema.md`](sites-schema.md). **Treat that file as the contract.** If you want to expose a new piece of user-facing config, update the schema first, then consume it in the theme.

The fields current themes actually read from `config`:

| Field | Used in | Notes |
|-------|---------|-------|
| `config.title` | every `layout.mjs` | Browser tab + navbar logo text. |
| `config.description` | every `layout.mjs` | SEO meta. |
| `config.theme.defaultTheme` | every `layout.mjs` | Falls back to `manifest.defaults.defaultTheme`. |
| `config.theme.logoUrl`, `logoUrlDark`, `logoText`, `logoDisplay` | [`forge/layout.mjs`](forge/layout.mjs), [`flux/layout.mjs`](flux/layout.mjs) | Image/text/both rendering. Sanitize URLs via the inlined helpers in [`forge/layout.mjs:7-30`](forge/layout.mjs#L7-L30). |
| `config.theme.colors.primary` (and/or `primaryColor`) | [`flux/layout.mjs:41`](flux/layout.mjs#L41) | Accent color override. |
| `config.footer.copyright`, `columns`, `socialLinks` | [`slate/layout.mjs`](slate/layout.mjs), [`forge/layout.mjs`](forge/layout.mjs), [`flux/layout.mjs`](flux/layout.mjs) | Multi-column footer rendering. |
| `config.header.primary.href`, `label` | every `layout.mjs` with a CTA | **Note:** the schema currently defines `header.items[]` (label + url), not `header.primary` (label + href). New themes should follow the schema (`header.items[]`) and the existing layouts should be reconciled in a follow-up. Don't propagate the old shape into new code. |
| `config.navigation` | rendered by `nextra-theme-docs` itself via `getPageMap()`, not directly by these themes | Themes do not iterate `navigation`; they only ensure the layout hosts the sidebar/tabs that Nextra populates. |

Things to keep in mind when reading `config`:

- **Every field except `title` and `theme.pack` is optional.** Default by reaching into `manifest.defaults` first, then hard-coded fallbacks — see the `JSON.stringify(config.theme?.defaultTheme || manifest.defaults.defaultTheme)` pattern in [`jollia/layout.mjs:10`](jollia/layout.mjs#L10).
- **All `config` strings are untrusted user input.** Use `JSON.stringify` for safe JSX-attribute interpolation, and run URLs through `sanitizeUrl` and labels through `escapeHtml` (see the helpers at the top of [`forge/layout.mjs`](forge/layout.mjs)) before emitting them as raw HTML.
- **`config.theme.pack` selects the theme** at build time — your `manifest.name` is what gets matched against it. Don't read `pack` from inside your theme; it's the builder's job.

---

## Shared components vs. per-theme styles

Each theme's emitted CSS has two layers, both per-theme:

```
themes/<theme>/
├── components.mjs              # default-exports a CSS string of component-level styles (uses --w-* tokens only)
└── css.mjs                     # imports COMPONENTS_CSS from ./components.mjs and concatenates it
                                # ahead of the per-theme tokens, layout selectors, and overrides
```

### What belongs where

**`<theme>/components.mjs`** — structural and component-level styling: article typography, headings, paragraphs, lists, tables, code blocks, breadcrumbs, callouts, cards, sidebar item shapes (spacing, layout, hover behavior — not colors), navbar mechanics, search-box mechanics. Things like:

- Article `<h1>`–`<h4>` size scale, line-height, margins.
- Table layout, row hover, cell padding.
- Code-block padding, line-numbers gutter, copy button.
- Sidebar item padding, gap, indentation.

**Hard rule: `components.mjs` may not contain a single hard-coded color value.** Every color, background, border, and shadow must be expressed as a `var(--w-*)` reference. The per-theme `css.mjs` is what supplies values for those variables in `:root` and `.dark`.

**Also goes in `components.mjs`: built-site component overrides.** The built site ships its own React components for things Nextra doesn't render natively — most notably the API reference renderer (`components/api/Endpoint.tsx`, `CodeSwitcher.tsx`, `ResponseBlock.tsx`, etc., which emit class names like `.api-endpoint-grid`, `.api-code-switcher`, `.api-response-block`). Styling overrides that re-skin those components to match the theme's existing language (filename-header strip, `0.625rem` rounded code-block envelope, etc.) belong in `components.mjs`, not in per-theme `css.mjs`. Reasoning:

- The visual language (header strip + rounded envelope + `--w-*` tokens) is the same one applied to Nextra's native code blocks elsewhere in `components.mjs`; keeping it together keeps the relationship obvious.
- Other themes that adopt the same `components.mjs` pattern get the API reference styled consistently without re-deriving it.
- The rules use only `--w-*` tokens, so they satisfy the hard rule above.

These overrides do couple the theme to the built site's class names. Document the coupling inline (the [`forge/components.mjs`](forge/components.mjs) "API REFERENCE PAGES" section is the reference example) and update both sides together if the built-site component class names change.

Because every theme owns its own `components.mjs`, two themes can drift independently — e.g. an editorial theme can move its article `h1` to a serif stack without coordinating with a developer-oriented theme. Treat new themes as forks of the Forge baseline rather than consumers of a single shared file.

**`<theme>/css.mjs`** — everything that varies by theme tokens or topology:

1. The `--w-*` token table for `:root` (light) and `.dark`.
2. Nextra primary hue/saturation/lightness overrides.
3. Theme-specific layout containers (e.g. `.forge-sidebar-logo`, `.flux-sidebar-search`) — these have a theme prefix because they correspond to JSX rendered only by that theme's `layout.mjs`.
4. Per-theme aesthetic tweaks that intentionally diverge from the baseline. Things like **border-radius** (a "soft" theme might use `0.5rem`, an "editorial" theme `0`), shadow depth, accent gradient choices, focus-ring style. Express these as additional `--w-*` tokens when possible (`--w-radius`, `--w-radius-sm`) so `components.mjs` can consume them generically; only override component selectors directly when a token isn't a clean fit.

### The `--w-*` token contract

`components.mjs` reads its colors and key dimensions from this token namespace. Each theme's `css.mjs` must define values for all of these in both `:root` and `.dark`. If you add a new shared component that needs a new token, add it here, default it in **every theme**, and document it.

| Token | Purpose |
|-------|---------|
| `--w-brand-color` | Source-of-truth accent color, typically set inline on `<html>` from `config.theme.primaryColor`. Other accent tokens derive from this via `color-mix`. |
| `--w-accent` | Resolved accent (usually `var(--w-brand-color)`). |
| `--w-accent-soft` | Tinted accent for backgrounds (badges, inline code). |
| `--w-accent-border` | Accent at low alpha for borders. |
| `--w-bg` | Page background. |
| `--w-border`, `--w-border-soft` | Standard and subtle border colors. |
| `--w-text-strong` | Headings and emphasized text. |
| `--w-text` | Body text. |
| `--w-text-soft` | Secondary text (captions, meta). |
| `--w-text-faint` | Tertiary text (placeholders, breadcrumb separators). |
| `--w-hover-bg` | Generic row/item hover background. |
| `--w-code-bg`, `--w-code-shadow` | Code-block surface. |
| `--w-inline-code-color`, `--w-inline-code-bg`, `--w-inline-code-border` | Inline `<code>` styling. |
| `--w-filename-header-bg` | Filename header strip above code blocks. |
| `--w-card-bg` | Card surface (Nextra `<Cards>`). |
| `--w-scrollbar-thumb` | Custom scrollbar color. |
| `--w-font-family` | Font stack, set inline on `<html>` from config or theme default. |

Region-specific tokens (`--header-*` for the navbar, `--nav-*` for the sidebar) follow the same naming pattern and live alongside `--w-*` in each theme's `css.mjs`. Define them whenever your theme has a distinct navbar or sidebar surface that shouldn't track the generic `--w-bg` / `--w-text` values.

### How `css.mjs` should ship the split

The builder writes a single `styles/themes/<name>.css` file in the built site. `css.mjs` should produce that file by importing the components string and concatenating it ahead of per-theme content:

```js
import manifest from "./manifest.mjs";
import COMPONENTS_CSS from "./components.mjs";

const FORGE_THEME_CSS = `:root { --w-bg: #fff; ... } /* and theme-prefixed selectors */`;

export function buildCss(config) {
  return COMPONENTS_CSS + "\n" + FORGE_THEME_CSS + buildOverrides(config);
}
```

This keeps the layering explicit — components first, then tokens, then config-driven overrides — and avoids the builder needing to copy or `@import` a second file.

### Migrating an existing theme to the per-theme components convention

Doing this in one PR is risky for a production theme — pixel diffs can hide in any selector. Recommended order:

1. **Add `components.mjs`** to the theme folder. Start by copying [`forge/components.mjs`](forge/components.mjs) and adapting it to the theme's needs. Every value must reference `var(--w-*)` — no hard-coded colors.
2. **Rename tokens.** Replace `--<themeName>-*` with `--w-*` throughout the theme's `css.mjs`. The mapping is mostly mechanical (`--jollia-text` → `--w-text`, `--ember-primary` → `--w-accent`, etc.). Light-and-dark in lockstep.
3. **Lift component selectors.** Identify selectors in the theme's CSS that target generic content (`article h1`, `table`, `pre`, `.nextra-breadcrumb`) and move them into `components.mjs`, replacing any hard-coded colors with `--w-*` references as you go. Keep theme-prefixed selectors (`.forge-sidebar-logo`) in the per-theme file.
4. **Import and concatenate.** Add `import COMPONENTS_CSS from "./components.mjs";` at the top of `css.mjs` and prepend it to the returned string.
5. **Visual-diff after each step** in the built site. Light, dark, mobile.
6. **Bump the theme's version** in both `manifest.mjs` and `registry.json`.

If a theme has a deliberate visual quirk that conflicts with the components baseline (e.g. Atlas's serif headings, square corners on a "brutalist" theme), express it as either (a) a token override (`--w-radius: 0`), (b) a small override block in the theme's `css.mjs` placed *after* the components string, or (c) a divergent edit to that theme's own `components.mjs`. Because each theme owns its `components.mjs`, the third option is cheap — you don't need to coordinate with other themes.

---

## How a change reaches the screen

1. You edit `<theme>/css.mjs`, `<theme>/layout.mjs`, or `<theme>/components.mjs` here.
2. In the built site, run the builder's regenerate step (project-specific; check that repo's README). It re-imports this theme and rewrites `styles/themes/<name>.css` and `app/layout.tsx`.
3. `next dev` in the built site hot-reloads the CSS. Layout changes typically require restarting the dev server because `app/layout.tsx` was rewritten on disk.
4. Open the built site in the browser, inspect, iterate.

If you cannot run the built site, say so explicitly — do not claim a visual change is working without observing it.

---

## Editing an existing theme

1. **Get the built-site path from the developer** (project #3 above). Without it you can only guess at the rendered result.
2. Identify what you're changing:
   - Color / spacing / typography that should apply across the theme's component baseline → that theme's `components.mjs`.
   - Color / spacing / typography specific to one theme → that theme's `css.mjs` (token values or theme-prefixed selectors).
   - Re-skin of a built-site component (e.g. `.api-endpoint-grid`, `.api-code-switcher`, `.api-response-block` from the built site's `components/api/*` renderers) → that theme's `components.mjs`, using only `--w-*` tokens. Even though the class names are owned by the built site, the override is about reusing the theme's existing visual language (rounded code-block envelope, filename-header strip, etc.) and would apply identically across themes. See the "API REFERENCE PAGES" section in [`forge/components.mjs`](forge/components.mjs).
   - Markup, which components render, what data the layout consumes → `layout.mjs`. If you're consuming a new field from `sites.json`, confirm it exists in [`sites-schema.md`](sites-schema.md) first; if not, the schema needs to be extended before the theme can rely on it.
   - Default hue, default light/dark, display name → `manifest.mjs`.
3. Make the change. Match the existing code style for that theme (prefix conventions, `!important` usage, template-literal structure). Don't refactor unrelated parts.
4. In the built site, read the generated `styles/themes/<name>.css` and `app/layout.tsx` to confirm the output is what you intended. These files are produced from your `.mjs` edits and are the most direct ground truth.
5. Visually diff: run the built site's dev server, navigate to a few pages (home, deep nav item, a `_meta`-driven tab), check light + dark, check mobile width.
6. **If you changed externally-visible behavior**, bump `version` in `manifest.mjs` **and** the matching entry in `registry.json`. CI fails on mismatch.

---

## Creating a new theme

1. **Pick a name.** Lowercase, short, single word. Must be unique in `registry.json`. The folder name, `manifest.name`, and theme-prefixed class names all use this name.

2. **Create the folder** and stub the five files. The fastest path is to copy [`forge/`](forge/) wholesale — it's the reference implementation under the current convention — then adapt. If your layout topology differs significantly, copy from a closer match:
   - Fixed left sidebar, no tabs → [`ember/`](ember/).
   - Navbar with second-row tabs → [`jollia/`](jollia/) or [`slate/`](slate/).
   - Developer-oriented with rich logo / footer config plumbing → [`forge/`](forge/) or [`flux/`](flux/).

   If you copy from an unmigrated theme (anything other than Forge), also plan for the migration work in [Shared components vs. per-theme styles](#shared-components-vs-per-theme-styles): rename `--<themeName>-*` tokens to `--w-*`, add a `components.mjs`, and lift shared component selectors into it.

3. **Update `manifest.mjs`:** change `name`, `version` (start at `1.0.0`), `displayName`, `tagline`, and `defaults.primaryHue` (0–360). Keep the structure.

4. **Adapt `components.mjs`** to the theme's component baseline. Keep it `var(--w-*)`-only — no hard-coded colors. If you copied from Forge and the baseline is already correct, you can leave this file as-is.

5. **Write `css.mjs` against the `--w-*` token contract.** Don't introduce a new `--<new-name>-*` namespace for shared concerns. Your job is to:
   - `import COMPONENTS_CSS from "./components.mjs";` and concatenate it at the head of the returned string — see [How `css.mjs` should ship the split](#how-cssmjs-should-ship-the-split).
   - Define values for every `--w-*` token listed in [The `--w-*` token contract](#the---w--token-contract), under `:root` and `.dark`.
   - Override `--nextra-primary-hue` / `--nextra-primary-saturation` / `--nextra-primary-lightness` to match your `manifest.defaults.primaryHue`.
   - Add only the theme-prefixed selectors that exist because your `layout.mjs` renders them (e.g. `.<new-name>-sidebar-logo`).
   - Per-theme aesthetic tweaks (border radius, shadow depth, etc.) go *after* the components string as overrides or as additional token values.

6. **Update `layout.mjs`:** the `import './themes/${manifest.name}.css'` line already uses the manifest name, so no edit needed there. Rename any inline className strings to your theme prefix (e.g. `'jolli-hidden-tabs'` → `'<new-name>-hidden-tabs'`) and any `var(--<old-theme>-…)` references to the corresponding `--w-*` token. `index.mjs` needs no changes.

7. **Register the theme** by adding an entry to [`registry.json`](registry.json):
   ```json
   {
     "name": "<new-name>",
     "version": "1.0.0",
     "description": "…",
     "tags": ["…"]
   }
   ```
   The `version` here **must** match `manifest.version` — CI enforces this.

8. **Smoke-test locally** by pointing the built site at the new theme (see project #3) and rendering the sample-site content with it. Inspect light/dark, navbar, sidebar, tabs (if any), footer, mobile.

9. **Verify CI will pass** by running the same validation Node script that [`.github/workflows/validate.yml`](.github/workflows/validate.yml) runs — it imports each `manifest.mjs` and `index.mjs` and checks version sync. Any parse error in your new files will fail CI.

---

## Validation and CI

[`.github/workflows/validate.yml`](.github/workflows/validate.yml) runs on every push and PR. For every theme listed in `registry.json` it checks:

1. The theme folder exists.
2. `manifest.mjs` exists and parses as an ES module.
3. `manifest.version` is set.
4. `manifest.version === registry.themes[i].version`.
5. `index.mjs` exists and parses.

If you bump a theme's version, bump it in **both** `manifest.mjs` and `registry.json` in the same commit. If you add a new theme, add it to `registry.json` in the same commit. If you remove a theme, remove its `registry.json` entry — CI fails on orphans.

CI does **not** validate `css.mjs`, `layout.mjs`, or `components.mjs` semantically. Broken CSS or invalid generated JSX will pass CI here and only break in the built site. That's why a visual diff in the built site is required before shipping non-trivial changes.

---

## Things that are out of scope for this repo

- **Article content** (`*.mdx`, `_meta.js`) lives in `sample-site`, not here.
- **The `ScopedNextraLayout` / `SidebarTabs` components** referenced in every `layout.mjs` are provided by the built site, not by this repo. If you need to add a new component, it must be added in the built site project; this repo only references it by import path.
- **Anything that runs JavaScript at request time.** Themes here produce static CSS and a static `app/layout.tsx`; runtime behavior comes from Nextra itself.
