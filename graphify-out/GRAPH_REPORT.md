# Graph Report - aeryo  (2026-08-25)

## Corpus Check
- 451 files · ~183,608 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1328 nodes · 2160 edges · 141 communities (84 shown, 57 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.83)
- Token cost: 328,125 input · 0 output

## Community Hubs (Navigation)
- Chat & Rider Count Components
- App Root Layout & Fonts
- Avatar & Skeleton Components
- Package Dependencies (Core)
- Rider List & Presence Components
- Badge & Tag Components
- Select & Close Button Components
- AeryoCard Stories
- Drawer Component
- Design System Token Tests
- AeryoCard Sub-Components
- iOS App/Scene Delegate
- TypeScript Config
- Tabs Component
- SegmentedControl Component
- Checkbox Component
- RadioGroup Component
- Button Stories
- EmptyState Component
- Switch Component
- Textarea Component
- Grid Primitive
- Flex Primitive
- IconButton Stories
- Center Primitive
- Separator Primitive
- Link Component
- FormError Component
- Box Primitive
- Container Primitive
- Button & IconButton Core
- Field Stories
- Form Stories
- Input Stories
- Stack Stories
- PasswordInput Stories
- Forecast/Session Card Components
- Kitesurf App Product Context
- Stack Primitive & SpotHeader
- AeryoCard Context & Variants
- AERYO Brand & Design Foundations Spec
- SpotCard Stories
- Capacitor Example Tests
- Storybook Dev Dependencies
- Design Critique & Contrast Fixes
- SpotRiderCount Stories & Viewports
- ForecastCard Stories
- WeatherCard Stories
- Design System Colors Story
- AERYO Typography & Stitch Design
- Home Page
- RiderPresence Stories
- AeryoCard Implementation
- RiderCard Stories & Color Mode
- SessionCard Stories
- Task Observer Skill
- Design System Foundations Plan
- Chat Stories & Color Mode
- Form Component
- Motion Design Story
- Design System Roadmap & Card Spec
- Page-Build Roadmap
- Safe Area Provider Design
- Radius Design Story
- Shadows Design Story
- Spacing Design Story
- Typography Design Story
- Skill Creator Grader Script
- Field Component
- Input Component
- PasswordInput Component
- SpotCard Component
- WeatherCard Component
- Android Launcher Icon Layers
- Android Gradle Wrapper Script
- Root Agent Instructions
- Android MainActivity
- Aeryo Brand Assets (Logo & Splash)
- ESLint Config
- iOS App Icon & Splash
- Jest Config
- Next.js Boilerplate Icons (File/Globe/Window)
- Tooltip Component
- Android Splash Screen (Landscape)
- Capacitor Android Dependency
- Capacitor CLI Dependency
- Capacitor Config
- Capacitor Core Dependency
- Capacitor iOS Dependency
- Chakra UI CLI Dependency
- Chromatic Storybook Dependency
- Task Observer Skill Taxonomy
- ESLint Dependency
- ESLint Next.js Config Dependency
- ESLint Storybook Plugin Dependency
- iOS Capacitor SPM Package
- Jest Dependency
- Jest DOM Environment Dependency
- Next.js Config
- Playwright Dependency
- Prettier Dependency
- Storybook Docs Addon
- Storybook MCP Addon
- Storybook Vitest Addon
- Storybook Next.js Vite Framework
- Testing Library DOM Dependency
- Testing Library Jest-DOM Dependency
- Testing Library React Dependency
- ts-node Dependency
- Jest Types Dependency
- Node Types Dependency
- React Types Dependency
- React-DOM Types Dependency
- TypeScript Dependency
- Vite Dependency
- Vitest Browser-Playwright Dependency
- Vitest Coverage Dependency
- Next.js/Vercel Boilerplate Logos
- Toaster Component
- Storybook Main Config
- Task Observer Activation Setup
- Task Observer Handoff-Doc Mode
- Task Observer Confidentiality Layers
- Task Observer Lean Content Principle
- Task Observer Weekly Review Policy
- Task Observer Scheduled-Mode Reachability
- Task Observer Numbering Discipline
- Task Observer Observation Log
- Task Observer Session Start Protocol
- Aeryo PWA Icon
- Serena Project Config

## God Nodes (most connected - your core abstractions)
1. `LightMode` - 42 edges
2. `DarkMode` - 42 edges
3. `RESPONSIVE_VIEWPORTS` - 41 edges
4. `scripts` - 18 edges
5. `AeryoCardSize` - 17 edges
6. `compilerOptions` - 16 edges
7. `Text` - 15 edges
8. `AeryoCardVariant` - 14 edges
9. `react` - 13 edges
10. `useAeryoCardContext()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Stitch AERYO Color Palette & Roles` --shares_data_with--> `Resolved Palette Implementation Addendum`  [INFERRED]
  .stitch/DESIGN.md → docs/guides/aeryo-branding.md
- `Stitch Typography Rules` --semantically_similar_to--> `AERYO Typography (Sora/Inter)`  [INFERRED] [semantically similar]
  .stitch/DESIGN.md → docs/guides/aeryo-branding.md
- `Home Screen Hierarchy (community-first)` --semantically_similar_to--> `Community First Core Product Principle`  [INFERRED] [semantically similar]
  .stitch/DESIGN.md → docs/guides/kitesurf-app.md
- `AERYO Stitch Design System (DESIGN.md)` --conceptually_related_to--> `AERYO Brand & Design System Master Brief`  [INFERRED]
  .stitch/DESIGN.md → docs/guides/aeryo-branding.md
- `CapApp-SPM Package README` --conceptually_related_to--> `Safe Area + Status Bar Setup Design Spec`  [INFERRED]
  ios/App/CapApp-SPM/README.md → docs/superpowers/specs/2026-08-22-safe-area-provider-design.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AERYO Color Token System (brief → critique → design docs)** — docs_guides_aeryo_branding_resolved_palette, impeccable_critique_2026_08_20t11_28_12z__src_design_system_theme, stitch_design_color_palette [INFERRED 0.80]
- **Design System Foundations Development Cycle (critique → spec → plan)** — impeccable_critique_2026_08_20t11_28_12z__src_design_system_theme, docs_superpowers_specs_2026_08_20_design_system_foundations_design, docs_superpowers_plans_2026_08_20_design_system_foundations [INFERRED 0.85]
- **AERYO Product-to-Design Pipeline (product guide → brand → roadmap)** — docs_guides_kitesurf_app_full_context, docs_guides_aeryo_branding, docs_superpowers_plans_2026_08_21_page_build_roadmap [INFERRED 0.75]

## Communities (141 total, 57 thin omitted)

### Community 0 - "Chat & Rider Count Components"
Cohesion: 0.06
Nodes (39): Chat, ChatHeader, ChatMessage, ChatMessages, ChatHeaderProps, ChatMessageProps, ChatMessagesProps, ChatProps (+31 more)

### Community 1 - "App Root Layout & Fonts"
Cohesion: 0.06
Nodes (38): react, react, geistMono, inter, metadata, sora, viewport, ScopedColorModeDrawer() (+30 more)

### Community 2 - "Avatar & Skeleton Components"
Cohesion: 0.06
Nodes (39): Avatar, INDICATOR_SIZE, BrokenImageFallsBackToInitials, DarkModeStory, Default, Desktop, Fallback, Group (+31 more)

### Community 3 - "Package Dependencies (Core)"
Cohesion: 0.04
Nodes (44): @capacitor/splash-screen, @chakra-ui/react, @emotion/react, @hookform/resolvers, next, next-themes, dependencies, @capacitor/splash-screen (+36 more)

### Community 4 - "Rider List & Presence Components"
Cohesion: 0.09
Nodes (30): STATUS_PILL_COLOR_PALETTE, RiderList, Default, Empty, meta, Mobile, RIDERS, Story (+22 more)

### Community 5 - "Badge & Tag Components"
Cohesion: 0.08
Nodes (33): Badge, DarkModeStory, Default, Desktop, INTENTS, LightModeStory, LongLabel, meta (+25 more)

### Community 6 - "Select & Close Button Components"
Cohesion: 0.08
Nodes (30): Content, Item, ItemGroup, Root, Select, Clearable, DarkModeStory, Default (+22 more)

### Community 7 - "AeryoCard Stories"
Cohesion: 0.06
Nodes (33): ClickableCard, DarkModeStory, Default, Desktop, Disabled, Elevated, Empty, Filled (+25 more)

### Community 8 - "Drawer Component"
Cohesion: 0.12
Nodes (30): CHAKRA_PLACEMENT, Drawer(), DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle (+22 more)

### Community 9 - "Design System Token Tests"
Cohesion: 0.12
Nodes (17): config, system, semanticTokens, breakpoints, colors, durations, easings, motion (+9 more)

### Community 10 - "AeryoCard Sub-Components"
Cohesion: 0.16
Nodes (20): AeryoCardActionsProps, AeryoCardAspectRatio, AeryoCardBadgesProps, AeryoCardBodyProps, AeryoCardFooterProps, AeryoCardHeaderProps, AeryoCardMediaProps, AeryoCardMetaProps (+12 more)

### Community 11 - "iOS App/Scene Delegate"
Cohesion: 0.09
Nodes (20): Any, Bool, Capacitor, AppDelegate, UIScene, UISceneSession, UIWindow, SceneDelegate (+12 more)

### Community 12 - "TypeScript Config"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 13 - "Tabs Component"
Cohesion: 0.15
Nodes (19): DarkModeStory, Default, Desktop, IconTabs, LightModeStory, LongLabels, meta, Mobile (+11 more)

### Community 14 - "SegmentedControl Component"
Cohesion: 0.13
Nodes (18): normalize(), SegmentedControl, DarkModeStory, Default, Desktop, Disabled, LightModeStory, LongLabels (+10 more)

### Community 15 - "Checkbox Component"
Cohesion: 0.12
Nodes (17): Checkbox, Checked, DarkModeStory, Default, Desktop, Disabled, Invalid, LightModeStory (+9 more)

### Community 16 - "RadioGroup Component"
Cohesion: 0.14
Nodes (17): Radio, RadioGroup, DarkModeStory, Default, Desktop, Disabled, Horizontal, LightModeStory (+9 more)

### Community 17 - "Button Stories"
Cohesion: 0.11
Nodes (18): Click, DarkModeStory, Default, Desktop, Disabled, INTENTS, LightModeStory, Loading (+10 more)

### Community 18 - "EmptyState Component"
Cohesion: 0.15
Nodes (15): EmptyState, DarkModeStory, Default, Desktop, LightModeStory, meta, Mobile, NoForecasts (+7 more)

### Community 19 - "Switch Component"
Cohesion: 0.13
Nodes (15): Checked, DarkModeStory, Default, Desktop, Disabled, LightModeStory, LongLabel, meta (+7 more)

### Community 20 - "Textarea Component"
Cohesion: 0.13
Nodes (15): DarkModeStory, Default, Desktop, Disabled, Invalid, LightModeStory, LongContent, meta (+7 more)

### Community 21 - "Grid Primitive"
Cohesion: 0.13
Nodes (12): Grid, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 22 - "Flex Primitive"
Cohesion: 0.14
Nodes (12): Flex, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 23 - "IconButton Stories"
Cohesion: 0.12
Nodes (16): Click, DarkModeStory, Default, Desktop, Disabled, INTENTS, LightModeStory, LongAriaLabel (+8 more)

### Community 24 - "Center Primitive"
Cohesion: 0.15
Nodes (12): Center, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 25 - "Separator Primitive"
Cohesion: 0.15
Nodes (12): Separator, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 26 - "Link Component"
Cohesion: 0.15
Nodes (13): Link, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+5 more)

### Community 27 - "FormError Component"
Cohesion: 0.17
Nodes (12): FormError, DarkModeStory, Default, Desktop, Empty, LightModeStory, LongMessage, meta (+4 more)

### Community 28 - "Box Primitive"
Cohesion: 0.17
Nodes (12): Box, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 29 - "Container Primitive"
Cohesion: 0.17
Nodes (11): Container, DarkModeStory, Default, Desktop, LightModeStory, LongContent, meta, Mobile (+3 more)

### Community 30 - "Button & IconButton Core"
Cohesion: 0.34
Nodes (8): Button, ButtonIntent, ButtonProps, ButtonSize, ButtonVariant, IconButton, IconButtonProps, INTENT_COLOR_PALETTE

### Community 31 - "Field Stories"
Cohesion: 0.13
Nodes (14): DarkModeStory, Default, Desktop, Disabled, Invalid, LightModeStory, LongLabel, meta (+6 more)

### Community 32 - "Form Stories"
Cohesion: 0.13
Nodes (14): DarkModeStory, Desktop, LightModeStory, meta, Mobile, PlainLayout, SignUpExample, SignUpPasswordMismatch (+6 more)

### Community 33 - "Input Stories"
Cohesion: 0.13
Nodes (14): DarkModeStory, Default, Desktop, Disabled, Invalid, LightModeStory, LongValue, meta (+6 more)

### Community 34 - "Stack Stories"
Cohesion: 0.13
Nodes (12): DarkModeStory, Default, Desktop, Horizontal, LightModeStory, LongContent, meta, Mobile (+4 more)

### Community 35 - "PasswordInput Stories"
Cohesion: 0.14
Nodes (13): DarkModeStory, Default, DefaultVisible, Desktop, Disabled, Invalid, LightModeStory, LongValue (+5 more)

### Community 36 - "Forecast/Session Card Components"
Cohesion: 0.32
Nodes (6): AeryoCardInteractionProps, ForecastCard, ForecastCardProps, deriveCardInteraction(), SessionCard, SessionCardProps

### Community 37 - "Kitesurf App Product Context"
Cohesion: 0.20
Nodes (12): Design System Architecture (§22), Beach Mode UX Principle, Competitive Analysis (Surfr, Windy, KiteSpot, WOO...), Initial Database Model (V1), DS Component = Styled Chakra Component, Not a Replacement, Kitesurf App Full Project Context (Part 1), GearGuard — Validated Gear Marketplace Concept, KiteConnect — Spot & Community Hub Concept (+4 more)

### Community 38 - "Stack Primitive & SpotHeader"
Cohesion: 0.24
Nodes (8): Stack, StackProps, Default, meta, Mobile, OnDarkBackground, Story, WithImage

### Community 39 - "AeryoCard Context & Variants"
Cohesion: 0.31
Nodes (10): AeryoCardLayout, AeryoCardSize, AeryoCardVariant, AeryoCardContext, AeryoCardContextValue, AeryoCardProvider(), ForecastCardOwnProps, SessionCardOwnProps (+2 more)

### Community 40 - "AERYO Brand & Design Foundations Spec"
Cohesion: 0.22
Nodes (10): AERYO Brand & Design System Master Brief, Accessibility Requirements (§25), Brand Essence: Intelligent Wind, Made Tangible, The AERYO Design Test (§31), The AERYO O Symbol, AERYO Design System Foundations Design Spec, Spec: Colors (no new hue families), Spec: Motion (durations/easings) (+2 more)

### Community 41 - "SpotCard Stories"
Cohesion: 0.20
Nodes (9): Clickable, DarkModeStory, Default, LightModeStory, Loading, meta, Mobile, Story (+1 more)

### Community 42 - "Capacitor Example Tests"
Cohesion: 0.33
Nodes (5): ExampleInstrumentedTest, ExampleUnitTest, androidx.test.ext.junit.runners.AndroidJUnit4, org.junit.runner.RunWith, org.junit.Test

### Community 43 - "Storybook Dev Dependencies"
Cohesion: 0.22
Nodes (9): @capacitor/assets, devDependencies, @capacitor/assets, storybook, @storybook/addon-a11y, vitest, storybook, @storybook/addon-a11y (+1 more)

### Community 44 - "Design Critique & Contrast Fixes"
Cohesion: 0.31
Nodes (9): Color Philosophy (§9), Resolved Palette Implementation Addendum, Design Critique: src/design-system/theme, Design Health Score (8/12), P0: accent.contrast on accent.solid fails contrast (2.49:1), P1: fg.muted on bg.muted lands at 4.12:1, just under AA, P1: fg.subtle fails AA against bg / bg.subtle, P2: wind.extreme / session.cancelled use un-anchored stock red/orange (+1 more)

### Community 45 - "SpotRiderCount Stories & Viewports"
Cohesion: 0.25
Nodes (7): Default, meta, Mobile, OnDarkBackground, RidingOnly, Story, RESPONSIVE_VIEWPORTS

### Community 46 - "ForecastCard Stories"
Cohesion: 0.22
Nodes (8): DarkModeStory, Default, LightModeStory, Loading, meta, Mobile, Story, Timeline

### Community 47 - "WeatherCard Stories"
Cohesion: 0.22
Nodes (8): DangerousConditions, DarkModeStory, Default, LightModeStory, Loading, meta, Mobile, Story

### Community 48 - "Design System Colors Story"
Cohesion: 0.22
Nodes (5): meta, RawPalette, SCALE_STEPS, SemanticTokens, Story

### Community 49 - "AERYO Typography & Stitch Design"
Cohesion: 0.25
Nodes (8): AERYO Typography (Sora/Inter), Community First Core Product Principle, AERYO Stitch Design System (DESIGN.md), Stitch AERYO Color Palette & Roles, Component Stylings (Buttons, Cards, Nav), Home Screen Hierarchy (community-first), Stitch Typography Rules, Wind Intensity Data Scale (calm→extreme)

### Community 50 - "Home Page"
Cohesion: 0.32
Nodes (5): Home(), CssCheck, Default, meta, Story

### Community 51 - "RiderPresence Stories"
Cohesion: 0.25
Nodes (7): AllStatuses, Default, meta, Mobile, OnDarkBackground, STATUSES, Story

### Community 52 - "AeryoCard Implementation"
Cohesion: 0.32
Nodes (6): AeryoCard, CHAKRA_VARIANT, splitMediaChild(), AeryoCardProps, AeryoCardMedia, LOCAL_VARIANT_STYLES

### Community 53 - "RiderCard Stories & Color Mode"
Cohesion: 0.25
Nodes (7): Default, meta, Mobile, OnDarkBackground, RiderList, Story, LightMode

### Community 54 - "SessionCard Stories"
Cohesion: 0.25
Nodes (7): Default, Loading, meta, Mobile, NoCap, OnDarkBackground, Story

### Community 55 - "Task Observer Skill"
Cohesion: 0.29
Nodes (7): Environments, Activation Setup, and Handoff-Doc Mode, Skill Authoring Reference, The Pre-Flight Principle, Comprehensive Review (scheduled or fallback), Task Observer Skill, Archival on Write, Log-Write Safety Mutation Rules

### Community 56 - "Design System Foundations Plan"
Cohesion: 0.29
Nodes (7): Task 4: Add Breakpoint Tokens, Task 5: Add Motion Tokens, Task 3: Add Spacing Tokens, Task 2: Expand Typography Tokens, Task 1: Move colors/radii/shadows into tokens/, Tasks 7–9: Storybook Foundations Stories, Task 6: Add tokens/index.ts Barrel

### Community 57 - "Chat Stories & Color Mode"
Cohesion: 0.29
Nodes (6): Default, meta, Mobile, OnDarkBackground, Story, DarkMode

### Community 58 - "Form Component"
Cohesion: 0.48
Nodes (3): ChakraForm, Form, FormProps

### Community 59 - "Motion Design Story"
Cohesion: 0.29
Nodes (5): DURATIONS, EASINGS, meta, Motion, Story

### Community 60 - "Design System Roadmap & Card Spec"
Cohesion: 0.40
Nodes (6): Technology Stack (Next.js/Chakra/GraphQL/Supabase), AERYO Design System Foundations Implementation Plan, AeryoCard Design Spec, AeryoCardContext (compound component pattern), AeryoCard Interactive Mode (LinkBox/LinkOverlay), AeryoCard Loading State Design

### Community 61 - "Page-Build Roadmap"
Cohesion: 0.33
Nodes (6): Aeryo Page-Build Roadmap, Phase 0: Current State Audit, Phase 1: Close DS Gap for Spot Page, Phase 2: Pre-auth Pages, in Build Order, Phase 3: Supabase Provisioning, Phase 5: Auth Pages

### Community 62 - "Safe Area Provider Design"
Cohesion: 0.47
Nodes (6): Safe Area + Status Bar Setup Design Spec, SafeAreaProvider + useSafeArea() Hook, StatusBarSync Component, SystemBars API (Capacitor 8 built-in), Three-Layer Safe-Area Approach (CSS/React/Native), CapApp-SPM Package README

### Community 63 - "Radius Design Story"
Cohesion: 0.33
Nodes (4): meta, Radius, STEPS, Story

### Community 64 - "Shadows Design Story"
Cohesion: 0.33
Nodes (4): meta, Shadows, STEPS, Story

### Community 65 - "Spacing Design Story"
Cohesion: 0.33
Nodes (4): meta, Spacing, STEPS, Story

### Community 66 - "Typography Design Story"
Cohesion: 0.33
Nodes (3): meta, Story, Typography

### Community 67 - "Skill Creator Grader Script"
Cohesion: 0.40
Nodes (3): checks, frontmatterMatch, score

### Community 73 - "Android Launcher Icon Layers"
Cohesion: 0.83
Nodes (4): Aeryo App Icon (Combined, xxxhdpi), Aeryo App Icon Background Layer (xxxhdpi), Aeryo App Icon Foreground Layer (xxxhdpi), Aeryo App Icon (Round Mask, xxxhdpi)

### Community 74 - "Android Gradle Wrapper Script"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 75 - "Root Agent Instructions"
Cohesion: 0.67
Nodes (3): AGENTS.md Next.js Warning, Aeryo CLAUDE.md Root Instructions, Aeryo README (create-next-app boilerplate)

### Community 77 - "Aeryo Brand Assets (Logo & Splash)"
Cohesion: 1.00
Nodes (3): Aeryo Logo Mark, Aeryo Splash Screen (Light), Aeryo Splash Screen (Dark)

### Community 79 - "iOS App Icon & Splash"
Cohesion: 1.00
Nodes (3): Aeryo App Icon (Mountain/Wing Mark), Splash Screen Mark (Light, @3x), Splash Screen Mark (Dark, @3x)

### Community 81 - "Next.js Boilerplate Icons (File/Globe/Window)"
Cohesion: 1.00
Nodes (3): File/document icon (default create-next-app boilerplate asset, not Aeryo-specific), Globe icon (default create-next-app boilerplate asset, not Aeryo-specific), Window/browser icon (default create-next-app boilerplate asset, not Aeryo-specific)

## Knowledge Gaps
- **691 isolated node(s):** `checks`, `frontmatterMatch`, `score`, `config`, `preview` (+686 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Root Layout & Fonts` to `Package Dependencies (Core)`, `PasswordInput Component`, `AeryoCard Sub-Components`, `SegmentedControl Component`, `AeryoCard Implementation`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Package Dependencies (Core)` to `App Root Layout & Fonts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Storybook Dev Dependencies` to `Package Dependencies (Core)`, `Capacitor Android Dependency`, `Capacitor CLI Dependency`, `Capacitor Core Dependency`, `Capacitor iOS Dependency`, `Chakra UI CLI Dependency`, `Chromatic Storybook Dependency`, `ESLint Dependency`, `ESLint Next.js Config Dependency`, `ESLint Storybook Plugin Dependency`, `Jest Dependency`, `Jest DOM Environment Dependency`, `Playwright Dependency`, `Prettier Dependency`, `Storybook Docs Addon`, `Storybook MCP Addon`, `Storybook Vitest Addon`, `Storybook Next.js Vite Framework`, `Testing Library DOM Dependency`, `Testing Library Jest-DOM Dependency`, `Testing Library React Dependency`, `ts-node Dependency`, `Jest Types Dependency`, `Node Types Dependency`, `React Types Dependency`, `React-DOM Types Dependency`, `TypeScript Dependency`, `Vite Dependency`, `Vitest Browser-Playwright Dependency`, `Vitest Coverage Dependency`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `checks`, `frontmatterMatch`, `score` to the rest of the system?**
  _691 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Chat & Rider Count Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06493506493506493 - nodes in this community are weakly interconnected._
- **Should `App Root Layout & Fonts` be split into smaller, more focused modules?**
  _Cohesion score 0.05939716312056738 - nodes in this community are weakly interconnected._
- **Should `Avatar & Skeleton Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06290471785383904 - nodes in this community are weakly interconnected._