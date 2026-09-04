#!/usr/bin/env node
import path from "node:path";
import { pathToFileURL } from "node:url";
// Converts a print-ready HTML file (e.g. a docs/leren/*.nl.html leergids) to PDF.
// Uses the Chromium already installed for Playwright's e2e tests — no new dependency.
// page.pdf() is Chromium-only; per node_modules/playwright-core/types/types.d.ts (Page.pdf).
import { chromium } from "playwright";

const input = process.argv[2];
if (!input) {
  console.error("Gebruik: node scripts/html-to-pdf.mjs <pad-naar-html>");
  process.exit(1);
}

const outputPath = input.replace(/\.html$/, ".pdf");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(input)).href, {
  waitUntil: "networkidle",
});
// preferCSSPageSize respects the file's own `@page { size: A4 portrait; margin: 18mm }` rule.
await page.pdf({
  path: outputPath,
  preferCSSPageSize: true,
  printBackground: true,
});
await browser.close();

console.log(`PDF opgeslagen: ${outputPath}`);
