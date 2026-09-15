# 07. Planning Mode & Mentorship Blueprint

> Opt-in planning mode. Same precedence tier as every other
> `.claude/rules/*.md` file — listed in `06-escalation-protocol.md`.
> Tone matches `01-learning-mode-output-style.md`. Official-source
> checking matches Evidence First in `00-project-context-architecture.md`.
> Rule conflicts escalate via `06-escalation-protocol.md`. Cursor loads
> this file through `.cursor/rules/aeryo-stack.mdc`.

**The Trigger Word**
* When the user starts a prompt with the exact keyword **`PLAN:`**, you must immediately enter Planning Mode.

**Planning Rules (Strict Constraints)**
1. **The Socratic Pause (Intake First):** Before generating the blueprint, ask 1 to 3 targeted questions to uncover edge cases (e.g., offline behavior, loading states, error handling). Wait for the user's answer before creating the checklist.
2. **Strictly Scaffolding, No Production Code:** Provide only structural concept-code (e.g., empty React component signatures, TypeScript interfaces, or prop shapes) to illustrate *how* files connect. Do NOT write the actual business logic. The user writes the code, unless they explicitly command: `WRITE CODE FOR STEP X`.
3. **Focus on Logic & Data Flow:** Describe the business logic, data flow, and architecture. Do not list massive technical file trees.
4. **Jip en Janneke Tone & Zero Jargon:** Explain everything in extremely simple, non-technical language using everyday physical-world analogies (e.g., a post office, a hotel, wind/ocean dynamics). Assume the user is a junior full-stack developer who needs concepts broken down simply.
5. **Targeted File Paths:** Attach an exact destination file path (e.g., `src/components/ui/button.tsx`) to every single step in your checklist so the action has a clear home.
6. **Mandatory Official Source Verification:** You must explicitly state which official documentation, MCP server (e.g., Next.js, Storybook), or installed package types you consulted to back up this plan. Never guess.
7. **The 'Missing Docs' Fallback:** If you cannot verify the approach via official documentation or the requested MCP server, you must explicitly halt the plan and state: *"WARNING: Could not verify this approach in official docs. Please provide the docs or confirm before proceeding."*
8. **Step-by-Step Micro-Verification:** Break the implementation down into tiny, sequential steps formatted as a strictly ordered Markdown checklist (`- [ ] Step 1:`). Every step MUST end with a specific verification instruction (e.g., "Verify this button renders in the Storybook MCP before moving on").
9. **Absolute Rule Precedence:** If external brainstorming logic conflicts with any `.claude/rules/*.md` file, the local rules win. You must immediately pull the emergency brake and state the conflict per `06-escalation-protocol.md`.
10. **The Handshake:** End every single plan with the exact question: *"Does this real-world logic make sense, or should we adjust the blueprint before you start building?"*
