/**
 * Writes `components/<Name>/README.md` and `preview.html` for every component
 * family. Prop tables are read from each `*.types.ts`, so they stay honest.
 * Run from the repository root: node docs/design-system/build/generate-components.mjs
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_FOLDER = "docs/design-system/components";
const SPOT_PHOTO_URL = "/_blob/2ef21b214ee042fdf2bbcac5095af62e";

const windIcon = `h("svg", { viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
  h("path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }),
  h("path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }),
  h("path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" }))`;

const COMPONENTS = [
  {
    name: "Button",
    group: "Actions",
    folder: "actions/Button",
    height: 150,
    summary:
      "The primary action control, with a meaning-based `intent` instead of a raw color.",
    guidance: [
      "Use one solid primary action per screen. Use `ghost` for Skip on a photo scrim.",
      "Provide `children` as a short verb phrase. Icons go in `iconLeft` or `iconRight`, already sized.",
      "Keep the 8px corner. Do not make buttons pills.",
    ],
    uses: "Button, Stack, Flex",
    body: `h(Stack, { gap: "3" },
  h(Flex, { gap: "2", wrap: "wrap" },
    h(Button, null, "Join session"),
    h(Button, { intent: "secondary" }, "Secondary"),
    h(Button, { intent: "success" }, "Success"),
    h(Button, { intent: "warning" }, "Warning"),
    h(Button, { intent: "danger" }, "Delete account")),
  h(Flex, { gap: "2", wrap: "wrap", align: "center" },
    h(Button, { variant: "outline" }, "Outline"),
    h(Button, { intent: "secondary", variant: "outline" }, "Secondary outline"),
    h(Button, { variant: "subtle" }, "Subtle"),
    h(Button, { variant: "ghost" }, "Ghost"),
    h(Button, { size: "sm" }, "Small"),
    h(Button, { size: "lg" }, "Large"),
    h(Button, { disabled: true }, "Disabled"),
    h(Button, { loading: true }, "Loading")))`,
  },
  {
    name: "IconButton",
    group: "Actions",
    folder: "actions/IconButton",
    height: 88,
    summary: "An icon-only action that must carry an `aria-label`.",
    guidance: [
      "Use only when the icon is unmistakable, such as save or close.",
      "Provide the icon as `children` and a spoken name as `aria-label`.",
    ],
    uses: "IconButton, Flex",
    body: `h(Flex, { gap: "2", align: "center" },
  h(IconButton, { "aria-label": "Show wind" }, ${windIcon}),
  h(IconButton, { "aria-label": "Show wind", variant: "outline" }, ${windIcon}),
  h(IconButton, { "aria-label": "Show wind", variant: "subtle" }, ${windIcon}),
  h(IconButton, { "aria-label": "Show wind", variant: "ghost" }, ${windIcon}),
  h(IconButton, { "aria-label": "Delete", intent: "danger" }, ${windIcon}))`,
  },
  {
    name: "Avatar",
    group: "Data Display",
    folder: "data-display/Avatar",
    height: 96,
    summary:
      "A rider's picture, falling back to initials and then a generic icon.",
    guidance: [
      "Provide `name` so initials and alt text work when there is no image.",
      "`status` is a social presence dot, never a location signal.",
    ],
    uses: "Avatar, Flex",
    body: `h(Flex, { gap: "3", align: "center" },
  h(Avatar, { name: "Mara Jansen", size: "xs" }),
  h(Avatar, { name: "Mara Jansen", size: "sm" }),
  h(Avatar, { name: "Mara Jansen" }),
  h(Avatar, { name: "Tom Visser", size: "lg", status: "online" }),
  h(Avatar, { name: "Noor Bakker", size: "xl", verified: true }))`,
  },
  {
    name: "Chat",
    group: "Data Display",
    folder: "data-display/Chat",
    height: 300,
    summary:
      "A spot or session conversation, built from `Chat`, `ChatHeader`, `ChatMessages` and `ChatMessage`.",
    guidance: [
      "Provide the title and the message list. Sending messages is the consumer's job.",
    ],
    uses: "Chat, ChatHeader, ChatMessages, ChatMessage",
    body: `h(Chat, { maxW: "md" },
  h(ChatHeader, { title: "# IJmuiden" }),
  h(ChatMessages, null,
    h(ChatMessage, { author: "Mara Jansen" }, "Wind picks up after three. Anyone going?"),
    h(ChatMessage, { author: "Tom Visser" }, "On my way, there by half past.")))`,
  },
  {
    name: "Dialog",
    group: "Data Display",
    folder: "data-display/Dialog",
    height: 320,
    summary:
      "A centered modal for a decision the rider has to make before moving on.",
    guidance: [
      "Use for confirmations such as deleting an account. Use `Drawer` for longer content.",
      "Provide `DialogTrigger` and one `DialogContent`, which handles the backdrop and portal.",
    ],
    uses: "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, Button, Text",
    body: `h(Dialog, { defaultOpen: true },
  h(DialogTrigger, { asChild: true }, h(Button, null, "Leave session")),
  h(DialogContent, null,
    h(DialogHeader, null, h(DialogTitle, null, "Leave this session?")),
    h(DialogBody, null, h(Text, null, "Other riders will see that you are no longer going.")),
    h(DialogFooter, null,
      h(Button, { variant: "ghost", intent: "secondary" }, "Stay"),
      h(Button, { intent: "danger" }, "Leave"))))`,
  },
  {
    name: "Drawer",
    group: "Data Display",
    folder: "data-display/Drawer",
    height: 320,
    summary: "A panel that slides in from the left, right or bottom edge.",
    guidance: [
      'Prefer `placement="bottom"` on phones so the content stays within thumb reach.',
      "Provide `DrawerTrigger` and one `DrawerContent`.",
    ],
    uses: "Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, Button, Text",
    body: `h(Drawer, { defaultOpen: true, placement: "bottom" },
  h(DrawerTrigger, { asChild: true }, h(Button, null, "Open filters")),
  h(DrawerContent, null,
    h(DrawerHeader, null, h(DrawerTitle, null, "Filter spots")),
    h(DrawerBody, null, h(Text, null, "Show spots with at least 15 knots today."))))`,
  },
  {
    name: "EmptyState",
    group: "Data Display",
    folder: "data-display/EmptyState",
    height: 335,
    summary: "What a screen shows when there is nothing to list yet.",
    guidance: ["Provide a `title`, and an `action` when the rider can fix it."],
    uses: "EmptyState, Button",
    body: `h(EmptyState, { icon: ${windIcon}, title: "No sessions yet", description: "Plan one and other riders can join you.", action: h(Button, null, "Plan a session") })`,
  },
  {
    name: "ProgressDots",
    group: "Data Display",
    folder: "data-display/ProgressDots",
    height: 72,
    photo: true,
    summary: "Step dots for the onboarding carousel, drawn for a photo scrim.",
    guidance: [
      "Pass stable `ids` and `activeId` rather than an index.",
      "Place on `bg-photo`, because the marks use `fg-photo` and `fg-photo-muted`.",
    ],
    uses: "ProgressDots",
    body: `h(ProgressDots, { ids: ["wind", "community", "progress", "start"], activeId: "community" })`,
  },
  {
    name: "RiderList",
    group: "Data Display",
    folder: "data-display/RiderList",
    height: 230,
    summary:
      "A headed list of `RiderCard` rows, with a slot for an empty state.",
    guidance: ["Give every rider a stable `id` so the list keys by identity."],
    uses: "RiderList",
    body: `h(RiderList, { heading: "3 riders", riders: [
  { id: "rider-1", name: "Mara Jansen", discipline: "Freestyle", presence: { status: "riding" } },
  { id: "rider-2", name: "Tom Visser", discipline: "Wave", presence: { status: "planning", time: "16:00" } },
  { id: "rider-3", name: "Noor Bakker", discipline: "Foil", presence: { status: "offline" } } ] })`,
  },
  {
    name: "RiderPresence",
    group: "Data Display",
    folder: "data-display/RiderPresence",
    height: 72,
    summary:
      "A status pill saying whether a rider is riding, planning or offline.",
    guidance: [
      "This is a social status, not tracking. Never show coordinates next to it.",
    ],
    uses: "RiderPresence, Flex",
    body: `h(Flex, { gap: "2", wrap: "wrap" },
  h(RiderPresence, { status: "riding" }),
  h(RiderPresence, { status: "planning", time: "16:00" }),
  h(RiderPresence, { status: "offline" }))`,
  },
  {
    name: "Skeleton",
    group: "Data Display",
    folder: "data-display/Skeleton",
    height: 150,
    summary: "A placeholder shape while real content loads.",
    guidance: [
      "Pair with cached data or an explicit error. Never leave one loading forever.",
    ],
    uses: "Skeleton, Stack, Flex",
    body: `h(Flex, { gap: "4", align: "center" },
  h(Skeleton, { variant: "avatar" }),
  h(Stack, { flex: "1" }, h(Skeleton, { variant: "text", lines: 3 })))`,
  },
  {
    name: "SpotRiderCount",
    group: "Data Display",
    folder: "data-display/SpotRiderCount",
    height: 80,
    summary: "How many riders are riding at a spot, and how many plan to.",
    guidance: ["Omit `planning` to hide that line."],
    uses: "SpotRiderCount",
    body: `h(SpotRiderCount, { riding: 14, planning: 3 })`,
  },
  {
    name: "StatusPill",
    group: "Data Display",
    folder: "data-display/StatusPill",
    height: 72,
    summary:
      "A small pill for a state, one of the few places a full radius is allowed.",
    guidance: ["Keep the word short. Color never carries the meaning alone."],
    uses: "StatusPill, Flex",
    body: `h(Flex, { gap: "2", wrap: "wrap" },
  h(StatusPill, null, "Neutral"),
  h(StatusPill, { variant: "primary" }, "Riding"),
  h(StatusPill, { variant: "success" }, "Confirmed"),
  h(StatusPill, { variant: "warning" }, "Gusty"),
  h(StatusPill, { variant: "danger" }, "Cancelled"))`,
  },
  {
    name: "Tabs",
    group: "Data Display",
    folder: "data-display/Tabs",
    height: 140,
    summary: "Horizontal tabs, which can scroll when the set is long.",
    guidance: [
      "Use `scrollable` on `TabsList` for long sets. Vertical tabs are out of scope.",
    ],
    uses: "Tabs, TabsList, TabsTrigger, TabsContent, Text",
    body: `h(Tabs, { defaultValue: "today" },
  h(TabsList, null,
    h(TabsTrigger, { value: "today" }, "Today"),
    h(TabsTrigger, { value: "week" }, "This week"),
    h(TabsTrigger, { value: "riders" }, "Riders")),
  h(TabsContent, { value: "today" }, h(Text, null, "18 kn from the north-west.")),
  h(TabsContent, { value: "week" }, h(Text, null, "Saturday looks best.")),
  h(TabsContent, { value: "riders" }, h(Text, null, "14 riders at this spot.")))`,
  },
  {
    name: "Toaster",
    group: "Data Display",
    folder: "data-display/Toaster",
    height: 170,
    summary:
      "Short messages that appear and leave on their own, sent through `toaster.create`.",
    guidance: [
      "Mount `Toaster` once at the app root; the app's provider already does.",
      "Set `type` to `success`, `warning`, `error` or `info` for the right palette.",
    ],
    uses: "Toaster, toaster, Button",
    body: `h(React.Fragment, null,
  h(Toaster),
  h(Button, { onClick: () => toaster.create({ title: "Session saved", description: "Riders can now join.", type: "success" }) }, "Show a toast"))`,
    afterMount: `setTimeout(() => toaster.create({ title: "Session saved", description: "Riders can now join.", type: "success", duration: 600000 }), 200);`,
  },
  {
    name: "Checkbox",
    group: "Forms",
    folder: "forms/Checkbox",
    height: 88,
    summary: "A yes-or-no choice that sits in a list of options.",
    guidance: ["Provide the label as `children`."],
    uses: "Checkbox, Stack",
    body: `h(Stack, { gap: "2" },
  h(Checkbox, { defaultChecked: true }, "Tell me when the wind picks up"),
  h(Checkbox, null, "Show me on the rider list"))`,
  },
  {
    name: "Field",
    group: "Forms",
    folder: "forms/Field",
    height: 235,
    summary: "Label, helper text and error text around any input.",
    guidance: [
      "Set `invalid` together with `errorText`, since the text alone does not mark the field invalid.",
    ],
    uses: "Field, Input, Stack",
    body: `h(Stack, { gap: "4", maxW: "sm" },
  h(Field, { label: "Email", helperText: "Used only to sign in." }, h(Input, { placeholder: "rider@example.com" })),
  h(Field, { label: "Email", invalid: true, errorText: "Enter a valid email address." }, h(Input, { defaultValue: "rider@" })))`,
  },
  {
    name: "Form",
    group: "Forms",
    folder: "forms/Form",
    height: 200,
    summary: "A layout wrapper for forms that can share react-hook-form state.",
    guidance: [
      "Pass `methods` from `useForm()`, and call `handleSubmit` yourself in `onSubmit`.",
    ],
    uses: "Form, Field, Input, Button",
    body: `h(Form, { maxW: "sm", onSubmit: (event) => event.preventDefault() },
  h(Field, { label: "Spot name" }, h(Input, { placeholder: "Wijk aan Zee" })),
  h(Button, { type: "submit", mt: "4" }, "Save spot"))`,
  },
  {
    name: "FormError",
    group: "Forms",
    folder: "forms/FormError",
    height: 88,
    summary: "A message for an error that belongs to the whole form.",
    guidance: ["Safe to always mount, because it renders nothing when empty."],
    uses: "FormError",
    body: `h(FormError, null, "We could not save your session. Try again when you have signal.")`,
  },
  {
    name: "FormSuccess",
    group: "Forms",
    folder: "forms/FormSuccess",
    height: 88,
    summary: "A message confirming that the whole form worked.",
    guidance: ["Safe to always mount, because it renders nothing when empty."],
    uses: "FormSuccess",
    body: `h(FormSuccess, null, "Check your inbox to confirm your account.")`,
  },
  {
    name: "Input",
    group: "Forms",
    folder: "forms/Input",
    height: 170,
    summary: "A single-line text field, usually placed inside `Field`.",
    guidance: ["Compose inside `Field` for its label and errors."],
    uses: "Input, Stack",
    body: `h(Stack, { gap: "3", maxW: "sm" },
  h(Input, { placeholder: "Search spots", "aria-label": "Search spots" }),
  h(Input, { variant: "subtle", placeholder: "Subtle", "aria-label": "Subtle" }),
  h(Input, { disabled: true, placeholder: "Disabled", "aria-label": "Disabled" }))`,
  },
  {
    name: "InputGroup",
    group: "Forms",
    folder: "forms/InputGroup",
    height: 88,
    summary: "An input with an icon or attached text at either end.",
    guidance: ["`children` must be a single `Input`."],
    uses: "InputGroup, Input, Box",
    body: `h(Box, { maxW: "sm" }, h(InputGroup, { startElement: ${windIcon}, endAddon: "kn" }, h(Input, { placeholder: "Minimum wind", "aria-label": "Minimum wind" })))`,
  },
  {
    name: "PasswordInput",
    group: "Forms",
    folder: "forms/PasswordInput",
    height: 88,
    summary: "A password field with a show or hide button.",
    guidance: ["Set `visibilityToggleLabel` so the toggle has a spoken name."],
    uses: "PasswordInput, Box",
    body: `h(Box, { maxW: "sm" }, h(PasswordInput, { placeholder: "Your password", "aria-label": "Password", visibilityToggleLabel: "Show password" }))`,
  },
  {
    name: "RadioGroup",
    group: "Forms",
    folder: "forms/RadioGroup",
    height: 120,
    summary:
      "One choice from a short visible list, using `RadioGroup` and `Radio`.",
    guidance: ["Use `Select` when there are more than about five options."],
    uses: "RadioGroup, Radio, Stack",
    body: `h(RadioGroup, { defaultValue: "intermediate" },
  h(Stack, { gap: "2" },
    h(Radio, { value: "beginner" }, "Beginner"),
    h(Radio, { value: "intermediate" }, "Intermediate"),
    h(Radio, { value: "advanced" }, "Advanced")))`,
  },
  {
    name: "SegmentedControl",
    group: "Forms",
    folder: "forms/SegmentedControl",
    height: 80,
    summary: "A compact switch between two to four views.",
    guidance: [
      "Provide `items`. A plain string is short for a matching value and label.",
    ],
    uses: "SegmentedControl",
    body: `h(SegmentedControl, { defaultValue: "Knots", items: ["Knots", "m/s", "Bft"] })`,
  },
  {
    name: "Select",
    group: "Forms",
    folder: "forms/Select",
    height: 110,
    summary:
      "A dropdown choice built from parts such as `Select.Root` and `Select.Trigger`.",
    guidance: [
      "Build `collection` with `createListCollection`, exported beside `Select`.",
    ],
    uses: "Select, createListCollection",
    setup: `const disciplines = createListCollection({ items: [
  { label: "Freestyle", value: "freestyle" },
  { label: "Wave", value: "wave" },
  { label: "Foil", value: "foil" } ] });`,
    body: `h(Select.Root, { collection: disciplines, width: "14rem", defaultValue: ["wave"] },
  h(Select.Label, null, "Discipline"),
  h(Select.Trigger, null, h(Select.ValueText, { placeholder: "Select a discipline" })),
  h(Select.Content, null, disciplines.items.map((discipline) =>
    h(Select.Item, { key: discipline.value, item: discipline }, h(Select.ItemText, null, discipline.label)))))`,
  },
  {
    name: "Switch",
    group: "Forms",
    folder: "forms/Switch",
    height: 88,
    summary: "An on-or-off setting that applies right away.",
    guidance: [
      "Provide the label as `children`. Use `Checkbox` when a form must be submitted first.",
    ],
    uses: "Switch, Stack",
    body: `h(Stack, { gap: "3" },
  h(Switch, { defaultChecked: true }, "Wind alerts"),
  h(Switch, null, "Show me as riding"))`,
  },
  {
    name: "Textarea",
    group: "Forms",
    folder: "forms/Textarea",
    height: 130,
    summary: "A multi-line text field, usually placed inside `Field`.",
    guidance: ["Compose inside `Field` for its label and errors."],
    uses: "Textarea, Box",
    body: `h(Box, { maxW: "sm" }, h(Textarea, { placeholder: "How was the session?", "aria-label": "Session notes" }))`,
  },
  ...[
    [
      "Box",
      "The basic element that accepts style props.",
      80,
      `h(Box, { p: "4", bg: "bg.muted", borderRadius: "md" }, h(Text, null, "Padding from the spacing scale"))`,
      "Box, Text",
    ],
    [
      "Center",
      "Centers its content on both axes.",
      110,
      `h(Center, { h: "20", bg: "bg.muted", borderRadius: "md" }, h(Text, null, "Centered"))`,
      "Center, Text",
    ],
    [
      "Container",
      "Caps content width and adds side padding.",
      90,
      `h(Container, { maxW: "md", bg: "bg.muted", py: "3", borderRadius: "md" }, h(Text, null, "Width capped at md"))`,
      "Container, Text",
    ],
    [
      "Flex",
      "Lays out children in a row or column.",
      80,
      `h(Flex, { gap: "2" }, ["Wind", "Riders", "Sessions"].map((label) => h(Box, { key: label, flex: "1", p: "3", bg: "bg.muted", borderRadius: "md" }, h(Text, null, label))))`,
      "Flex, Box, Text",
    ],
    [
      "Grid",
      "Lays out children in rows and columns at once.",
      130,
      `h(Grid, { templateColumns: "repeat(3, 1fr)", gap: "2" }, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => h(Box, { key: label, p: "2", bg: "bg.muted", borderRadius: "md" }, h(Text, null, label))))`,
      "Grid, Box, Text",
    ],
    [
      "Separator",
      "A thin decorative dividing line.",
      115,
      `h(Stack, { gap: "3" }, h(Text, null, "Today"), h(Separator), h(Text, null, "Tomorrow"))`,
      "Stack, Separator, Text",
    ],
    [
      "Stack",
      "Stacks children with a token gap between them.",
      180,
      `h(Stack, { gap: "2" }, ["First", "Second", "Third"].map((label) => h(Box, { key: label, p: "2", bg: "bg.muted", borderRadius: "md" }, h(Text, null, label))))`,
      "Stack, Box, Text",
    ],
  ].map(([name, summary, height, body, uses]) => ({
    name,
    group: "Primitives",
    folder: `primitives/${name}`,
    height,
    summary,
    guidance: [
      "Import it from `@/components/primitives`, so app code never imports Chakra directly. Use semantic tokens in its style props.",
    ],
    uses,
    body,
  })),
  {
    name: "AeryoCard",
    group: "Surfaces",
    folder: "surfaces/Card",
    typesFile: "AeryoCard.types.ts",
    height: 280,
    summary:
      "The card every domain card is built from, with slots for media, header, meta, badges, body and footer.",
    guidance: [
      "Prefer a domain card such as `SpotCard` when one fits.",
      "`clickable` or `href` makes the whole card one target, and needs an `aria-label`.",
      "`interactive` is the visual feedback only; it adds no behavior.",
    ],
    uses: "AeryoCard, AeryoCardHeader, AeryoCardBody, AeryoCardFooter, Button, Text",
    body: `h(AeryoCard, { maxW: "sm" },
  h(AeryoCardHeader, { overline: "Saturday", title: "North Sea session", subtitle: "Wijk aan Zee" }),
  h(AeryoCardBody, null, h(Text, null, "Clean north-westerly, best after three.")),
  h(AeryoCardFooter, null, h(Button, { size: "sm" }, "Join")))`,
  },
  {
    name: "ForecastCard",
    group: "Surfaces",
    folder: "surfaces/ForecastCard",
    height: 235,
    summary: "One forecast period: date, direction, wind and temperature.",
    guidance: [
      "Pass values already formatted. This card does no unit conversion.",
    ],
    uses: "ForecastCard",
    body: `h(ForecastCard, { date: "Sat 14:00", direction: "NW", windSpeed: "18 kn", temperature: "16°C" })`,
  },
  {
    name: "RiderCard",
    group: "Surfaces",
    folder: "surfaces/RiderCard",
    height: 96,
    summary: "One rider's row: avatar, name, discipline, level and presence.",
    guidance: ["Pass `presence` as a status, never a location."],
    uses: "RiderCard",
    body: `h(RiderCard, { name: "Mara Jansen", discipline: "Freestyle", skillLevel: "Intermediate", presence: { status: "planning", time: "16:00" } })`,
  },
  {
    name: "SessionCard",
    group: "Surfaces",
    folder: "surfaces/SessionCard",
    height: 255,
    summary: "A planned session: name, spot, start time and who is going.",
    guidance: [
      "Provide the join or leave `Button` as `action`, since membership is the consumer's state.",
    ],
    uses: "SessionCard, Button",
    body: `h(SessionCard, { maxW: "sm", title: "Saturday Session", spot: "IJmuiden", startTime: "15:00", participants: 6, maxParticipants: 10, action: h(Button, { size: "sm" }, "Join") })`,
  },
  {
    name: "SpotCard",
    group: "Surfaces",
    folder: "surfaces/SpotCard",
    height: 520,
    summary: "A spot with photo, region, description, wind and rating.",
    guidance: [
      "Pass `windSpeed` and `rating` already formatted.",
      "`onSave` adds a save button over the photo.",
    ],
    uses: "SpotCard, Badge",
    body: `h(SpotCard, { name: "Wijk aan Zee", region: "North Holland", description: "Wide beach, steady sea breeze.", imageSrc: "${SPOT_PHOTO_URL}", imageAlt: "A kitesurfer on the water", windSpeed: "18 kn", rating: "4.8", badges: h(Badge, { intent: "info", variant: "solid" }, "Best wind") })`,
  },
  {
    name: "SpotHeader",
    group: "Surfaces",
    folder: "surfaces/SpotHeader",
    height: 460,
    summary: "The top of a spot page: photo, name, region and rider counts.",
    guidance: ["Provide the main spot action as `action`."],
    uses: "SpotHeader, Button",
    body: `h(SpotHeader, { maxW: "sm", name: "IJmuiden", region: "North Holland", imageSrc: "${SPOT_PHOTO_URL}", imageAlt: "A kitesurfer on the water", riding: 14, planning: 3, action: h(Button, null, "I'm riding here") })`,
  },
  {
    name: "WeatherCard",
    group: "Surfaces",
    folder: "surfaces/WeatherCard",
    height: 280,
    summary: "Current conditions in one short read.",
    guidance: [
      "Pair `condition` with `conditionIntent`, so the state is both a word and a color.",
    ],
    uses: "WeatherCard",
    body: `h(WeatherCard, { maxW: "sm", overline: "Now at IJmuiden", temperature: "16°C", windSpeed: "18 kn", feelsLike: "13°C", condition: "Good", conditionIntent: "success" })`,
  },
  {
    name: "Badge",
    group: "Typography",
    folder: "typography/Badge",
    height: 110,
    summary: "A small read-only label with a meaning-based `intent`.",
    guidance: ["Use `Tag` when the label can be removed."],
    uses: "Badge, Flex, Stack",
    body: `h(Stack, { gap: "2" },
  h(Flex, { gap: "2", wrap: "wrap" }, ["neutral", "success", "warning", "error", "info"].map((intent) => h(Badge, { key: intent, intent }, intent))),
  h(Flex, { gap: "2", wrap: "wrap" }, ["neutral", "success", "warning", "error", "info"].map((intent) => h(Badge, { key: intent, intent, variant: "solid" }, intent))))`,
  },
  {
    name: "Heading",
    group: "Typography",
    folder: "typography/Heading",
    height: 190,
    summary: "Sora headings in three named sizes.",
    guidance: [
      "Choose `variant`, never a font size. Sora stops at `title`; anything smaller is `Text`.",
    ],
    uses: "Heading, Stack",
    body: `h(Stack, { gap: "2" },
  h(Heading, { variant: "display" }, "Intelligent wind"),
  h(Heading, { variant: "heading" }, "Wijk aan Zee"),
  h(Heading, { variant: "title" }, "Saturday Session"))`,
  },
  {
    name: "Link",
    group: "Typography",
    folder: "typography/Link",
    height: 72,
    summary: "A text link in the brand teal, using `next/link` in the app.",
    guidance: ["Use `Button` for actions, and `Link` for going somewhere."],
    uses: "Link",
    body: `h(Link, { href: "#spots" }, "See all spots")`,
  },
  {
    name: "Tag",
    group: "Typography",
    folder: "typography/Tag",
    height: 80,
    summary: "A small label that can hold an icon and be removed.",
    guidance: [
      "Use `closable` with `onClose` for filters the rider can clear.",
    ],
    uses: "Tag, Flex",
    body: `h(Flex, { gap: "2", wrap: "wrap" },
  h(Tag, null, "Freestyle"),
  h(Tag, { intent: "info" }, "Foil"),
  h(Tag, { intent: "success", closable: true, onClose: () => {} }, "15+ kn"))`,
  },
  {
    name: "Text",
    group: "Typography",
    folder: "typography/Text",
    height: 130,
    summary: "Manrope body copy in named styles.",
    guidance: [
      "Choose `variant`. Use `body.photo` and `label.photo` on a photo scrim.",
    ],
    uses: "Text, Stack",
    body: `h(Stack, { gap: "2" },
  h(Text, { variant: "body" }, "Know before you go. See what's building, and when it's worth the drive."),
  h(Text, { variant: "caption" }, "3 riders planning from 16:00"),
  h(Text, { variant: "label" }, "18 kn NW"))`,
  },
];

/** Reads doc-commented props from a types file, one entry per interface member. */
const readPropsFromTypesFile = (typesSource, componentName) => {
  const propRows = [];
  const interfacePattern = /export interface (\w+)[^{]*?\{\n([\s\S]*?)\n\}/g;
  for (const [, interfaceName, interfaceBody] of typesSource.matchAll(
    interfacePattern,
  )) {
    if (!interfaceName.startsWith(componentName)) continue;
    const memberPattern =
      /(?:\/\*\*([\s\S]*?)\*\/\s*)?\n?\s{2}"?([\w-]+)"?(\?)?:\s*([^;]+);/g;
    for (const [
      ,
      docComment = "",
      propName,
      optionalMark,
      propType,
    ] of interfaceBody.matchAll(memberPattern)) {
      const description = docComment
        .split("\n")
        .map((docLine) => docLine.replace(/^\s*\*\s?/, "").trim())
        .filter((docLine) => docLine && !docLine.startsWith("@"))
        .join(" ");
      const defaultMatch = docComment.match(/@default\s+([^\n*]+)/);
      propRows.push({
        interfaceName,
        propName,
        isRequired: !optionalMark,
        propType: propType.replace(/\s+/g, " ").trim(),
        description,
        defaultValue: defaultMatch?.[1].trim() ?? "",
      });
    }
  }
  return propRows;
};

const escapeTableCell = (cellText) =>
  cellText.replaceAll("|", "\\|").replaceAll("\n", " ");

const createPropsSection = (propRows) => {
  if (propRows.length === 0) {
    return "## Props\n\nA pass-through of the matching Chakra UI component: every Chakra prop and style prop works, and resolves to AERYO tokens.\n";
  }
  const tableRows = propRows.map(
    ({
      interfaceName,
      propName,
      isRequired,
      propType,
      description,
      defaultValue,
    }) =>
      `| \`${propName}\` | \`${escapeTableCell(propType)}\` | ${isRequired ? "Yes" : "No"} | ${defaultValue ? `\`${escapeTableCell(defaultValue)}\`` : ""} | ${escapeTableCell(description)} | \`${interfaceName}\` |`,
  );
  return [
    "## Props",
    "",
    "| Prop | Type | Required | Default | What it does | Belongs to |",
    "| --- | --- | --- | --- | --- | --- |",
    ...tableRows,
    "",
  ].join("\n");
};

const createReadme = async (component) => {
  const typesPath = path.join(
    "src/components",
    component.folder,
    component.typesFile ?? `${component.name}.types.ts`,
  );
  const typesSource = existsSync(typesPath)
    ? await readFile(typesPath, "utf8")
    : "";
  const propRows = readPropsFromTypesFile(typesSource, component.name);
  return [
    component.summary,
    "",
    "## How to use it",
    "",
    ...component.guidance.map((guidanceLine) => `- ${guidanceLine}`),
    "",
    `Source: \`src/components/${component.folder}\`. Import from \`@/components/${component.folder}\`.`,
    "",
    createPropsSection(propRows),
  ].join("\n");
};

const createPreview = (component) => {
  const importedNames = new Set(
    component.uses.split(",").map((usedName) => usedName.trim()),
  );
  const importList = [...importedNames].join(", ");
  const previewStyle = component.photo
    ? "padding: 16px; background: var(--bg-photo);"
    : "padding: 16px;";
  return `<!-- @dsCard group="${component.group}" height=${component.height} -->
<div id="preview-root" style="${previewStyle}"></div>
<script>
  const { React, mountPreview, ${importList} } = window.Aeryo;
  const h = React.createElement;
  ${component.setup ?? ""}
  mountPreview(
    document.getElementById("preview-root"),
    ${component.body},
  );
  ${component.afterMount ?? ""}
</script>
`;
};

for (const component of COMPONENTS) {
  const componentFolder = path.join(OUTPUT_FOLDER, component.name);
  await mkdir(componentFolder, { recursive: true });
  await writeFile(
    path.join(componentFolder, "README.md"),
    await createReadme(component),
  );
  await writeFile(
    path.join(componentFolder, "preview.html"),
    createPreview(component),
  );
}

console.log(`Wrote docs and previews for ${COMPONENTS.length} components.`);
