import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Image } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { OptionList, OptionRow } from "./OptionList";

const SPOT_PHOTO = "/assets/onboarding/discover-the-elements-screen.webp";

/** Example photo used only in these stories. Real rows pass the spot's photo. */
const spotPhoto = (
  <Image
    src={SPOT_PHOTO}
    alt=""
    width="12"
    height="12"
    borderRadius="lg"
    objectFit="cover"
    flexShrink={0}
  />
);

/** Example rows used only in these stories. */
const spotRows = (
  <>
    <OptionRow
      value="wijk"
      title="Wijk aan Zee"
      description="12 min away · 22 kt now"
      media={spotPhoto}
    />
    <OptionRow
      value="zandvoort"
      title="Zandvoort"
      description="25 min away · 18 kt now"
      media={spotPhoto}
    />
    <OptionRow
      value="ijmuiden"
      title="IJmuiden"
      description="30 min away · 16 kt now"
      media={spotPhoto}
    />
  </>
);

/**
 * AERYO's single-choice list — a thin wrapper around Chakra UI's
 * `RadioCard`. Use it for choices that need a picture or a second line of
 * text. See `OptionList.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/OptionList",
  component: OptionList,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Choose a spot",
    defaultValue: "wijk",
    children: spotRows,
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    children: { control: false },
    onValueChange: { control: false },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box maxWidth="sm">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof OptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: /Zandvoort/ }));
    await expect(
      canvas.getByRole("radio", { name: /Zandvoort/ }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("radio", { name: /Wijk aan Zee/ }),
    ).not.toBeChecked();
  },
};

export const TextOnly: Story = {
  args: {
    label: "Your level",
    defaultValue: "intermediate",
    children: (
      <>
        <OptionRow value="beginner" title="Beginner" />
        <OptionRow value="intermediate" title="Intermediate" />
        <OptionRow value="advanced" title="Advanced" />
      </>
    ),
  },
};

export const WithDisabledRow: Story = {
  args: {
    children: (
      <>
        <OptionRow
          value="wijk"
          title="Wijk aan Zee"
          description="12 min away · 22 kt now"
          media={spotPhoto}
        />
        <OptionRow
          value="ijmuiden"
          title="IJmuiden"
          description="Closed today"
          media={spotPhoto}
          disabled
        />
      </>
    ),
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Box bg="bg" padding="4">
        <OptionList {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <Box bg="bg" padding="4">
        <OptionList {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
};
