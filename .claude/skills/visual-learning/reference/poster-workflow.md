# Illustrated Poster & Infographic Workflow — read on demand from SKILL.md

## When this applies

Only when the user wants a *designed, illustrated poster or infographic* in a
named art direction ("encyclopedia plate," "1950s textbook," "risograph,"
"editorial magazine") — a single visual surface where the illustration and
layout are the point.

Everything else stays native (`visual-style-guide.md`): a flowchart,
architecture diagram, or labelled figure → inline SVG/HTML; a multi-section
learning guide → the print-ready HTML → PDF flow in `delivery.md`. Native is
editable, theme-aware, and needs no round-trip — only reach outside when
painterly illustration and display typography are what's being asked for.

Needs an environment where the user can move an image between two apps
(desktop or web app, not a bare terminal). If they can't view a returned
image, say so and offer the native path.

## The loop

1. **Structured dataset — show it to the user.** Topic, one-sentence thesis,
   the named art direction, the audience. Then every text block that must
   appear on the poster, *verbatim* — title, labels, data points, source
   line. Note the source for each figure as you write it. This table is the
   educational payload and what the user keeps to rebuild or translate later.

   **Language.** The poster's text *is* the learning material, so it follows
   the recorded output language (`delivery.md` § Output Language). If a
   language is recorded (e.g. Dutch), write every text block in it, with
   terms handled per `visual-style-guide.md` § Guide Generation Rule — the
   recorded-language term first, the standard English term in parentheses
   where it aids recognition ("Verdamping (evaporation)"). Numbers, symbols
   and the source line stay as they are. If no preference is recorded yet,
   ask once here before generating — don't let a poster silently come out in
   the request's language when the user studies in another. "Sometimes
   English is easier for this one" overrides per-poster with no ceremony.

2. **Image-generation prompt** for an external tool (ChatGPT image mode is the
   current best fit; the prompt ports). Build it from `visual-style-guide.md`:
   format, the named style, palette as hex, typography roles, the Step 1 text
   with "reproduce verbatim, check every word's spelling," and an explicit
   exclusion of **added slogans, captions, or filler text in the margins** —
   image tools pad empty space with invented copy. If the text isn't English,
   name the language and add "render this text exactly, do not translate it" —
   image tools otherwise flip it back to English.

3. **Fact-check, in this order.** First re-verify your own Step 1 figures
   *against sources* — not from memory; a wrong number there survives both
   steps unchallenged. Then check the returned image: text rendered exactly
   (no garbled or dropped letters, numbers intact — pay extra attention to
   accented characters and long compound words in non-English text, where
   image tools garble most), nothing translated back to English, no invented
   text, labels placed right, facts matching the corrected dataset. Write
   corrections
   grouped **must-fix (factual) / should-fix (unsanctioned content) /
   optional**, titled in the recorded output language (`delivery.md`).

4. **Scoped correction prompt** — a paste-back edit listing only the flagged
   changes, ending "do not change or add any other text, number, colour, or
   element; recheck spelling." Re-run step 3 on the result. Two rounds is
   normal; more means the dataset or prompt needs rework, not another edit.
