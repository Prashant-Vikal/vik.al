# Decision logging — section for your repo's CLAUDE.md

> Paste this into the project's `CLAUDE.md` (merge it as a new section; don't
> overwrite your existing build instructions).

---

## Decision logging

This project keeps a raw, honest, append-only record of decisions in
`docs/decision-log.md`. It is source material — never polish, summarize, or
reword it. The hiring-facing summary is generated separately, later.

### When you receive a prompt
If the incoming prompt ends with a block marked
`=== DECISION LOG — APPEND VERBATIM TO docs/decision-log.md ===`, append
everything inside that block to `docs/decision-log.md` exactly as written,
**before starting the build**. Create `docs/` and `docs/decision-log.md` if they
don't exist.

### Logging your own decisions
While building, log any decision you make that was **not** already in the plan —
e.g. you swapped a library, changed a data shape, or worked around a constraint.
Use the same entry format. Set `Source: Code (build)`.

### What counts as a decision (granularity test)
Log a decision ONLY if you could defend it in an interview as a real choice
between alternatives — "chose X over Y because Z, and here's what I gave up."
- **LOG:** architectural tradeoffs, data-model choices, dependency selection,
  workarounds for a constraint — anything you'd explain to another engineer.
- **SKIP:** routine implementation, naming, formatting, obvious one-way steps.
When unsure, don't log. A short honest log beats a noisy one.

### Entry format
```
### D-YYYY-MM-DD-NN · [TYPE] · short title
- **Date:** YYYY-MM-DD
- **Source:** Code (build)
- **Decision:** what you chose
- **Alternatives / dead ends:** what you considered or tried and rejected, and why
- **VP signal:** the senior-level judgment this shows (raw — do NOT hiring-polish)
- **Outcome / impact:** _(leave blank)_
```
`TYPE` is one of: PRODUCT · UX · ARCH · PROCESS

### ID numbering
Before adding your own entries, read `docs/decision-log.md`, find the highest
`NN` already used for today's date (including any you just appended from the
incoming prompt), and continue from the next number. Never reuse or renumber
existing IDs.

### Rules
- **Append only.** Never edit, reorder, or reword existing entries.
- Always leave `Outcome / impact` blank — it's filled in by hand later.
- Keep entries raw and honest, including mistakes and abandoned approaches.
