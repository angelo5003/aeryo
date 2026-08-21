import * as React from "react";
import type {
  AeryoCardLayout,
  AeryoCardSize,
  AeryoCardVariant,
} from "../AeryoCard.types";

export interface AeryoCardContextValue {
  size: AeryoCardSize;
  layout: AeryoCardLayout;
  variant: AeryoCardVariant;
  disabled: boolean;
  loading: boolean;
}

const AeryoCardContext = React.createContext<AeryoCardContextValue | null>(
  null,
);

export function AeryoCardProvider(props: {
  value: AeryoCardContextValue;
  children: React.ReactNode;
}) {
  return (
    <AeryoCardContext.Provider value={props.value}>
      {props.children}
    </AeryoCardContext.Provider>
  );
}

/**
 * Reads the nearest `AeryoCard`'s `{ size, layout, variant, disabled,
 * loading }`. Throws when used outside `AeryoCard` — every
 * `AeryoCard*` subcomponent is meant to be composed inside it, same as
 * Chakra's own compound components (`Card.Header` outside `Card.Root`,
 * etc.) are not meant to stand alone.
 */
export function useAeryoCardContext(): AeryoCardContextValue {
  const context = React.useContext(AeryoCardContext);
  if (!context) {
    throw new Error(
      "AeryoCard subcomponents (AeryoCardHeader, AeryoCardBody, " +
        "AeryoCardFooter, AeryoCardMedia, AeryoCardMeta, AeryoCardBadges, " +
        "AeryoCardActions) must be rendered inside an <AeryoCard>.",
    );
  }
  return context;
}
