# 08. Dependency updates stay off feature branches

A repo-wide package update edits `package.json` and `package-lock.json`. Those edits belong on a branch cut from `main`. They must not remain in the working changes of a feature branch.

## When updating packages

1. Start from a clean `main`.
2. Create a branch named `chore/update-dependencies`.
3. Change dependency ranges and run the install or update on that branch.
4. Commit `package.json` and `package-lock.json` on that branch only.

## If those files are already dirty on a feature branch

Stash only those two files so they drop out of the feature branch changes. Do not stage or commit them with the feature. Apply the stash later on `chore/update-dependencies`, and only commit when asked.

```bash
git stash push -m "dependency update" -- package.json package-lock.json
```

A feature branch may still change `package.json` and `package-lock.json` when that feature adds or removes a dependency it needs. A version bump of packages the feature does not add does not belong there.
