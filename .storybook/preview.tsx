import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import "./preview.css";
import { Provider } from "../src/components/ui/provider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    // App Router only (AGENTS.md) — without this, @storybook/nextjs-vite's
    // RouterDecorator mounts a Pages Router context instead, and any
    // component calling next/navigation's useRouter() throws "invariant
    // expected app router to be mounted".
    // per node_modules/@storybook/nextjs-vite/dist/_browser-chunks/chunk-342N7CWU.js
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
