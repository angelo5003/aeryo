export const SETTINGS_GROUPS = [
  { title: "Riding", groupKey: "riding" },
  { title: "Preferences", groupKey: "preferences" },
] as const;

// Types come from the array above. `[number]` means "any item in the array" (compile time only, no index is read).
// SettingsGroup is the union of all group objects.
// SettingsGroupKey is "riding" | "preferences", so a typo in a route's groupKey fails typecheck.
// Add a group to the array and both types update on their own.
export type SettingsGroup = (typeof SETTINGS_GROUPS)[number];
export type SettingsGroupKey = SettingsGroup["groupKey"];
