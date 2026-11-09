"use client";

import { chakra, Flex, useControllableState } from "@chakra-ui/react";
import * as React from "react";
import type { ChipGroupProps, ChipOption } from "./ChipGroup.types";

const turnItemsIntoOptions = (
  items: Array<string | ChipOption>,
): ChipOption[] =>
  items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );

const turnValueIntoList = (
  value: string | string[] | undefined,
): string[] | undefined => {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
};

/**
 * AERYO's chip group — a row of pill-shaped choices. Use it for filters
 * (`type="single"`, one chip is always picked) and for pickers where the
 * rider can choose several (`type="multiple"`, for example gear brands).
 *
 * Each chip is a real `<button>` with `aria-pressed`, so screen readers say
 * "pressed" and keyboard users can Tab to a chip and press Space or Enter.
 * Chakra's `Tabs` and `SegmentedControl` do not fit here: `Tabs` switches
 * content, and `SegmentedControl` picks one of a few options that fill one
 * connected bar.
 *
 * Look (tokens only, see docs/design-system/SPEC.md):
 * - not picked: `bg.panel` fill, `ink.border` edge, `ink.fg` text
 * - picked: `accent.solid` fill, `accent.contrast` text
 * - height: 2.75rem (44px), the minimum touch target for wet hands
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  function ChipGroup(props, ref) {
    const {
      items,
      layout = "wrap",
      type = "single",
      value,
      defaultValue,
      onValueChange,
      ...rest
    } = props;

    const isSingle = type === "single";
    const options = React.useMemo(() => turnItemsIntoOptions(items), [items]);

    const [pickedValues, setPickedValues] = useControllableState<string[]>({
      value: turnValueIntoList(value),
      defaultValue: turnValueIntoList(defaultValue) ?? [],
      onChange: (newPickedValues) => {
        if (!onValueChange) return;
        if (type === "multiple") {
          (onValueChange as (picked: string[]) => void)(newPickedValues);
        } else if (newPickedValues[0] !== undefined) {
          (onValueChange as (picked: string) => void)(newPickedValues[0]);
        }
      },
    });

    const handleChipPress = (chipValue: string) => {
      if (isSingle) {
        setPickedValues([chipValue]);
        return;
      }
      setPickedValues(
        pickedValues.includes(chipValue)
          ? pickedValues.filter((pickedValue) => pickedValue !== chipValue)
          : [...pickedValues, chipValue],
      );
    };

    const isScrollLayout = layout === "scroll";

    return (
      <Flex
        ref={ref}
        role="group"
        gap="2"
        flexWrap={isScrollLayout ? "nowrap" : "wrap"}
        overflowX={isScrollLayout ? "auto" : undefined}
        scrollbarWidth={isScrollLayout ? "none" : undefined}
        scrollSnapType={isScrollLayout ? "x proximity" : undefined}
        css={
          isScrollLayout
            ? { "&::-webkit-scrollbar": { display: "none" } }
            : undefined
        }
        {...rest}
      >
        {options.map((option) => (
          <chakra.button
            key={option.value}
            type="button"
            aria-pressed={pickedValues.includes(option.value)}
            disabled={option.disabled}
            onClick={() => handleChipPress(option.value)}
            flexShrink="0"
            scrollSnapAlign="start"
            minHeight="11" // 2.75rem (44px), same as Button size="lg"
            paddingX="4"
            borderRadius="full"
            borderWidth="1px"
            borderColor="ink.border"
            bg="bg.panel"
            color="ink.fg"
            textStyle="body"
            fontWeight="semibold"
            cursor="pointer"
            transitionProperty="background-color, border-color, color"
            transitionDuration="fast"
            focusVisibleRing="outside"
            focusRingColor="teal.focusRing"
            _hover={{ bg: "bg.muted" }}
            _pressed={{
              bg: "accent.solid",
              color: "accent.contrast",
              borderColor: "accent.solid",
            }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            {option.label}
          </chakra.button>
        ))}
      </Flex>
    );
  },
);
