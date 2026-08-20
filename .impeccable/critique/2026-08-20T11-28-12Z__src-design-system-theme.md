---
target: src/design-system/theme (colors + branding.md)
total_score: 8
max_score: 12
na_heuristics: 1,3,5,6,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-20T11-28-12Z
slug: src-design-system-theme
---
Method: dual-agent (two isolated background sub-agents, Assessment A and Assessment B)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | n/a | no interactive flow to surface status in |
| 2 | Match System / Real World | 3/4 | teal/lime story matches the stated wind-instrument identity well; docked because `wind.extreme`/`session.cancelled` fall outside that narrative with no equivalent grounding |
| 3 | User Control and Freedom | n/a | static tokens, nothing to undo |
| 4 | Consistency and Standards | 2/4 | `accent.contrast` is the one token not shaped like every other pair (`_light`/`_dark`) — it's flat, and that shortcut produces the P0 below; plus red/orange are used without being named as sanctioned exceptions |
| 5 | Error Prevention | n/a | no user input to validate |
| 6 | Recognition Rather Than Recall | n/a | component-level concern, not token-level |
| 7 | Flexibility and Efficiency | n/a | no interaction to accelerate |
| 8 | Aesthetic and Minimalist Design | 3/4 | "one primary + one controlled highlight" is honored at the accent/rider/session/wind-core level, but restraint quietly widens to include unexamined red/orange without the docs saying so |
| 9 | Error Recovery | n/a | no error states at this layer |
| 10 | Help and Documentation | n/a as a heuristic (no end-user help surface) — though in-file comments are genuinely strong developer documentation, noted under cognitive load instead |
| **Total** | | **8/12** | **Acceptable (67%)** |

Three heuristics applied (2, 4, 8); the other seven are legitimately n/a — this target is a token layer, not an interactive surface.

### Design Specificity Verdict

**LLM assessment:** This reads as authored for AERYO, not generic dark-SaaS — but only because of the paper trail, not because the tokens alone would prove it out of context. `ink`/`teal`/`lime` are literally anchored to the brand reference's hexes (`#071216`, `#0D2931`, `#19AEB5`, `#D7FF3F`) and the code comments narrate why each survives or gets folded in — real rigor, and it earns the "one recognizable primary" claim. The crack: `session.cancelled` and `wind.extreme` reach for un-anchored Chakra stock `red`/`orange` with zero commentary — at exactly the two safety-critical touchpoints, the "everything traces to a reference hex" discipline silently drops.

**Deterministic scan:** The static CLI scan (`detect.mjs` over `Colors.stories.tsx`) found nothing — expected, since this rule engine mostly needs rendered DOM/CSS, not raw `.tsx`. The browser-injected scan (real console output, not fabricated) found 3 findings per story: `line-length`, `overused-font` (Roboto), and one `em-dash-overuse`/`text-occlusion` each — all three are false positives or context-inapplicable on inspection (detailed below). No structural or rendering defects: all 33 raw-palette swatches and all 23 semantic-token swatches render with solid, distinct, correctly-computed fills — confirmed via DOM inspection, not just eyeballing.

**Visual overlays:** The injected detector ran successfully inside the Storybook preview iframe during Assessment B's run, but the throwaway server serving it was shut down afterward per the skill's cleanup requirement — there is no live overlay in your browser right now. The console findings are summarized above and in Minor Observations below instead.

### Overall Impression

The palette-resolution work itself (the "combine the image with the branding" pass) is sound and well-reasoned — the wind-intensity scale is a genuinely thoughtful data encoding, not just a plausible-sounding rationalization. But the review surfaced one real, unambiguous accessibility bug sitting on the single most-used token pair in the system (`accent.solid` / `accent.contrast`), which every future primary button inherits. That's the one thing to fix before building on top of this.

### What's Working

- **Literal hex-anchoring with inline rationale.** Every primitive traces to a real brand-reference value with a comment explaining the decision — unusually disciplined for a token file, and it makes the branding.md "Resolved Palette" addendum verifiable against the code, not just aspirational.
- **`fg` on `bg` contrast is 17.5:1** — the primary text/background pairing clears AAA with enormous headroom, a strong foundation for a data-heavy dark interface.
- **The `wind.*` escalation is genuinely reasoned, not decorative.** calm→light→good climbs in brightness within one hue (teal), then breaks to a *different* hue (lime, then orange) exactly where §25's "never color alone" requirement bites — the hue break itself functions as a redundant signal.
- **No broken or blank swatches anywhere** (confirmed by both assessments independently) — every one of the 56 rendered swatches across both stories paints a real, correct color.

### Priority Issues

**[P0] `accent.contrast` on `accent.solid` fails contrast at 2.49:1 in dark mode** (independently verified via WCAG relative-luminance math — confirmed exact)
Why it matters: `accent.solid`/`accent.contrast` is the primary-button pairing — the only sanctioned brand accent per the restraint principle — and every primary CTA built on this token in dark mode gets label text below even the 3:1 large-text/UI floor, let alone 4.5:1 normal text. It's the single most-used token pair in the system.
Fix: make `accent.contrast` mode-aware like every other multi-value token — `ink.950` for dark mode (`#071216` on `#19AEB5` ≈ 7:1+) instead of the current flat `ink.50`.
Suggested command: /impeccable polish

**[P1] `fg.subtle` (`ink.500`) fails AA against both `bg` (3.77:1) and `bg.subtle` (3.02:1)**
Why it matters: this is the *more* muted of two muted-text tiers, so it's likely reached for on captions and timestamps — exactly where small text size makes the shortfall worse.
Fix: shift the dark value from `ink.500` toward `ink.400`, or explicitly scope it to large-text/icon-only use and document that.
Suggested command: /impeccable polish

**[P1] `fg.muted` on `bg.muted` lands at 4.12:1, just under AA**
Why it matters: `bg.muted` is a real promoted surface (hover/input states) and nothing prevents pairing `fg.muted` text on it.
Fix: nudge one value so the combination clears 4.5:1, or document that `fg.muted` shouldn't land on `bg.muted`.
Suggested command: /impeccable polish

**[P2] `wind.extreme`/`session.cancelled` use un-anchored Chakra stock orange/red, breaking the system's own stated rigor**
Why it matters: contrast itself is fine (8.4:1 and 6.9:1) — this is a consistency/authorship gap. The file's central claim ("one primary, one controlled highlight, everything else derived") is quietly false once red/orange count as unexamined hue families the top-level restraint comment never names.
Fix: add one line to the restraint-principle comment in `semantic-tokens.ts` explicitly sanctioning red/orange as universal danger/caution exceptions (this is actually already true in practice — it just isn't stated where the "policy" is stated).
Suggested command: /impeccable document

**[P3] `border.DEFAULT` dark mode is ~1.5:1 effective, far under the 3:1 UI-component floor**
Why it matters: fine if purely decorative (§23's "subtle borders"), risky if any future input/button ever relies on it alone to signal an edge.
Fix: a one-line comment marking it decorative-only, with a stronger token reserved for interactive boundaries.
Suggested command: /impeccable document

### Persona Red Flags

**Sam (Accessibility-Dependent User)** — the only persona that applies to a pure token layer, since every future screen inherits whatever contrast exists here. Full walkthrough: primary text and most of the wind-severity ramp pass comfortably; `accent.contrast`/`accent.solid` fails badly (2.49:1); `fg.subtle` fails in both places it's used; `fg.muted` fails on one of its three surface pairings. The other four standard personas (Alex, Jordan, Riley, Casey) are n/a — no screens, copy, or interaction states exist yet for them to react to.

### Minor Observations

- `rider.planning` and `session.planning` resolve to identical values under two separate namespaces — harmless, slightly redundant.
- The darkest ramp step of each family (`ink.950`, `teal.950`, `lime.950`) is correctly computed but visually hard to distinguish from Storybook's own dark chrome in the Raw Palette story — a documentation-page visibility nuance, not a token defect.
- `Colors.stories.tsx` renders every swatch by live token reference (never hardcoded hex) and labels both the token name and resolved value — a genuinely good living-reference pattern that keeps docs from drifting from code.
- `typography.ts` explicitly declines a custom type scale "until a real need shows up" — honest restraint, but it means §11's called-out "Data/metric" numeral legibility requirement (`18 kn`, `NW 24°`) isn't implemented yet. Already flagged in the file's own comment, not a hidden gap.
- Detector false positives (both confirmed, not asserted): `em-dash-overuse: 24` on the Semantic Tokens story is actually 1 real em-dash + 23 middle-dots (`·`) from the `token · value` label convention — the rule conflates U+00B7 with U+2014. `text-occlusion` on Raw Palette is the detector's own injected overlay label covering the page's own heading — a self-artifact, not a page defect. `line-length`/`overused-font` are technically accurate but arguably inapplicable to an internal documentation page rather than production UI/marketing copy.

### Questions to Consider

- If the restraint principle is "one primary, one controlled highlight, nothing else," should the code just say the real rule out loud — "one primary + one highlight + as many safety colors as needed" — instead of implying something stricter than what's actually implemented?
- `accent.contrast` is the one token that isn't mode-aware — was that a deliberate simplification, or did the "every token gets `_light`/`_dark`" discipline just never reach the one pairing that turns out to fail WCAG outright?
- §17 calls data visualization "a brand expression, not a utility layer" — confining `lime` to exactly one semantic slot is disciplined, but does it deliver on that ambition, or is AERYO's supposed signature data-viz moment currently just one CSS variable away from looking like every other dark dashboard, until a real chart component exists?
