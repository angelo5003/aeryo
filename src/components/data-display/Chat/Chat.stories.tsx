import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Stack } from "@/components/primitives/Stack";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Chat, ChatHeader, ChatMessage, ChatMessages } from "./Chat";

/**
 * AERYO's spot/session chat. Static display only for now — see
 * `Chat.tsx` for implementation notes.
 */
const meta = {
  title: "Data Display/Chat",
  component: Chat,
  tags: ["autodocs", "ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Chat maxW="sm">
      <ChatHeader title="IJmuiden" />
      <ChatMessages>
        <ChatMessage author="Mark">Wind is picking up.</ChatMessage>
        <ChatMessage author="Lisa">{"I'll be there at 16:30."}</ChatMessage>
        <ChatMessage author="Tony">Anyone doing big air today?</ChatMessage>
      </ChatMessages>
    </Chat>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <Stack direction="row" gap="8">
      <LightMode>
        <Chat maxW="sm">
          <ChatHeader title="IJmuiden" />
          <ChatMessages>
            <ChatMessage author="Mark">Wind is picking up.</ChatMessage>
          </ChatMessages>
        </Chat>
      </LightMode>
      <DarkMode>
        <Chat maxW="sm">
          <ChatHeader title="IJmuiden" />
          <ChatMessages>
            <ChatMessage author="Mark">Wind is picking up.</ChatMessage>
          </ChatMessages>
        </Chat>
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
  render: () => (
    <Chat>
      <ChatHeader title="IJmuiden" />
      <ChatMessages>
        <ChatMessage author="Mark">Wind is picking up.</ChatMessage>
        <ChatMessage author="Lisa">{"I'll be there at 16:30."}</ChatMessage>
      </ChatMessages>
    </Chat>
  ),
};
