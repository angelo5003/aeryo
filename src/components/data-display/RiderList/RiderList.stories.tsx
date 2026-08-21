import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LuUsers } from "react-icons/lu";
import { EmptyState } from "@/components/data-display/EmptyState";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { RiderList } from "./RiderList";
import type { RiderListItem } from "./RiderList.types";

const RIDERS: RiderListItem[] = [
  {
    name: "Mark",
    discipline: "Freeride",
    skillLevel: "Intermediate",
    presence: { status: "riding" },
  },
  {
    name: "Lisa",
    discipline: "Freestyle",
    skillLevel: "Advanced",
    presence: { status: "riding" },
  },
  {
    name: "Tony",
    discipline: "Big Air",
    skillLevel: "Intermediate",
    presence: { status: "planning", time: "16:00" },
  },
];

/**
 * A spot's rider list — count heading + one `RiderCard` per rider. See
 * `RiderList.tsx` for implementation notes.
 */
const meta = {
  title: "Data Display/RiderList",
  component: RiderList,
  tags: ["autodocs", "ai-generated"],
  args: {
    riders: RIDERS,
    heading: "14 riders",
  },
  argTypes: {
    heading: { control: "text" },
    riders: { control: false },
    empty: { control: false },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof RiderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    riders: [],
    empty: (
      <EmptyState
        icon={<LuUsers />}
        title="No one's riding yet"
        description="Be the first to check in at this spot."
      />
    ),
  },
  parameters: { controls: { disable: true } },
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
