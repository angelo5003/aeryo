/**
 * Chakra outlines text inputs, text areas and select triggers with `border`,
 * a decorative hairline (about 1.3:1) that disappears in beach glare. The edge
 * of a control needs 3:1, so these use `control.border`. The recipes' own
 * error and focus colors stay in place.
 */
// per node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js
export const inputRecipe = {
  className: "chakra-input",
  variants: {
    variant: { outline: { borderColor: "control.border" } },
  },
};

export const textareaRecipe = {
  className: "chakra-textarea",
  variants: {
    variant: { outline: { borderColor: "control.border" } },
  },
};

// per node_modules/@chakra-ui/react/dist/esm/theme/recipes/select.js
export const selectSlotRecipe = {
  className: "chakra-select",
  slots: ["trigger"],
  variants: {
    variant: { outline: { trigger: { borderColor: "control.border" } } },
  },
};
