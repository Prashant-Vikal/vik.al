# Decision Log — <Project Name>

Raw, honest, append-only record of decisions made while building this project.
This is **source material** for the VP Signal Brief — do NOT polish, summarize,
or reword entries here. The cleaned, hiring-facing version is generated later.

**Each entry has:**
- An ID `D-YYYY-MM-DD-NN` (date-stamped, sequential within the day)
- A `TYPE`: PRODUCT · UX · ARCH · PROCESS
- A `Source`: Chat (planning) or Code (build)
- `Outcome / impact` left blank until known, then filled in by hand

**To find the reasoning behind any entry:** search its ID (e.g. `D-2026-06-28-01`)
in the planning chat using Claude's chat search — not the browser's Find, which
misses un-rendered parts of long chats.

---

### D-2026-06-28-01 · [ARCH] · Example — local-first storage over a hosted backend
- **Date:** 2026-06-28
- **Source:** Chat (planning)
- **Decision:** Ship v1 with local-first storage (IndexedDB) instead of standing up a hosted Postgres backend.
- **Alternatives / dead ends:** Considered Supabase for "real" multi-device sync; prototyped the auth flow, then dropped it. Sync wasn't needed for a single-user demo, and the backend would have roughly doubled build time and added a live failure surface to babysit during interviews.
- **VP signal:** Scoped to the actual goal (a credible demo, not a product), refused gold-plating, and protected timeline and reliability over feature completeness.
- **Outcome / impact:** _(blank — e.g. "demo ran fully offline across 3 interviews, zero failures")_

---

<!-- New entries are appended below this line. Never edit or renumber the entries above. -->

### D-2026-06-30-09 · [PRODUCT] · Ship a visitor-facing theme builder in the dist
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** The site includes a permanent customizer: a right-edge "Customize" tab opening a side drawer with six color pickers (background, surface, text/3D ink, secondary text, muted text, accent), display and body typeface selectors (curated Google Fonts, lazy-loaded), a grid-intensity slider, the three palette presets as quick starts, and a reset. Colors drive CSS variables; hairlines and grid derive from the text color; the three.js ink and node colors recolor live. Always opens in the authored default; customization is session-only and resets on reload.
- **Alternatives / dead ends:** A single fixed authored theme with no controls (simpler, fully controls the first impression). The earlier bottom-right preset switcher (scaffolding) is replaced by the edge-tab drawer. Persisting a visitor's custom theme across reloads was considered and rejected so the site always presents the authored default first.
- **VP signal:** Charming, memorable, and on-brand for someone whose work is systems and tooling: the site is itself a small customizable system. Honest counter-view: a VP-of-Design portfolio is partly an argument that the author makes decisive aesthetic choices, so inviting visitors to recolor it can read as hedging or as a gimmick that competes with the work. Mitigated because it opens in the authored default and the control is tucked on an edge tab, but a traditional reviewer may read it as cleverness over restraint.
- **Outcome / impact:** (leave blank)

### D-2026-06-30-10 · [UX] · Default theme is Blueprint; supersedes D-2026-06-30-07
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** The authored default the site always opens in is the Blueprint palette (cool paper white, blue-black ink, blueprint-blue accent) with Space Grotesk display, replacing the OpenVector cream/navy direction. Graphite and Indigo remain available as builder presets.
- **Alternatives / dead ends:** Graphite (monochrome, Fraunces serif) and Indigo (saturated indigo, Bricolage) considered as the default and kept as presets instead. Cream/navy (D-2026-06-30-07) dropped.
- **VP signal:** Blueprint fits the structure/systems thesis cleanly and lets the diagrams read as schematics. Mild risk it is a touch on the nose for a "systems" designer (literal blueprint blue). The default is provisional; Vik may still switch it to Graphite or a custom mix, which is a one-line change.
- **Outcome / impact:** (leave blank)

### D-2026-06-30-11 · [PRODUCT] · State an AI point of view on the page (stance, not label)
- **Date:** 2026-06-30
- **Source:** Chat (planning)
- **Decision:** Add one emphasized line to the point-of-view section naming an AI stance ("Increasingly that structure includes AI, which I design to compute and recommend so teams move faster, while people keep judgment and the final call"), rather than stamping "AI-powered" labels on projects or leaving AI unstated.
- **Alternatives / dead ends:** Say nothing about AI (rejected: the work is already AI-fluent and hiding it wastes a strong, in-demand signal). Stamp "AI-powered" or buzzword labels on the projects (rejected: cheapens a senior positioning and sounds like every LinkedIn headline).
- **VP signal:** Converts an unstated thread (Throughline's compute-and-recommend, the Review Protocol's facilitator-not-judge, VikSense) into an explicit, mature stance on AI inside design decisions, which is in high demand in 2026. Honest risk: it is one line carrying a big claim, so if the linked work did not visibly back the "humans keep judgment" posture it could read as talk; the projects do back it, which is why it is defensible.
- **Outcome / impact:** (leave blank)

### D-2026-07-04-01 · [UX] · Revert to 2D; rebuild project graphics as anime.js-animated illustrated SVG scenes; supersedes the scroll-driven 3D direction (D-2026-07-03-04..06) and the CSS-keyframe vignettes (D-2026-07-02-01)
- **Date:** 2026-07-04
- **Source:** Chat (planning)
- **Decision:** Drop 3D entirely and stay in 2D. Replace the five flat CSS-keyframe vignettes with five bespoke illustrated SVG scenes, each animated by an anime.js timeline (staggered assembly, path/stroke draw-ons, motion, looped with a per-loop reset). The scenes read as small flat-vector infographics with real objects (a stacking layer diagram, a scorecard with a human APPROVED stamp, a scanner emitting doc pages, knowledge scraps converging to a hub that emits output cards, an opinion becoming an evidence card with the AI facilitating beside it), rather than abstract bars and dots.
- **Alternatives / dead ends:** Keeping the CSS vignettes was rejected because CSS keyframes can only tween a few properties and cannot really draw or sequence illustration, which is exactly why they felt flat. Returning to three.js / 3D was explicitly reverted by me one turn earlier, so it is off the table for this direction. Lottie was rejected earlier (stock look or an After Effects dependency, and IP risk from marketplace files). GSAP was considered and skipped: heavier, and the SVG morphing I might want lives in the paid MorphSVG plugin. Chose anime.js: tiny, free, no build step, SVG-native, expressive timelines. Note this is now the seventh distinct graphics direction in the project.
- **VP signal:** The seventh graphics pivot is a real and honest liability: the log makes plain that the visual language kept being re-litigated, and a hiring reviewer could read that as indecision. Mitigating reads: 2D SVG is the right medium for legibility, performance, accessibility, and reliable rendering (unlike the 3D work, which I could never verify centered or performant), and every pivot preserved the same underlying meaning system (stable base, the human gate, docs from components, scraps to knowledge, opinion to evidence). anime.js is a defensible, lightweight, non-flashy choice. Real risk that remains: the meaning of each scene has to land in a few seconds of loop, and I have not watched them render, so legibility on real screens is unverified.
- **Outcome / impact:** (leave blank)

### D-2026-07-04-02 · [UX] · Inspiration, not imitation: keep the site's own light Blueprint palette and theme; borrow only the illustrative infographic language from the reference image
- **Date:** 2026-07-04
- **Source:** Chat (planning)
- **Decision:** A flat-vector coffee infographic was provided as a style reference. Take from it only the general approach (literal iconographic illustration, clear little objects, characterful flat vector scenes) and NOT its content or its warm cream/orange palette. The site keeps its existing light Blueprint theme, the fixed five-swatch viz palette, Space Grotesk / Hanken / JetBrains type, and the customizer untouched.
- **Alternatives / dead ends:** Adopting the reference's warm earthy palette was rejected: it would restyle the whole site off a single mood image and collide with the established Blueprint identity and the viz palette the scenes are built on. Literally copying infographic motifs (cups, beans, maps) was rejected as off-topic for a design-leadership portfolio and derivative. Recoloring the SVG scenes from the theme customizer was rejected to keep the viz palette a stable signature across themes (consistent with every prior fixed-palette decision).
- **VP signal:** Restraint reads as judgment here: using a reference for the how (illustration quality) without letting it hijack the what (brand, palette, topic) is the correct instinct and is defensible in an interview. Mild risk that the scenes, built on the cooler viz palette, feel less warm and friendly than the reference that inspired them, which is an acceptable trade for identity consistency.
- **Outcome / impact:** (leave blank)

### D-2026-07-04-03 · [ARCH] · Embed the five SVG scenes as verbatim markup via dangerouslySetInnerHTML rather than hand-transcribing to JSX
- **Date:** 2026-07-04
- **Source:** Code (build)
- **Decision:** In the React port, each scene's SVG inner markup is stored as a string constant and injected with `dangerouslySetInnerHTML`, keeping the `<svg class="scene">` wrapper as a real JSX element (id, viewBox, preserveAspectRatio, aria-hidden). anime.js still drives everything by CSS selector on the resulting DOM, unchanged.
- **Alternatives / dead ends:** Hand-transcribing all five scenes to JSX was rejected: it means converting every `class`→`className`, `stroke-width`→`strokeWidth`, `stroke-dasharray`, inline `style` strings, etc., across dense coordinate-heavy markup, where one typo silently breaks an illustration and React also warns on hyphenated SVG attributes. The brief's repeated demand to port the SVG "verbatim" made byte-identical embedding the safer literal reading. The markup is static and author-authored (no user input), so the usual XSS concern for dangerouslySetInnerHTML does not apply.
- **VP signal:** Chose fidelity and low transcription risk over React-idiomatic purity for a block of static, verifiable markup, and named the one real tradeoff (bypassing JSX's escaping) plus why it is safe here. Minor risk: a reviewer who dislikes dangerouslySetInnerHTML on sight may read it as a smell without reading why.
- **Outcome / impact:** (leave blank)

### D-2026-07-05-01 · ARCH · CSV registers fonts by name + full Google Fonts URL (any font, no code change)
- **Date:** 2026-07-05
- **Source:** Chat (planning)
- **Decision:** Add "font,<name>,<serif|sans|mono>,<url>" declaration lines to presets.csv. The parser splits on commas but rejoins the URL field onward, so a real Google Fonts URL (which contains commas) survives intact. Theme rows reference fonts by name; built-ins stay pre-registered in code and can be overridden by a CSV line of the same name. This lets Vik use any Google font as the site default purely from the CSV.
- **Alternatives / dead ends:** Embedding a raw URL directly in a theme cell was rejected: theme rows are comma-delimited and the URL's commas would shred the row. Deriving the URL from just the family name (slug + a fixed weight axis) was rejected as fragile: families vary in available weights/axes and a wrong axis makes the whole css2 request fail. Switching the whole file to pipe/TSV delimiters was rejected as less familiar and still messy for hand-editing; the split-and-rejoin trick keeps it a plain CSV. Adding a serif/sans/mono field (rather than inferring) was a deliberate cost: it is one more thing to fill in, but inference from a family name is unreliable and the field also sets sensible heading tracking.
- **VP signal:** Small, sound piece of systems design that lets a non-developer fully rebrand the site from one text file. Honest limits: fonts still load from Google (privacy/latency, no self-hosting), the CSV can set family and size but not per-font weight (defaulted by kind), and a mistyped URL or unregistered name fails quietly rather than loudly, which is friendlier but can mask errors.
- **Outcome / impact:** _(leave blank)_

### D-2026-07-05-02 · UX · Full theme control from the CSV (muted font + all three sizes), UI populated from the registry
- **Date:** 2026-07-05
- **Source:** Chat (planning)
- **Decision:** Widen theme rows to carry the muted/utility font and the heading/body/muted pixel sizes, not just colors and the display/body fonts. The customizer's three font dropdowns are populated from the font registry (so CSV-added fonts appear), size selects accept CSV values outside their preset options, and Reset restores the full default theme. Kept backward-compatibility with the old 9-field rows.
- **Alternatives / dead ends:** Leaving muted font and sizes as code-only defaults (the prior behavior) was rejected because Vik explicitly wants total control from the CSV. Making sizes free-text number inputs in the UI was considered and skipped to keep the existing select-based control; instead the selects gain any CSV-supplied value as an option. Letting a preset also pin grid intensity was considered and dropped as scope creep for now. The viz/scene palette is deliberately still NOT themeable, consistent with every prior fixed-palette decision.
- **VP signal:** Rounds out the customizer into a genuinely complete theming layer driven by data, not code. Honest tension: more CSV columns means more ways to typo a row, and the growing surface (colors + three fonts + three sizes + font declarations) is starting to be a lot for a "quiet" personal-site feature, arguably over-built for its actual audience of one.
- **Outcome / impact:** _(leave blank)_
