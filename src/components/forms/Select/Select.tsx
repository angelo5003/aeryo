import type { CollectionItem } from "@chakra-ui/react";
import { Select as ChakraSelect, Portal } from "@chakra-ui/react";
import * as React from "react";
import { CloseButton } from "@/components/ui/close-button";
import type {
  SelectContentProps,
  SelectItemGroupProps,
  SelectItemProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueTextProps,
} from "./Select.types";

/**
 * Re-exported so consumers never need to import from `@chakra-ui/react`
 * directly — Select's items are driven by a collection built with this.
 */
export { createListCollection } from "@chakra-ui/react";

const Root = React.forwardRef<HTMLDivElement, SelectRootProps>(
  function SelectRoot(props, ref) {
    return (
      <ChakraSelect.Root
        {...props}
        ref={ref}
        positioning={{ sameWidth: true, ...props.positioning }}
      >
        {props.asChild ? (
          props.children
        ) : (
          <>
            <ChakraSelect.HiddenSelect />
            {props.children}
          </>
        )}
      </ChakraSelect.Root>
    );
  },
) as ChakraSelect.RootComponent;

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, ref) {
    const { children, clearable, ...rest } = props;
    return (
      <ChakraSelect.Control {...rest}>
        <ChakraSelect.Trigger ref={ref}>{children}</ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          {clearable && (
            <ChakraSelect.ClearTrigger asChild>
              <CloseButton
                size="xs"
                variant="plain"
                focusVisibleRing="inside"
                focusRingWidth="2px"
                pointerEvents="auto"
              />
            </ChakraSelect.ClearTrigger>
          )}
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
    );
  },
);

const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content {...rest} ref={ref} />
        </ChakraSelect.Positioner>
      </Portal>
    );
  },
);

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, ref) {
    const { item, children, ...rest } = props;
    return (
      <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
        {children}
        <ChakraSelect.ItemIndicator />
      </ChakraSelect.Item>
    );
  },
);

const ValueText = React.forwardRef<HTMLSpanElement, SelectValueTextProps>(
  function SelectValueText(props, ref) {
    const { children, ...rest } = props;
    return (
      <ChakraSelect.ValueText {...rest} ref={ref}>
        <ChakraSelect.Context>
          {(select) => {
            const items: CollectionItem[] = select.selectedItems;
            if (items.length === 0) return props.placeholder;
            if (children) return children(items);
            if (items.length === 1)
              return select.collection.stringifyItem(items[0]);
            return `${items.length} selected`;
          }}
        </ChakraSelect.Context>
      </ChakraSelect.ValueText>
    );
  },
);

const ItemGroup = React.forwardRef<HTMLDivElement, SelectItemGroupProps>(
  function SelectItemGroup(props, ref) {
    const { children, label, ...rest } = props;
    return (
      <ChakraSelect.ItemGroup {...rest} ref={ref}>
        <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
        {children}
      </ChakraSelect.ItemGroup>
    );
  },
);

/**
 * AERYO's select — a thin wrapper around Chakra UI's compound `Select`
 * (`Select.Root`/`Trigger`/`Content`/`Item`/`ValueText`/…). Chakra is an
 * implementation detail consumers never import directly, but the real
 * compound API is retained rather than flattened into one prop-driven
 * component (unlike `Tag`): Select's real usage varies too much
 * (single/multi-select, grouped options, custom value rendering) for a
 * single flat prop surface to stay useful.
 *
 * ```tsx
 * const disciplines = createListCollection({
 *   items: [
 *     { label: "Freestyle", value: "freestyle" },
 *     { label: "Wave", value: "wave" },
 *   ],
 * });
 *
 * <Select.Root collection={disciplines}>
 *   <Select.Label>Discipline</Select.Label>
 *   <Select.Trigger>
 *     <Select.ValueText placeholder="Select a discipline" />
 *   </Select.Trigger>
 *   <Select.Content>
 *     {disciplines.items.map((item) => (
 *       <Select.Item key={item.value} item={item}>
 *         <Select.ItemText>{item.label}</Select.ItemText>
 *       </Select.Item>
 *     ))}
 *   </Select.Content>
 * </Select.Root>
 * ```
 */
export const Select = {
  Root,
  Trigger,
  Content,
  Item,
  ItemText: ChakraSelect.ItemText,
  ItemGroup,
  ValueText,
  Label: ChakraSelect.Label,
};
