The top of a spot page: photo, name, region and rider counts.

## How to use it

- Provide the main spot action as `action`.

Source: `src/components/surfaces/SpotHeader`. Import from `@/components/surfaces/SpotHeader`.

## Props

| Prop       | Type              | Required | Default | What it does                                                                                                                                                                                               | Belongs to        |
| ---------- | ----------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `name`     | `string`          | Yes      |         | The spot's name, e.g. `"IJmuiden"`.                                                                                                                                                                        | `SpotHeaderProps` |
| `region`   | `string`          | No       |         | e.g. `"North Holland"` — rendered above `name` as an overline.                                                                                                                                             | `SpotHeaderProps` |
| `imageSrc` | `string`          | No       |         | Banner image URL. Renders a placeholder (a muted panel with a pin icon) when omitted, same fallback pattern as `SpotCard`.                                                                                 | `SpotHeaderProps` |
| `imageAlt` | `string`          | No       |         | Alt text for `imageSrc`. Defaults to `name`.                                                                                                                                                               | `SpotHeaderProps` |
| `riding`   | `number`          | Yes      |         | Riders currently riding at this spot — rendered via `SpotRiderCount`.                                                                                                                                      | `SpotHeaderProps` |
| `planning` | `number`          | No       |         | Riders planning to ride — rendered via `SpotRiderCount`.                                                                                                                                                   | `SpotHeaderProps` |
| `action`   | `React.ReactNode` | No       |         | The primary action, typically the guide's §26 "I'm riding" `Button`. Not a `boolean` toggle — whether it reads "I'm riding" or something else once the rider has checked in is the consumer's own concern. | `SpotHeaderProps` |
