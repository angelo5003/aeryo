# Visual Style Guide — read on demand from SKILL.md

Load this before producing a visual, a print-ready guide, or a formal doc.

---

## Visual Design System

**Characteristics:** clean, professional, highly readable, beginner
friendly, calm, structured, print friendly, premium learning-material
appearance.

**Layout — pick the format from what the visual *is*, not a fixed default:**

- **Single-surface diagram or poster** (one flowchart, one architecture
  map, one labelled figure, one designed poster) → **16:9 landscape**
  (1600×900 or 1920×1080). This is the default for anything studied on a
  screen. The wider it is, the more a complex topic can spread branches
  side by side instead of cramming them into a vertical stack. Scale the
  canvas up — not the text down — when a topic has a lot of moving parts.
- **Paginated multi-page learning guide** meant to be printed or kept as a
  PDF → **A4 portrait**. Reading columns, page breaks and grayscale
  printing all want portrait here.
- User asked for a specific format → honour it.

Clear title area, obvious section hierarchy, generous whitespace, balanced
spacing, consistent margins, strong visual flow.

**Typography:** large readable headings, short paragraphs, labels legible
when printed, no tiny text.

**Color:** restrained, professional palette. Use color primarily to
separate concepts and guide attention — never as the only way to
communicate meaning.

**Illustrations/icons:** simple, friendly, consistent. Every visual
element should support understanding; avoid decorative noise.

---

## Preferred Visual Types

Choose the format that best explains the concept.

- **Flow** — flowcharts for processes (Question → Process → Result).
- **Architecture** — system diagrams (User → Frontend → Backend →
  Database).
- **Comparison** — table or side-by-side (`| Option | Pros | Cons | Best
  for |`).
- **Timeline** — Past → Present → Future.
- **Cause & Effect** — Cause ↓ Effect.
- **Before & After** — side-by-side.

---

## Visual Generation Rule

If a concept would be significantly easier to understand visually,
**create it automatically** — don't ask permission first. Choose the most
appropriate format. Prioritize clarity over artistic style. The visual
must add information, not merely decorate the answer.

---

## Visual Quality Checklist

Every generated visual must aim for: crisp text, clear hierarchy,
consistent spacing, readable labels, coherent iconography, simple
composition, strong contrast, print-safe margins, high resolution.

Avoid: overcrowding, tiny labels, overlapping elements, cropped content,
ambiguous arrows, unnecessary decoration, excessive text inside images.

---

## Print-Ready Guide Mode

Applies to a **paginated multi-page learning guide** (see Layout). A4
portrait. A single-surface diagram or poster is not this mode — it goes
16:9 landscape and skips the page-break and grayscale rules. Requirements:
print-ready
layout, safe margins, readable typography, high-resolution visuals,
consistent spacing, clean page breaks, complete diagrams, no cropped
content. Design every page to remain useful printed in grayscale where
practical.

End the last page with a small **Sources** footer — one line per source
from `delivery.md` § "Sources — Show Your Work" (repo file, docs path,
skill/MCP tool, or URL). Small, muted text is fine; it just needs to be
present and legible, not prominent.

---

## Render Validation

Before finalizing any visual guide, check: dimensions match the chosen
format ✓ (16:9 landscape for a single-surface diagram/poster, A4 portrait
for a paginated guide), no cropped content ✓, no overlapping elements ✓, no
text outside the page ✓,
consistent margins ✓, readable labels ✓, readable title ✓, clear section
hierarchy ✓, correct page breaks ✓, complete diagrams ✓, print-friendly
quality ✓, visuals actually improve understanding ✓, Sources footer present
and legible ✓ (or explicitly noted as not applicable, per "Sources — Show
Your Work" in `delivery.md`).

If a check fails: fix or regenerate, render again, inspect again, only
then deliver the final file. Never present an unchecked render as final.

---

## Documentation Mode

Include the parts useful for the user's goal, when applicable: Overview,
Purpose, How it works, Visual, Example, Risks, Trade-offs, Recommendation,
Next step. Documentation should be understandable without extra
explanation.

---

## Guide Generation Rule

**Default: match the language of the user's request.** If the user
writes in English, the whole guide — explanation and technical material
alike — stays in English. Never silently switch the output to another
language.

Whether a second, native-language track is warranted is decided once,
at first use of this skill in the project — see `delivery.md` § "Output
Language (first run in a project)" for the ask-and-remember flow. Once a
language preference is recorded there:

- **a language is recorded** → always add the second track below,
  automatically, without the user asking again per request;
- **"no translation" is recorded** → never add it; stay English-only.

Don't infer a language from a name, past habit, or a topic being hard —
only the recorded preference (or an explicit ask in the current
message) decides this.

When a second track is warranted, split it exactly like this:

1. **English source material** for technical instructions/configuration
   — may be advanced and precise, since technical docs and official
   sources are usually English-first. This track is never translated.
2. **Native-language learning material** for the user's explanation and
   study guide only — kept simple, in the language confirmed above.

Don't translate standard technical terms automatically — explain the
term in the native language first, then give the standard English term,
when that helps.

---

## Learning Optimization Sequence

Explanation → Analogy → Visual → Example → Practice → Quick recap. For
complex topics, add a small self-test or question at the end when useful.
