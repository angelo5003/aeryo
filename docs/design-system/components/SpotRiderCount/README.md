How many riders are riding at a spot, and how many plan to.

## How to use it

- Omit `planning` to hide that line.

Source: `src/components/data-display/SpotRiderCount`. Import from `@/components/data-display/SpotRiderCount`.

## Props

| Prop       | Type     | Required | Default | What it does                                                                                    | Belongs to            |
| ---------- | -------- | -------- | ------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| `riding`   | `number` | Yes      |         | Number of riders currently riding at this spot.                                                 | `SpotRiderCountProps` |
| `planning` | `number` | No       |         | Number of riders who've marked themselves as planning to ride. Omit to hide that line entirely. | `SpotRiderCountProps` |
