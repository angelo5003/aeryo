"use client";

import {
  Flex,
  Slider,
  useControllableState,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@/components/typography/Text";
import type { WindRange, WindRangeSliderProps } from "./WindRangeSlider.types";

const DEFAULT_THUMB_LABELS: [string, string] = [
  "Minimum wind speed",
  "Maximum wind speed",
];

/**
 * AERYO's wind range slider: two handles that pick a lowest and highest
 * wind speed, with the chosen range shown as text ("14–28 kt").
 *
 * A thin wrapper around Chakra's `Slider` (`Slider.Root` with a value
 * array and `Slider.Thumbs`, one handle per value). Dragging, keyboard
 * control and screen reader support all come from Chakra.
 *
 * Each handle looks 24px wide but has an invisible 44px touch area
 * (`_after`), for wet hands and gloves. Always teal: the slider is a
 * control, and `lime` is reserved for the wind data scale.
 */
export const WindRangeSlider = React.forwardRef<
  HTMLDivElement,
  WindRangeSliderProps
>(function WindRangeSlider(props, ref) {
  const {
    label,
    value: valueProp,
    defaultValue,
    onValueChange,
    unit = "kt",
    min = 0,
    max = 40,
    step = 1,
    thumbLabels = DEFAULT_THUMB_LABELS,
    ...rest
  } = props;

  // Chakra points every handle's `aria-labelledby` at the visible label, so
  // both handles would get the same name and `thumbLabels` would be ignored
  // (`aria-labelledby` beats `aria-label`; see
  // node_modules/@zag-js/slider/dist/slider.connect.js). Giving each handle
  // its own hidden text to point at keeps the two names different.
  const handleLabelId = React.useId();
  const handleLabelIds = [`${handleLabelId}-low`, `${handleLabelId}-high`];

  const [range, setRange] = useControllableState<WindRange>({
    value: valueProp,
    defaultValue: defaultValue ?? [min, max],
    onChange: onValueChange,
  });

  return (
    <Slider.Root
      ref={ref}
      colorPalette="teal"
      variant="outline"
      size="lg"
      min={min}
      max={max}
      step={step}
      // Keep the two handles at least one step apart, so "14–14 kt" can't happen.
      minStepsBetweenThumbs={1}
      value={range}
      onValueChange={(details) => {
        const [low, high] = details.value;
        setRange([low, high]);
      }}
      aria-label={thumbLabels}
      aria-labelledby={handleLabelIds}
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="baseline" gap="3">
        <Slider.Label>{label}</Slider.Label>
        <Text variant="body" fontWeight="semibold">
          {range[0]}–{range[1]} {unit}
        </Text>
      </Flex>
      {handleLabelIds.map((id, handleIndex) => (
        <VisuallyHidden key={id} id={id}>
          {thumbLabels[handleIndex]}
        </VisuallyHidden>
      ))}
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        {[0, 1].map((handleIndex) => (
          <Slider.Thumb
            key={handleIndex}
            index={handleIndex}
            _after={{
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "11",
              height: "11",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </Slider.Control>
    </Slider.Root>
  );
});
