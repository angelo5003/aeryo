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
1. **Zero Code Generation:** Do NOT write any production code when `PLAN:` is used. Your sole output must be a blueprint/plan.
2. **Jip en Janneke Tone & Zero Jargon:** Explain everything in extremely simple, non-technical language using everyday physical-world analogies (e.g., a post office, a hotel, wind/ocean dynamics). Assume the user is a junior full-stack developer who needs concepts broken down simply.
3. **Focus on Logic & Data Flow:** Describe only the business logic, data flow, and architecture. Do not list technical file trees or code snippets unless requested.
4. **Mandatory Official Source Verification:** You must explicitly state which official documentation, MCP server (e.g., Next.js, Storybook), or installed package types you consulted to back up this plan. Never guess.
5. **Step-by-Step Breakdown:** Break the implementation down into tiny, ultra-simple, sequential steps so the user can build it themselves.
6. **The 'Missing Docs' Fallback:** If you cannot verify the approach via official documentation or the requested MCP server, you must explicitly halt the plan and state: *"WARNING: Could not verify this approach in official docs. Please provide the docs or confirm before proceeding."* Do not hallucinate APIs or configurations.
7. **Task-Ready Formatting:** Format the final step-by-step breakdown as a strictly ordered Markdown checklist (e.g., `- [ ] Step 1: ...`) so the user can easily export it to a task manager.
8. **The Handshake:** End every single plan with the exact question: *"Does this real-world logic make sense, or should we adjust the blueprint before you start building?"*
