# 06. Escalation Protocol & File Precedence

> Formerly `aeryo-core.md` §9, the last surviving section of the v4
> monolith once §1–§8, §10, §11 were split into `00`–`05`. Renamed to match
> the numbering scheme at the user's request. This file is now the one
> home for the precedence chain — previously restated in full in both
> `aeryo-core.md` and `00-project-context-architecture.md`; both now point
> here instead. v1–v4 are archived in `docs/archive/` and withdrawn — do
> not follow them.
>
> **Renamed-file cleanup done in this pass:** `.cursor/rules/aeryo-stack.mdc`
> now imports all eight files below instead of the old `aeryo-core.md`;
> every `aeryo-core.md §9` cross-reference in files `00`–`05` now points
> here instead. `07-planning-mode.md` is the later opt-in planning layer
> (`PLAN:`), same tier as `00`–`06`.

## System Rule Precedence (highest to lowest)

When tools, agents, or rule files disagree, resolve the conflict using this
exact hierarchy — don't average across sources or pick whichever is more
convenient:

1. `package.json` + the lockfile. Always wins on versions and installed
   packages, over every rule file including this one.
2. `.claude/rules/*.md` — `00-project-context-architecture.md`,
   `01-learning-mode-output-style.md`, `02-supabase-data-architecture.md`,
   `03-capacitor-mobile-offline-first.md`,
   `04-frontend-architecture-performance.md`,
   `05-app-store-compliance-auth-security.md`, this file, and
   `07-planning-mode.md`. All equal tier; none of them outranks another.
3. `AGENTS.md` — grounding (source order, static export constraints,
   Chakra denylist).
4. `TESTING.md`.
5. `PRODUCT.md`.
6. `.cursor/rules/*` — if a Cursor rule contradicts any file in tier 2,
   tier 2 wins and that Cursor rule is stale.

Token/palette and identity/key conventions are the one documented exception
to "state the rule here, don't restate it elsewhere": they each have one
home in `.cursor/rules/design-tokens.mdc` and
`.cursor/rules/identity-by-id.mdc` respectively, referenced by number 2
above rather than duplicated into it.

## The Escalation Protocol ("pulling the emergency brake")

- If following one rule would require violating another, **stop
  immediately** — do not write the code, do not pick a side, do not keep
  going and mention it later.
- **State the conflict explicitly to the user:** name both rules by file
  and section, explain the specific technical tension in plain language,
  and ask for a decision. A vague "there might be a tradeoff here" does not
  satisfy this — name the exact two things that can't both be true.
- **Never silently pick a side.** Proceeding as if no conflict existed,
  even if the choice you'd have made was reasonable, is a **severe
  violation** of this learning-mode constraint: the whole point of this
  document is that the user decides policy tradeoffs, not the agent.
- A visible, named conflict — even one left unresolved for a turn while
  the user thinks about it — is fully compliant. A silently-resolved one
  is not, regardless of whether the resolution was correct.
- This has already come up twice while building this rule set: the
  service-role-key placement and `@supabase/ssr` questions in
  `02-supabase-data-architecture.md` were both real conflicts (with the
  static-export rule in `00-project-context-architecture.md`) that were
  named and put to the user before being written down as settled rules.
