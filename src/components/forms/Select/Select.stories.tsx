import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { createListCollection, Select } from "./Select";

const disciplines = createListCollection({
  items: [
    { label: "Freestyle", value: "freestyle" },
    { label: "Wave", value: "wave" },
    { label: "Foil", value: "foil" },
    { label: "Big air", value: "big-air" },
  ],
});

function BasicSelect(props: { defaultValue?: string[]; disabled?: boolean }) {
  return (
    <Select.Root collection={disciplines} width="14rem" {...props}>
      <Select.Label>Discipline</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a discipline" />
      </Select.Trigger>
      <Select.Content>
        {disciplines.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

/**
 * AERYO's select — a thin wrapper around Chakra UI's compound `Select`.
 * See `Select.tsx` for implementation notes and the full usage example.
 */
const meta = {
  title: "Forms/Select",
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BasicSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BasicSelect />,
};

export const WithDefaultValue: Story = {
  render: () => <BasicSelect defaultValue={["wave"]} />,
};

export const Clearable: Story = {
  render: () => (
    <Select.Root collection={disciplines} width="14rem" defaultValue={["wave"]}>
      <Select.Label>Discipline</Select.Label>
      <Select.Trigger clearable>
        <Select.ValueText placeholder="Select a discipline" />
      </Select.Trigger>
      <Select.Content>
        {disciplines.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select.Root
      collection={disciplines}
      width="14rem"
      multiple
      defaultValue={["wave", "foil"]}
    >
      <Select.Label>Disciplines</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Select disciplines" />
      </Select.Trigger>
      <Select.Content>
        {disciplines.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
};

export const Disabled: Story = {
  render: () => <BasicSelect disabled defaultValue={["wave"]} />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: () => (
    <DarkMode>
      <Box bg="bg" p="6" minH="16rem">
        <BasicSelect />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: () => (
    <LightMode>
      <Box bg="bg" p="6" minH="16rem">
        <BasicSelect />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  render: () => <BasicSelect />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  render: () => <BasicSelect />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  render: () => <BasicSelect />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

export const LongLabel: Story = {
  render: () => (
    <Box width="12rem">
      <BasicSelect defaultValue={["big-air"]} />
    </Box>
  ),
};

export const OpenAndSelect: Story = {
  render: () => <BasicSelect />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // Query by role, not text: the native `<option>` inside
    // `Select.HiddenSelect` (kept for plain HTML form submission) carries
    // the same text as the visible listbox item, so `getByText` matches
    // both. The hidden option isn't exposed with an accessible role, so
    // `getByRole("option", …)` finds only the real, visible one.
    const body = within(canvasElement.ownerDocument.body);
    const option = await body.findByRole("option", { name: "Wave" });
    await userEvent.click(option);

    await expect(trigger).toHaveTextContent("Wave");
  },
};
