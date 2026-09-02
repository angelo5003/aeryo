import { mergeRefs, useControllableState } from "@chakra-ui/react";
import * as React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IconButton } from "@/components/actions/IconButton";
import { Input } from "@/components/forms/Input";
import { InputGroup } from "@/components/forms/InputGroup";
import type { PasswordInputProps } from "./PasswordInput.types";

/**
 * AERYO's password input — an `Input` with a show/hide visibility toggle.
 * The toggle is AERYO's own `IconButton` (not a raw Chakra `IconButton`),
 * so it's on-brand (`intent="secondary"`, `variant="ghost"`) by
 * construction rather than by coincidence. No strength meter or
 * requirements checklist — that's a page-level concern to compose
 * separately if a flow needs it, not baked into this component.
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(props, ref) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityToggleLabel = "Toggle password visibility",
    ...rest
  } = props;

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible ?? false,
    onChange: onVisibleChange,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <InputGroup
      {...rootProps}
      // Same offset the Chakra CLI's `input-group` snippet computes by
      // default, for the end element's icon button.
      endOffset="6px"
      endElement={
        <IconButton
          tabIndex={-1}
          intent="secondary"
          variant="ghost"
          size="sm"
          aria-label={visibilityToggleLabel}
          disabled={rest.disabled}
          onPointerDown={(event) => {
            if (rest.disabled) return;
            if (event.button !== 0) return;
            event.preventDefault();
            setVisible(!visible);
          }}
        >
          {visible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      }
    >
      <Input
        {...rest}
        ref={mergeRefs(ref, inputRef)}
        type={visible ? "text" : "password"}
      />
    </InputGroup>
  );
});
