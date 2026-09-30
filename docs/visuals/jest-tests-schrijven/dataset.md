# Writing Jest tests — storyboard (3 parts)

> `/visual-learning` dataset, 2026-09-30. Running example: `useHideOnScroll`
> (`src/app/_hooks/useHideOnScroll/useHideOnScroll.ts` + `.test.ts`).
> Goal: after this storyboard the reader can write `BottomBar.test.tsx`
> (step 4 of `docs/superpowers/plans/2026-09-25-app-navigation.md`) alone.
> Format: 3 × 16:9, each with "Before" (wrong) on the left and "After"
> (right) on the right. Simple junior-developer language, no analogies.
> Tutor gaps: test-arrange-act-assert, renderHook-result-current,
> test-must-be-able-to-fail.

## Sources

- `package.json`: `jest` ^30.4.2, `@testing-library/react` ^16.3.2 (gives
  `renderHook`, `fireEvent`, `waitFor`), `framer-motion` ^13.1.1.
- `src/app/_hooks/useHideOnScroll/useHideOnScroll.ts`: thresholds 8 px
  (always show the bar near the top) and 6 px (smallest scroll step that
  counts).
- `src/app/_hooks/useHideOnScroll/useHideOnScroll.test.ts`: the "After"
  lines are copied from this file.
- The "Before" lines are rebuilt from the tutor gaps of 2026-09-29, not from
  a commit (that version was never committed).

## Art direction (all parts)

- 16:9 landscape, 1920×1080, calm educational infographic, lots of whitespace.
- Background Off-White `#EDF8F6`, text North Sea Ink `#071216`.
- Accent AERYO Teal `#106B70` for headings and arrows.
- "Before" panel: border and label in Danger `#B84740`, with a ✗ icon.
- "After" panel: border and label in Success `#41B981`, with a ✓ icon.
- Code in a monospace font on a light grey-teal block, at most 3 lines per
  block, big enough to read when printed.
- Colour is never the only signal: always the word "Before"/"After" and ✗/✓.
- No illustrations of people or objects. Visuals are simple boxes and
  arrows that show the code flow.

---

## Part 1 of 3 — Arrange, Act, Assert

**Visual type:** Before & After (left Before, right After) with a 3-step
strip at the top.

**Title:** A test in 3 steps: Arrange, Act, Assert

**Thesis:** Check what the hook answers, not what you did yourself.

**Strip at the top (3 boxes with arrows between them):**

1. **Arrange** — Make a fake `<main>` and start the hook.
2. **Act** — Scroll the page, like a user would.
3. **Assert** — Check what the hook says now.

**Before (✗) — label: "Checks your own action"**

```
scrollingElement.scrollTo(0, 200);
expect(scrollingElement.scrollTo).toHaveBeenCalledWith(0, 200);
```

Explanation: This test only checks that you called `scrollTo`. That is the
Act step, not the result. And `scrollTo` is not a mock function, so Jest
cannot check this at all.

**After (✓) — label: "Checks the hook's answer"**

```
scrollingElement.scrollTop = 200;
fireEvent.scroll(scrollingElement);
await waitFor(() => expect(result.current).toBe(true));
```

Explanation: First really scroll the page. Then tell the hook the page
scrolled. Then wait until the hook answers: the bar is hidden.

**Footer:** `toHaveBeenCalledWith` only works on a mock function (`jest.fn()`).

---

## Part 2 of 3 — renderHook and result.current

**Visual type:** Before & After with a small 3-box flow diagram at the top.

**Title:** Testing a hook without a screen: renderHook

**Thesis:** `result.current` is the hook's answer. You read it. You don't
use it to do things.

**Flow diagram (3 boxes with arrows):**

`renderHook(() => useHideOnScroll(ref))` → the hook runs →
`result.current` is `true` or `false` ("is the bar hidden?")

**Short explanation next to the diagram:** A hook only runs inside a
component. `renderHook` makes a tiny test component for you, so you can
run the hook on its own.

**Before (✗) — label: "Using the answer as if it can do things"**

```
result.current.scrollTo(0, 200);
```

Explanation: Here `result.current` is a boolean (true or false). A boolean
cannot scroll. You scroll the element you made yourself.

**After (✓) — label: "Scroll the element, read the answer"**

```
scrollingElement.scrollTop = 200;
fireEvent.scroll(scrollingElement);
await waitFor(() => expect(result.current).toBe(true));
```

Explanation: The element (`scrollingElement`) is what you control. The
answer (`result.current`) is what you check.

**Footer:** Read `result.current` again after every change. It updates
when the hook gives a new answer.

---

## Part 3 of 3 — A test must be able to fail

**Visual type:** Before & After with a "break the code" check in the middle
(arrow: "break the code on purpose → does the test turn red?").

**Title:** Can this test actually fail?

**Thesis:** A test that is always green protects nothing.

**Before (✗) — label: "Green, even when the code is broken"**

```
scrollingElement.scrollTop = 4;
expect(result.current).toBe(false);
```

Explanation: The bar starts visible (`false`). You scroll to 4 pixels and
expect `false`. But it was already `false`. Remove the "always show near the
top" rule and this test is still green.

**After (✓) — label: "Hide first, then check"**

```
scrollTop = 12  →  expect true   (bar hidden)
scrollTop = 7   →  expect false  (near top: bar back)
```

Explanation: First scroll to 12 pixels, so the bar really hides. Then go
back to 7. That step is only 5 pixels, too small to bring the bar back
normally. Only the "always show near the top" rule (below 8 pixels) makes it
visible again. If that rule breaks, this test turns red.

**Check in the middle (3 steps):**

1. Break the rule on purpose.
2. Run the test.
3. Red? The test really checks something. Green? The test is useless.

**Footer:** Make sure the starting value is different from the result you
expect.

---

## Image prompts (English)

Paste one prompt at a time into ChatGPT or Nano Banana. Then upload each
image here for the fact-check.

### Prompt part 1

```
Create a 16:9 landscape educational infographic (1920x1080), calm and clean, lots of whitespace. Background #EDF8F6, body text #071216, headings and arrows #106B70. No illustrations of people or objects: use only simple boxes, arrows and icons. --ar 16:9

Layout:
- Top: large title and a one-line thesis under it.
- Below the title: a horizontal strip of 3 numbered boxes connected by arrows.
- Main area: two side-by-side panels. LEFT panel has a #B84740 border, a red ✗ icon and the label "Before". RIGHT panel has a #41B981 border, a green ✓ icon and the label "After". Each panel: a label line, a monospace code block on a light grey-teal background, then a short explanation.
- Bottom: a thin footer bar with one line of text.

Text (reproduce verbatim):
Title: "A test in 3 steps: Arrange, Act, Assert"
Thesis: "Check what the hook answers, not what you did yourself."
Strip box 1: "1. Arrange — Make a fake <main> and start the hook."
Strip box 2: "2. Act — Scroll the page, like a user would."
Strip box 3: "3. Assert — Check what the hook says now."
Left panel label: "Before — Checks your own action"
Left code (monospace, 2 lines):
scrollingElement.scrollTo(0, 200);
expect(scrollingElement.scrollTo).toHaveBeenCalledWith(0, 200);
Left explanation: "This test only checks that you called scrollTo. That is the Act step, not the result. And scrollTo is not a mock function, so Jest cannot check this at all."
Right panel label: "After — Checks the hook's answer"
Right code (monospace, 3 lines):
scrollingElement.scrollTop = 200;
fireEvent.scroll(scrollingElement);
await waitFor(() => expect(result.current).toBe(true));
Right explanation: "First really scroll the page. Then tell the hook the page scrolled. Then wait until the hook answers: the bar is hidden."
Footer: "toHaveBeenCalledWith only works on a mock function (jest.fn())."

Reproduce text blocks verbatim. Do NOT add extra slogans, captions, or filler text in the margins. Code must be exact, character for character, in a monospace font. Colour is never the only signal: keep the words "Before"/"After" and the ✗/✓ icons.
```

### Prompt part 2

```
Create a 16:9 landscape educational infographic (1920x1080), calm and clean, lots of whitespace. Background #EDF8F6, body text #071216, headings and arrows #106B70. No illustrations of people or objects: use only simple boxes, arrows and icons. --ar 16:9

Layout:
- Top: large title and a one-line thesis under it.
- Upper middle: a horizontal flow diagram of 3 boxes connected by arrows, with a short explanation text next to it.
- Main area: two side-by-side panels. LEFT panel has a #B84740 border, a red ✗ icon and the label "Before". RIGHT panel has a #41B981 border, a green ✓ icon and the label "After". Each panel: a label line, a monospace code block on a light grey-teal background, then a short explanation.
- Bottom: a thin footer bar with one line of text.

Text (reproduce verbatim):
Title: "Testing a hook without a screen: renderHook"
Thesis: "result.current is the hook's answer. You read it. You don't use it to do things."
Diagram box 1 (monospace): "renderHook(() => useHideOnScroll(ref))"
Diagram box 2: "the hook runs"
Diagram box 3: "result.current = true or false (is the bar hidden?)"
Explanation next to the diagram: "A hook only runs inside a component. renderHook makes a tiny test component for you, so you can run the hook on its own."
Left panel label: "Before — Using the answer as if it can do things"
Left code (monospace, 1 line):
result.current.scrollTo(0, 200);
Left explanation: "Here result.current is a boolean (true or false). A boolean cannot scroll. You scroll the element you made yourself."
Right panel label: "After — Scroll the element, read the answer"
Right code (monospace, 3 lines):
scrollingElement.scrollTop = 200;
fireEvent.scroll(scrollingElement);
await waitFor(() => expect(result.current).toBe(true));
Right explanation: "The element (scrollingElement) is what you control. The answer (result.current) is what you check."
Footer: "Read result.current again after every change. It updates when the hook gives a new answer."

Reproduce text blocks verbatim. Do NOT add extra slogans, captions, or filler text in the margins. Code must be exact, character for character, in a monospace font. Colour is never the only signal: keep the words "Before"/"After" and the ✗/✓ icons.
```

### Prompt part 3

```
Create a 16:9 landscape educational infographic (1920x1080), calm and clean, lots of whitespace. Background #EDF8F6, body text #071216, headings and arrows #106B70. No illustrations of people or objects: use only simple boxes, arrows and icons. --ar 16:9

Layout:
- Top: large title and a one-line thesis under it.
- Main area: three columns. LEFT panel has a #B84740 border, a red ✗ icon and the label "Before". CENTER column is a narrow vertical 3-step check with arrows pointing down. RIGHT panel has a #41B981 border, a green ✓ icon and the label "After". Side panels: a label line, a monospace code block on a light grey-teal background, then a short explanation.
- Bottom: a thin footer bar with one line of text.

Text (reproduce verbatim):
Title: "Can this test actually fail?"
Thesis: "A test that is always green protects nothing."
Left panel label: "Before — Green, even when the code is broken"
Left code (monospace, 2 lines):
scrollingElement.scrollTop = 4;
expect(result.current).toBe(false);
Left explanation: "The bar starts visible (false). You scroll to 4 pixels and expect false. But it was already false. Remove the 'always show near the top' rule and this test is still green."
Center step 1: "1. Break the rule on purpose."
Center step 2: "2. Run the test."
Center step 3: "3. Red? The test really checks something. Green? The test is useless."
Right panel label: "After — Hide first, then check"
Right code (monospace, 2 lines):
scrollTop = 12  →  expect true   (bar hidden)
scrollTop = 7   →  expect false  (near top: bar back)
Right explanation: "First scroll to 12 pixels, so the bar really hides. Then go back to 7. That step is only 5 pixels, too small to bring the bar back normally. Only the 'always show near the top' rule (below 8 pixels) makes it visible again. If that rule breaks, this test turns red."
Footer: "Make sure the starting value is different from the result you expect."

Reproduce text blocks verbatim. Do NOT add extra slogans, captions, or filler text in the margins. Code must be exact, character for character, in a monospace font. Colour is never the only signal: keep the words "Before"/"After" and the ✗/✓ icons.
```
