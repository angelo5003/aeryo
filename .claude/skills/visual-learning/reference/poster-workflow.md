# Poster Workflow (The 4-Step Loop & Persistence) — read on demand from SKILL.md

> Referenced by `SKILL.md` and `reference/post-plan-storyboard.md`. Executes external image generation prompts, version-controlled persistence, and fact-checking.

### Step 1: The Structured Dataset & Artifact Persistence (The Educational Payload)
- Present the exact text blocks that will appear on the poster (or storyboard parts). Include Topic, Thesis, Art Direction, Visual Type (Flow, Architecture, Comparison, Timeline), and verbatim text. Dutch text with English terms in parentheses.
- **Save to Repo:** Automatically create or update a version-controlled markdown file at `docs/visuals/[feature-name]/dataset.md` containing these datasets and prompts so they persist across sessions.

### Step 2: The Image-Generation Prompt
Generate the English prompt(s) for ChatGPT/Nanobanana. Enforce `--ar 16:9`, specific hex colors, and strict constraints: *"Reproduce text blocks verbatim. Do NOT translate Dutch back to English. Do NOT add extra slogans, captions, or filler text in the margins."* Instruct the user to run the prompt and upload the image back. **STOP HERE.**

### Step 3: Fact-Check & Verification (Wait for user upload)
Once the user uploads the generated image, scan it for garbled text, dropped numbers, or auto-translations. Output a grouped list in Dutch: **Must-fix (factual/spelling) / Should-fix (layout/AI filler) / Optional**.

### Step 4: Scoped Correction Prompt
Provide final English paste-back prompt(s) containing only the flagged changes from Step 3, ending with: *"Do not change or add any other text, number, colour, or element. Recheck spelling."* Save any final corrected prompts to the `docs/visuals/[feature-name]/` folder.
