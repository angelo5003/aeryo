/**
 * Builds the `components/bundle.js` the published page needs from the real components in `src/`.
 * Run from the repository root: node docs/design-system/build/build-bundle.mjs
 *
 * The bundle carries its own React and Chakra because the page's default
 * React is version 18, while this app is on React 19.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const designSystemFolder = path.resolve("docs/design-system");
const entryFile = path.join(designSystemFolder, "build/bundle-entry.tsx");
const nextLinkStandIn = path.join(
  designSystemFolder,
  "build/next-link-stand-in.tsx",
);
// Kept out of the repository so lint and Prettier never scan generated code.
const bundleFolder = path.resolve("node_modules/.cache/aeryo-design-system");
const bundleFile = path.join(bundleFolder, "bundle.js");

await mkdir(bundleFolder, { recursive: true });

await build({
  entryPoints: [entryFile],
  outfile: bundleFile,
  bundle: true,
  minify: true,
  format: "iife",
  globalName: "Aeryo",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  charset: "ascii",
  legalComments: "none",
  logLevel: "warning",
  alias: { "next/link": nextLinkStandIn },
  define: { "process.env.NODE_ENV": '"production"' },
});

// Each component folder becomes one card, so helpers and sub-parts get none.
const componentFolderEntries = await readdir(
  path.join(designSystemFolder, "components"),
  { withFileTypes: true },
);
const componentNames = componentFolderEntries
  .filter(
    (folderEntry) =>
      folderEntry.isDirectory() &&
      folderEntry.name !== "Cover" &&
      folderEntry.name !== "lib",
  )
  .map((folderEntry) => folderEntry.name)
  .sort();

const bundleHeader = `/* @ds-bundle: ${JSON.stringify({
  format: 4,
  namespace: "Aeryo",
  components: componentNames.map((componentName) => ({ name: componentName })),
})} */\n`;

// The page inlines this script, so these two strings must not appear literally.
const bundleBody = (await readFile(bundleFile, "utf8"))
  .replaceAll("</script", "<\\/script")
  .replaceAll("<!--", "\\x3C!--");

await writeFile(bundleFile, bundleHeader + bundleBody);
console.log(`Bundled ${componentNames.length} components: ${bundleFile}`);
