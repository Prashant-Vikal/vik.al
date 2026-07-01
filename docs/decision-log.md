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
