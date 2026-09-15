# Post-Plan, Code Validation & Multi-Image Storyboarding — read on demand from SKILL.md

> Referenced by `SKILL.md`. Bridges the gap between the `PLAN:` execution, actual code changes, and visual documentation.

1. **The Trigger (`--from-plan`):** When invoked with `--from-plan`, read the completed feature plan.
2. **Code-to-Visual Validation:** Inspect the actual modified files or `git status`/`git diff` of the implemented feature. Ensure the visual payload reflects the *realized code* and actual component structure, not just the initial abstract plan.
3. **Scope Assessment (Single vs. Multi-Image):** 
   - Evaluate if the feature is too complex for a single 16:9 canvas (e.g., combining UI, Capacitor local preferences, and Supabase backend logic).
   - If a single poster would become overcrowded, **automatically structure a Multi-Image Series (Storyboard)** of 2 to 3 sequential parts (e.g., Part 1: UI & Local State, Part 2: Offline Queue, Part 3: Supabase Sync).
4. **Execution Handshake:** Feed the validated storyboard parts directly into `reference/poster-workflow.md`.
