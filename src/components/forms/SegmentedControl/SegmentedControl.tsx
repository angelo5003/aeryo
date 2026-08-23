import { For, SegmentGroup } from "@chakra-ui/react";
import * as React from "react";
import type {
  SegmentedControlItem,
  SegmentedControlProps,
} from "./SegmentedControl.types";

function normalize(
  items: Array<string | SegmentedControlItem>,
): SegmentedControlItem[] {
  return items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );
}

/**
 * AERYO's segmented control — a thin wrapper around Chakra UI's
 * `SegmentGroup`, for a small set of mutually-exclusive options shown as
 * one row (e.g. a unit toggle, a view switcher). Unlike `Checkbox`/
 * `RadioGroup`/`Switch`, its recipe uses neutral `bg`/`border` tokens
 * rather than `colorPalette`, so no brand-color default is needed here.
 * Every other Chakra `SegmentGroup.RootProps` field (`size`, `disabled`,
 * style props, responsive props, `as`, `asChild`, `ref`, …) passes
 * through untouched.
 */
export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, ...rest } = props;
  const data = React.useMemo(() => normalize(items), [items]);

  return (
    <SegmentGroup.Root ref={ref} {...rest}>
      <SegmentGroup.Indicator />
      <For each={data}>
        {(item) => (
          <SegmentGroup.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  );
});
