A status pill saying whether a rider is riding, planning or offline.

## How to use it

- This is a social status, not tracking. Never show coordinates next to it.

Source: `src/components/data-display/RiderPresence`. Import from `@/components/data-display/RiderPresence`.

## Props

| Prop     | Type                  | Required | Default | What it does                                                                                                                                 | Belongs to           |
| -------- | --------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `status` | `RiderPresenceStatus` | Yes      |         | The rider's current presence state — selects both the label and the token-backed color.                                                      | `RiderPresenceProps` |
| `time`   | `string`              | No       |         | Time text shown for `planning`, e.g. `"16:00"` — rendered as "Planning 16:00" per the guide's §26 wireframe. Ignored for `riding`/`offline`. | `RiderPresenceProps` |
