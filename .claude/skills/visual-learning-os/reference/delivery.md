# Delivery — read on demand from SKILL.md

Three conditional add-ons for Visual Learning OS output: choosing the output
language on first use, adding a **Sources** line, and offering a **PDF**.
None of these is automatic — each has a trigger below.

---

## Output Language (first run in a project)

Skills have no real "on install" hook — the closest equivalent is **the first
time this skill actually produces a guide or explanation in this project**.
Handle language before anything language-dependent.

1. **Check first.** If this environment has a persistent memory mechanism
   (e.g. Claude Code project memory), recall whether the user's preferred
   output language for this skill is already recorded. If it is, skip to
   step 4 — never ask again. If no such mechanism exists, check this
   project's `CLAUDE.md` / `AGENTS.md` for a recorded preference instead.
2. **If none exists, ask once, inline.** Answer what the user actually asked
   first, then append this to the *same* reply — don't block the real answer
   on it:

   > This learning skill can translate the explanation into your native
   > language while keeping the technical/code parts in English. Would you
   > like that, and if so, which language?

3. **Record the answer** so it persists across sessions:
   - Persistent memory available → save it there, per that mechanism's
     conventions.
   - None available → note it in `CLAUDE.md` / `AGENTS.md` (or ask where
     the user wants it kept).
   - A language name → record it as the preference.
   - "No" / "English is fine" → record "no translation" explicitly, so it's
     never asked again either way.
4. **Apply automatically from then on** — no re-asking per request:
   - A recorded language → every guide/explanation gets the two-track split
     from `visual-style-guide.md` § Guide Generation Rule (English technical
     material + native-language explanation).
   - "No translation" recorded → stay English-only, matching the request's
     language, per that same rule's default.
5. **Changing it later needs no ceremony.** A plain sentence — "explain
   things to me in Spanish from now on," "actually just English is fine" —
   updates the existing record in place (don't create a duplicate) and takes
   effect immediately.

---

## Sources — Show Your Work

**Trigger:** the reply makes non-trivial technical claims that were actually
grounded in a specific file, doc page, or docs tool — i.e. the reply contains
a code sample, an API/prop/config detail, or a "this framework does X" claim
you looked up. Pure conceptual teaching ("how does indexing work"), opinion,
reasoning, and short recaps do **not** need a Sources line.

When it applies, end the reply with a short **Sources** line naming where the
non-trivial claims came from.

1. **Track sources as you go**, not by reconstructing afterward — each time a
   grounding step fires (repo file, bundled docs, installed types, a
   skill/MCP doc tool, a fetched docs page), note what was used.
2. **One line per source, plainest form:**
   - Repo file → `src/components/Button/Button.tsx`
   - Bundled docs → `node_modules/next/dist/docs/.../link.md`
   - Skill/MCP doc tool → the skill or tool name
   - Fetched official docs → the URL
3. **Grounded nothing (pure reasoning / opinion / recap)?** Omit the line
   entirely — don't write "Sources: none" and don't pad a list.
4. **Rendering a print-ready guide?** Carry this list into the document as a
   small Sources footer on the last page (see `visual-style-guide.md`).

---

## Offer a PDF

**Trigger:** the reply is genuinely guide-shaped — it contains a visual, or
numbered build/config steps, or a full Response-Structure walkthrough, or is
something the user would plausibly print or keep. A plain concept explanation,
a clarification, or a yes/no answer is **not** guide-shaped — don't offer.

When it applies:

1. **Ask, don't build.** Last line of the reply: something like "Want this as
   a PDF?" Wait for a yes — never generate one speculatively.
2. **On yes, build print-ready HTML first.** Reuse the content already given —
   don't re-derive or re-explain. Structure it per `visual-style-guide.md`
   (A4 portrait, safe margins, section hierarchy, print-safe contrast,
   `@page { size: A4; margin: ... }` CSS). Include the Sources list (above)
   as a small footer on the last page. Write it to a scratchpad/temp working
   file if one is available, otherwise a sensible temp location.
3. **Render to PDF with what's already installed** — check before assuming a
   tool is present:
   - Preferred: headless Chrome/Chromium print-to-PDF
     (`--headless --print-to-pdf=<out>.pdf <file>.html`) — respects the print
     CSS from step 2.
   - Fallback: a platform print-to-PDF utility already installed (e.g.
     `cupsfilter` on macOS).
   - Neither present → say so and ask before installing anything (per
     SKILL.md § "Grounding while this skill is active" — never install
     tooling on your own initiative).
4. **Confirm the result.** Report the file path plainly; run the Render
   Validation checklist from `visual-style-guide.md` before calling it done.
