import type { CollectionItem, Select as ChakraSelect } from "@chakra-ui/react";
import type * as React from "react";

export type SelectRootProps = ChakraSelect.RootProps;

export interface SelectTriggerProps extends ChakraSelect.ControlProps {
  /** Shows a clear button when a value is selected. */
  clearable?: boolean;
}

export interface SelectContentProps extends ChakraSelect.ContentProps {
  /** Renders the content in a portal. @default true */
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
}

export type SelectItemProps = ChakraSelect.ItemProps;

export interface SelectValueTextProps extends Omit<
  ChakraSelect.ValueTextProps,
  "children"
> {
  children?(items: CollectionItem[]): React.ReactNode;
}

export interface SelectItemGroupProps extends ChakraSelect.ItemGroupProps {
  label: React.ReactNode;
}
