import { chakra, RadioCard } from "@chakra-ui/react";
import * as React from "react";
import { LuCheck } from "react-icons/lu";
import { AeryoCard } from "@/components/surfaces/Card/AeryoCard";
import type { OptionListProps, OptionRowProps } from "./OptionList.types";

/**
 * AERYO's single-choice list — a thin wrapper around Chakra UI's
 * `RadioCard`. Use it when every choice needs a picture or a second line
 * of text (pick a spot, pick a piece of gear). For plain one-word choices
 * use `RadioGroup`; for two to four modes use `SegmentedControl`.
 *
 * The rows sit in one rounded card (`AeryoCard`, the same surface as
 * `SettingsListCard`) with a divider between them, instead of Chakra's
 * separate bordered cards. The colour is always teal, as in `Radio`.
 *
 * ```tsx
 * <OptionList label="Choose a spot" defaultValue="wijk">
 *   <OptionRow value="wijk" title="Wijk aan Zee" description="12 min away" />
 *   <OptionRow value="zandvoort" title="Zandvoort" description="25 min away" />
 * </OptionList>
 * ```
 */
export const OptionList = React.forwardRef<HTMLDivElement, OptionListProps>(
  (props, ref) => {
    const { label, children, ...rest } = props;

    return (
      <RadioCard.Root ref={ref} colorPalette="teal" gap="2" {...rest}>
        <RadioCard.Label textStyle="label" color="fg.muted" paddingX="1">
          {label}
        </RadioCard.Label>
        <AeryoCard
          variant="default"
          gap="0"
          css={{
            "& > * + *": { borderTopWidth: "1px", borderColor: "border" },
          }}
        >
          {children}
        </AeryoCard>
      </RadioCard.Root>
    );
  },
);
OptionList.displayName = "OptionList";

/**
 * One choice inside an `OptionList`. At least 4rem (64px) high so wet
 * hands and gloves can hit it; the whole row is the tap target.
 */
export const OptionRow = React.forwardRef<HTMLDivElement, OptionRowProps>(
  (props, ref) => {
    const { title, description, media, ...rest } = props;

    return (
      // Chakra's recipe gives each item its own border and a ring when
      // checked. Switched off here: the list draws the edge and dividers,
      // and the filled mark shows which row is picked.
      <RadioCard.Item
        ref={ref}
        borderWidth="0"
        borderRadius="0"
        minHeight="16"
        _checked={{ boxShadow: "none", borderColor: "transparent" }}
        {...rest}
      >
        <RadioCard.ItemHiddenInput />
        <RadioCard.ItemControl
          alignItems="center"
          gap="3"
          paddingY="2"
          paddingX="4"
        >
          {media}
          <RadioCard.ItemContent gap="0.5">
            <RadioCard.ItemText textStyle="body" fontWeight="bold">
              {title}
            </RadioCard.ItemText>
            {description && (
              <RadioCard.ItemDescription
                textStyle="caption"
                color="fg.muted"
                opacity="1"
              >
                {description}
              </RadioCard.ItemDescription>
            )}
          </RadioCard.ItemContent>
          {/* The mark is drawn here, not with RadioCard.ItemIndicator: that
              part swaps itself for the icon when `checked` is passed and
              drops its own styles. The unchecked ring uses fg.muted
              because Chakra's default `border.emphasized` is not an AERYO
              token and `border` is a decorative hairline (about 1.5:1).
              Contrast is at least 5.4:1 in both modes. */}
          <RadioCard.ItemContext>
            {(item) => (
              <chakra.span
                aria-hidden="true"
                boxSize="6"
                flexShrink={0}
                display="grid"
                placeItems="center"
                borderRadius="full"
                borderWidth="2px"
                borderColor={item.checked ? "teal.solid" : "fg.muted"}
                bg={item.checked ? "teal.solid" : "transparent"}
                color="teal.contrast"
              >
                {item.checked && <LuCheck size={14} />}
              </chakra.span>
            )}
          </RadioCard.ItemContext>
        </RadioCard.ItemControl>
      </RadioCard.Item>
    );
  },
);
OptionRow.displayName = "OptionRow";
