---
name: visual-learning
description: Use when the user runs /visual-learning to teach a topic with an educational poster or storyboard, or /visual-learning --from-plan to visualize a just-built feature against its real code.
---

# Visual Learning — Master Router

> Modular skill architecture. Follows progressive disclosure: the router (`SKILL.md`) handles triggers and core principles, while loading specific execution steps from `reference/` on demand.

## When this applies & Triggers
- **`/visual-learning [topic]`**: Standard mode for teaching a concept.
- **`/visual-learning --from-plan`**: Post-plan mode to visualize completed features built via `PLAN:` (see `reference/post-plan-storyboard.md`).

## Task Intake Gate (mandatory, both modes)
Before Step 1 of either mode, run Phase 1 of `~/.claude/rules/task-intake-race.md`:
rate the raw `/visual-learning` prompt 1–10, state what's missing for a 10/10,
ask 3–5 targeted clarifying questions, then stop and wait for the reply. This
applies to **both** `/visual-learning [topic]` and `/visual-learning --from-plan`
— the global rule's "follow-up turn" skip clause does not exempt `--from-plan`
here; this skill always gates first regardless of trigger form.

## Core Principles
1. **Understanding comes first:** Never introduce a technical term without a plain-language, physical-world analogy (e.g., a restaurant, warehouse, or post office).
2. **Bilingual Execution:** Explanations and datasets are written in **Dutch ('Jip en Janneke' taal)**, appending standard English technical terms in parentheses where helpful (e.g., "Verdamping (evaporation)"). Generated image prompts for external tools must remain strictly in **English**.
3. **Strict Constraints:** No code generation, no file trees, and no inline SVG/HTML.
4. **Artifact Persistence:** All generated datasets and prompts must be saved directly into the repository under `docs/visuals/[feature-name]/` for version control.

## Reference Files & Routing
- **For Stack & Security checks:** Read `reference/auto-discovery-security.md` before generating content.
- **For Post-Plan, Validation & Storyboards:** Read `reference/post-plan-storyboard.md` when invoked via `--from-plan`.
- **For the Core 4-Step Generation Loop:** Read `reference/poster-workflow.md` to execute dataset creation, persistence, prompts, and fact-checking.
