A planned session: name, spot, start time and who is going.

## How to use it

- Provide the join or leave `Button` as `action`, since membership is the consumer's state.

Source: `src/components/surfaces/SessionCard`. Import from `@/components/surfaces/SessionCard`.

## Props

| Prop              | Type               | Required | Default     | What it does                                                                                                                                                                             | Belongs to            |
| ----------------- | ------------------ | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `title`           | `string`           | Yes      |             | Session name, e.g. `"Saturday Session"` (guide §26 "Create session" wireframe).                                                                                                          | `SessionCardOwnProps` |
| `spot`            | `string`           | Yes      |             | The spot this session is at, e.g. `"IJmuiden"`.                                                                                                                                          | `SessionCardOwnProps` |
| `startTime`       | `string`           | Yes      |             | Start time text, e.g. `"15:00"`.                                                                                                                                                         | `SessionCardOwnProps` |
| `participants`    | `number`           | Yes      |             | Current participant count.                                                                                                                                                               | `SessionCardOwnProps` |
| `maxParticipants` | `number`           | No       |             | Optional cap, rendered as `"{participants} / {maxParticipants} riders"` when given.                                                                                                      | `SessionCardOwnProps` |
| `action`          | `React.ReactNode`  | No       |             | The join/leave action, e.g. a `Button`. Rendered in the card's footer — not a `boolean` toggle, since whether it reads "Join" or "Leave" is the consumer's own membership-state concern. | `SessionCardOwnProps` |
| `size`            | `AeryoCardSize`    | No       | `"md"`      |                                                                                                                                                                                          | `SessionCardOwnProps` |
| `variant`         | `AeryoCardVariant` | No       | `"default"` |                                                                                                                                                                                          | `SessionCardOwnProps` |
| `loading`         | `boolean`          | No       |             | Every slot renders a skeleton shape instead of real content.                                                                                                                             | `SessionCardOwnProps` |
