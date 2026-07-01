Build the production version of my personal site by porting `reference.html` (at the repo root) to a React + Vite + Tailwind single-page app. The reference file is the complete, working source of truth: match its default palette, type, layout, copy, the three.js animation system, AND the visitor-facing theme builder, exactly. Do not redesign. When anything is ambiguous, open `reference.html` and follow it literally.

CONTEXT
- I am Vik Al, Head of Design at Cypherock (2022 to 2026), targeting VP of Design.
- One page: header, hero, point of view, five projects, footer. No routing, no case studies, no CMS.
- The site ships with a permanent, visitor-facing theme builder. It always opens in the authored default theme; visitors can customize colors and fonts live; customization is session-only (no persistence, resets on reload).
- All graphics are live three.js scenes drawn by one shared WebGLRenderer (hero lattice plus five project scenes: layers, flow, emit, converge, transform).

STACK AND SETUP
- Use the existing project if present; if empty, scaffold Vite + React + Tailwind (JavaScript unless the repo already uses TypeScript).
- `npm install three`; import as an ES module (`import * as THREE from 'three'`). Port the scene factories from `reference.html` as-is.
- Drive ALL theming through CSS custom properties on the document root, exactly as the reference does. The default theme (Blueprint) lives in `:root`. Tailwind for layout/spacing; keep the bespoke CSS as a global stylesheet. Do not hardcode theme colors into components; read everything from CSS variables.
- Base fonts (Space Grotesk, Hanken Grotesk, JetBrains Mono) load up front; the other selectable fonts load on demand (see builder).

COMPONENT STRUCTURE
- `App` renders a fixed `<canvas id="webgl">` (z-index 0, pointer-events none), a `.layer` wrapper (z-index 1) with all content, and the `ThemeBuilder`.
- `Header`, `Hero` (text + `#hero-canvas` placeholder with data-graphic="hero"), `PointOfView`, `Work` with five `Project`s (flip 2nd and 4th), `Footer`. Each project graphic is a transparent `<figure className="graphic" data-graphic="...">` with the four corner spans and the tag, so the fixed canvas shows through.

THREE.JS (port the IIFE block from reference.html)
- One `WebGLRenderer({ canvas, antialias: true, alpha: true })`, pixel ratio capped at 2, transparent clear, autoClear false.
- Build one Scene + PerspectiveCamera per `[data-graphic]` element with the matching factory; each returns `update(t)`. Render loop: per view, read `getBoundingClientRect()`, skip off-screen, set scissor + viewport (gl y = innerHeight - rect.bottom), clearDepth, set aspect, update, render; one full clear per frame with scissor off. Pause when `document.hidden`; resize to window inner size; dispose on unmount.
- Keep `inkMats`/`accentMats` registries and an `applyTheme()` that reads `--three-ink` and `--three-accent` from computed styles and sets material colors. Expose `applyTheme` so the ThemeBuilder can call it after any change.
- prefers-reduced-motion: render one static frame at t = 2.0, no loop.

THEME BUILDER (this is a shipped feature, port it fully)
- A fixed right-edge "Customize" tab opens a right-side drawer (no dark backdrop on desktop, so the page updates live while open; full-width sheet under 760px). Close via the × button or Escape.
- Controls, all wired to live updates:
  - Presets: Blueprint, Graphite, Indigo (values in the PRESETS object in the reference). Clicking one loads its colors + fonts and syncs the inputs.
  - Six color inputs: Background `--bg`, Surface `--surface`, Text & 3D `--ink`, Secondary text `--ink-2`, Muted text `--ink-3`, Accent `--accent`. On change, set those vars plus derived `--line` (ink @ 0.16), `--line-strong` (ink @ 0.30), `--grid` (ink @ current grid alpha), `--three-ink` = ink, `--three-accent` = accent, then call `applyTheme()`. Show each value as a hex readout.
  - Display and Body typeface selects from the curated DISPLAY and BODY maps in the reference. On change, lazy-load the font via an injected Google Fonts `<link>` (track loaded hrefs), then set `--display`/`--dw`/`--dtrack` (display) or `--sans` (body).
  - Grid intensity slider mapping 0..10 to grid alpha 0..0.10; reapply `--grid` from the current ink.
  - Reset to default.
- On load, ALWAYS apply the default theme (Blueprint). Do not persist or restore a visitor's customization; it is intentionally session-only so every visitor first sees the authored default.
- Implement in React idiomatically (state for open/values, effects that write CSS variables), but the behavior and DOM/markup must match the reference. Keep aria attributes (tab aria-expanded, drawer aria-hidden, labelled controls).

CONTENT (copy is em-dash-free; preserve verbatim)
- Live links open in a new tab, rel="noopener noreferrer": Throughline https://throughline.vikals.com, Handsoff https://www.figma.com/community/plugin/1566768370192138452/handsoff-beta, VikSense https://chatgpt.com/g/g-692dc948c7748191bf5670f0bfaad32f-viksense.
- VikSchema Studio and the AI-Facilitated Design Review have no live link; keep tags "Framework" and "In progress".

QUALITY
- Semantic landmarks, focus-visible outlines, descriptive link text, aria-labels on each graphic figure, aria-hidden on the hero canvas. No console errors. Single page, no router. Get `npm run dev` running, then stop and let me review before any deploy.

DECISION LOG
- After the build runs, append the block below verbatim to `docs/decision-log.md` (create if missing). D-10 supersedes D-07; leave earlier entries as the historical record.

=== DECISION LOG — APPEND VERBATIM TO docs/decision-log.md ===
### D-2026-06-30-09 · PRODUCT · Ship a visitor-facing theme builder in the dist
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** The site includes a permanent customizer: a right-edge "Customize" tab opening a side drawer with six color pickers (background, surface, text/3D ink, secondary text, muted text, accent), display and body typeface selectors (curated Google Fonts, lazy-loaded), a grid-intensity slider, the three palette presets as quick starts, and a reset. Colors drive CSS variables; hairlines and grid derive from the text color; the three.js ink and node colors recolor live. Always opens in the authored default; customization is session-only and resets on reload.
- **Alternatives / dead ends:** A single fixed authored theme with no controls (simpler, fully controls the first impression). The earlier bottom-right preset switcher (scaffolding) is replaced by the edge-tab drawer. Persisting a visitor's custom theme across reloads was considered and rejected so the site always presents the authored default first.
- **VP signal:** Charming, memorable, and on-brand for someone whose work is systems and tooling: the site is itself a small customizable system. Honest counter-view: a VP-of-Design portfolio is partly an argument that the author makes decisive aesthetic choices, so inviting visitors to recolor it can read as hedging or as a gimmick that competes with the work. Mitigated because it opens in the authored default and the control is tucked on an edge tab, but a traditional reviewer may read it as cleverness over restraint.
- **Outcome / impact:** _(leave blank)_

### D-2026-06-30-10 · UX · Default theme is Blueprint; supersedes D-2026-06-30-07
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** The authored default the site always opens in is the Blueprint palette (cool paper white, blue-black ink, blueprint-blue accent) with Space Grotesk display, replacing the OpenVector cream/navy direction. Graphite and Indigo remain available as builder presets.
- **Alternatives / dead ends:** Graphite (monochrome, Fraunces serif) and Indigo (saturated indigo, Bricolage) considered as the default and kept as presets instead. Cream/navy (D-2026-06-30-07) dropped.
- **VP signal:** Blueprint fits the structure/systems thesis cleanly and lets the diagrams read as schematics. Mild risk it is a touch on the nose for a "systems" designer (literal blueprint blue). The default is provisional; Vik may still switch it to Graphite or a custom mix, which is a one-line change.
- **Outcome / impact:** _(leave blank)_

### D-2026-06-30-11 · PRODUCT · State an AI point of view on the page (stance, not label)
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** Add one emphasized line to the point-of-view section naming an AI stance ("Increasingly that structure includes AI, which I design to compute and recommend so teams move faster, while people keep judgment and the final call"), rather than stamping "AI-powered" labels on projects or leaving AI unstated.
- **Alternatives / dead ends:** Say nothing about AI (rejected: the work is already AI-fluent and hiding it wastes a strong, in-demand signal). Stamp "AI-powered" or buzzword labels on the projects (rejected: cheapens a senior positioning and sounds like every LinkedIn headline).
- **VP signal:** Converts an unstated thread (Throughline's compute-and-recommend, the Review Protocol's facilitator-not-judge, VikSense) into an explicit, mature stance on AI inside design decisions, which is in high demand in 2026. Honest risk: it is one line carrying a big claim, so if the linked work did not visibly back the "humans keep judgment" posture it could read as talk; the projects do back it, which is why it is defensible.
- **Outcome / impact:** _(leave blank)_
=== END DECISION LOG ===
