A spot or session conversation, built from `Chat`, `ChatHeader`, `ChatMessages` and `ChatMessage`.

## How to use it

- Provide the title and the message list. Sending messages is the consumer's job.

Source: `src/components/data-display/Chat`. Import from `@/components/data-display/Chat`.

## Props

| Prop        | Type              | Required | Default | What it does                                                          | Belongs to          |
| ----------- | ----------------- | -------- | ------- | --------------------------------------------------------------------- | ------------------- |
| `children`  | `React.ReactNode` | No       |         |                                                                       | `ChatProps`         |
| `title`     | `React.ReactNode` | Yes      |         | The chat's title, e.g. a spot name (guide §5 "# IJmuiden" wireframe). | `ChatHeaderProps`   |
| `children`  | `React.ReactNode` | No       |         |                                                                       | `ChatMessagesProps` |
| `author`    | `string`          | Yes      |         | The message author's display name.                                    | `ChatMessageProps`  |
| `avatarSrc` | `string`          | No       |         | Author avatar image URL — falls back to initials, same as `Avatar`.   | `ChatMessageProps`  |
| `children`  | `React.ReactNode` | Yes      |         | The message text.                                                     | `ChatMessageProps`  |
