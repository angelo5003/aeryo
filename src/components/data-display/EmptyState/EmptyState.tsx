import { EmptyState as ChakraEmptyState } from "@chakra-ui/react";
import * as React from "react";
import type { EmptyStateProps } from "./EmptyState.types";

/**
 * AERYO's empty state — a thin wrapper around Chakra UI's compound
 * `EmptyState` (`Root`/`Content`/`Indicator`/`Title`/`Description`).
 * Chakra is an implementation detail consumers never import directly:
 * pass `icon`/`title`/`description`/`action` directly, no compound-
 * component assembly required. Every other Chakra `EmptyState.RootProps`
 * field (style props, responsive props, `as`, `ref`, …) passes through
 * untouched.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { icon, title, description, action, size = "md", ...rest } = props;

    return (
      <ChakraEmptyState.Root ref={ref} size={size} {...rest}>
        <ChakraEmptyState.Content>
          {icon && (
            <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
          )}
          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
          {description && (
            <ChakraEmptyState.Description>
              {description}
            </ChakraEmptyState.Description>
          )}
          {action}
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    );
  },
);
