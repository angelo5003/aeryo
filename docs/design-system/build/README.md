# Rebuilding the design system

This folder regenerates `docs/design-system` from the real code in `src/`, so the two can be compared after the code changes.

Run these from the repository root, in this order:

```bash
node docs/design-system/build/generate-tokens.mjs "$(git branch --show-current)@$(git rev-parse --short HEAD)"
node docs/design-system/build/generate-components.mjs
node docs/design-system/build/build-bundle.mjs
npx prettier --write docs/design-system
```

- `generate-tokens.mjs` writes `tokens.json` and prints every color pair that misses its contrast target.
- `generate-components.mjs` writes each component's `README.md` and `preview.html`. Add new components to its `COMPONENTS` list.
- `build-bundle.mjs` writes `node_modules/.cache/aeryo-design-system/bundle.js`, which runs the real components in the previews. It is generated and about 700 KB, so it is not committed. Publish it as `components/bundle.js`.

The published copy is the private Aeryo Design System artifact. Its photos are stored there, and `SpotCard` and `SpotHeader` previews load one by its `/_blob/` address, so that image only appears on the published page.
