import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { spacing } from "@/design-system/tokens/spacing";

/**
 * Guard: spacing in `src/` uses steps from the spacing scale, never raw
 * pixel or rem values. Same idea as the raw-color guard in
 * `semantic-tokens.test.ts`.
 */

const SOURCE_FOLDER = join(process.cwd(), "src");

// Files that are allowed to hold raw values: tests, stories and the token files themselves.
const isCheckedFile = (filePath: string): boolean =>
  /\.(tsx|ts|css)$/.test(filePath) &&
  !/\.(test|spec|stories)\.(tsx|ts)$/.test(filePath) &&
  !filePath.includes(`${join("src", "design-system", "tokens")}`) &&
  !filePath.includes(`${join("src", "lib", "supabase")}`);

const listFilesIn = (folder: string): string[] =>
  readdirSync(folder).flatMap((name) => {
    const path = join(folder, name);
    return statSync(path).isDirectory() ? listFilesIn(path) : [path];
  });

const SPACING_PROPERTY_NAMES = [
  "p",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "ps",
  "pe",
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "ms",
  "me",
  "gap",
  "rowGap",
  "columnGap",
  "padding",
  "paddingX",
  "paddingY",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "margin",
  "marginX",
  "marginY",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
].join("|");

const CSS_SPACING_PROPERTY_NAMES =
  "(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|bottom|left|right|inline|block))?";

const scaleSteps = new Set(Object.keys(spacing));

const isRawPixelOrRemValue = (value: string): boolean =>
  /^-?\d*\.?\d+(px|rem|em)$/.test(value);

const isStepOutsideScale = (value: string): boolean =>
  /^-?\d*\.?\d+$/.test(value) && !scaleSteps.has(value.replace(/^-/, ""));

const findProblemsInFile = (filePath: string): string[] => {
  const text = readFileSync(filePath, "utf8");
  const problems: string[] = [];

  // Chakra props: p="4", p={4}, p={{ base: 4, md: 6 }}, and object keys padding: "4".
  const chakraPattern = new RegExp(
    `\\b(?:${SPACING_PROPERTY_NAMES})(?:=\\{\\{([^}]*)\\}\\}|=\\{?["']?([^\\s}"'>]+)|:\\s*["']?([^\\s,}"'\`]+))`,
    "g",
  );
  for (const match of text.matchAll(chakraPattern)) {
    const values =
      match[1] !== undefined
        ? [...match[1].matchAll(/:\s*["']?([^\s,"']+)/g)].map((m) => m[1])
        : [match[2] ?? match[3]];
    for (const value of values) {
      if (isRawPixelOrRemValue(value) || isStepOutsideScale(value)) {
        problems.push(`${match[0].trim()}`);
      }
    }
  }

  // Plain CSS or style strings: padding: 12px
  const cssPattern = new RegExp(
    `(?<![-\\w])${CSS_SPACING_PROPERTY_NAMES}\\s*:\\s*[^;}"'\`]*\\b\\d+(?:\\.\\d+)?(?:px|rem)\\b`,
    "g",
  );
  for (const match of text.matchAll(cssPattern)) {
    problems.push(match[0].trim());
  }

  return problems;
};

describe("spacing usage", () => {
  const checkedFiles = listFilesIn(SOURCE_FOLDER).filter(isCheckedFile);

  it("should find the source files to check", () => {
    expect(checkedFiles.length).toBeGreaterThan(20);
  });

  it("should use spacing scale steps and never raw px or rem values", () => {
    const problemsByFile = checkedFiles
      .map((filePath) => ({
        file: relative(process.cwd(), filePath),
        problems: findProblemsInFile(filePath),
      }))
      .filter(({ problems }) => problems.length > 0);

    expect(problemsByFile).toEqual([]);
  });

  it("should catch a raw pixel value and a step outside the scale", () => {
    expect(isRawPixelOrRemValue("12px")).toBe(true);
    expect(isRawPixelOrRemValue("4")).toBe(false);
    expect(isStepOutsideScale("7")).toBe(true);
    expect(isStepOutsideScale("-4")).toBe(false);
    expect(isStepOutsideScale("1.5")).toBe(false);
  });
});
