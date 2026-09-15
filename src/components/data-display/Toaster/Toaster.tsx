"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

/**
 * The one toaster instance for the whole app. Call `toaster.create(...)`
 * (or `.success`/`.error`/…) from anywhere — no React context needed.
 * Mounted once inside `Provider` (ChakraProvider required).
 */
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

/**
 * AERYO's toaster. Renders whatever `toaster.create(...)` queues up.
 * Colors per `toast.type` (`success`/`warning`/`error`/`info`) come from
 * AERYO's own `success`/`caution`/`danger`/`teal` families, not Chakra's
 * stock red/orange/green — see `src/design-system/theme/toastRecipe.ts`
 * for the override. `type: "loading"` and anything unrecognized fall back
 * to the neutral `bg.panel`/`fg` surface.
 */
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="currentColor" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
