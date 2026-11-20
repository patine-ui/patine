# Patine

[![npm](https://img.shields.io/npm/v/patine-ui)](https://www.npmjs.com/package/patine-ui) [![license](https://img.shields.io/npm/l/patine-ui)](LICENSE)

**Looks finished. Feels native.** Refined React Native components and ready screens for iOS, Android and the web from one codebase, in one crafted design that behaves like each platform, or each platform's native look with one prop. No native code, no dependencies, and an API that follows shadcn/ui.

<p align="center">
  <a href="https://patine.dev/docs/intro"><b>Documentation</b></a> ·
  <a href="https://patine.dev/docs/getting-started/quick-start">Quick start</a> ·
  <a href="https://patine.dev/docs/api/reference">API reference</a> ·
  <a href="https://patine.dev/llms-full.txt">llms-full.txt</a>
</p>

```tsx
import { useState } from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, DatePicker } from 'patine-ui';

export default function BookingCard() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pick a day</CardTitle>
      </CardHeader>
      <CardContent>
        <DatePicker value={date} onValueChange={setDate} minDate={new Date()} />
      </CardContent>
      <CardFooter>
        <Button onPress={() => console.log(date)}>Book</Button>
      </CardFooter>
    </Card>
  );
}
```

## Why Patine

- **One codebase.** The same components and props on iOS, Android and the web, with touch, keyboard, hover and screen readers handled on each.
- **Nothing to set up.** Pure JavaScript on React Native core APIs. Runs in Expo Go, bare React Native and React Native Web, and ships in OTA updates. No Reanimated, Gesture Handler, SVG, Tailwind or Babel plugin.
- **Familiar API.** shadcn/ui and Radix names: `variant`, `size`, `checked` + `onCheckedChange`, `value` + `onValueChange`, `open` + `onOpenChange` on every overlay, and composed parts such as `Card` + `CardHeader` or `RadioGroup` + `RadioGroupItem`.
- **One element for the simple case.** Every compound component also takes its content as props: `<Dialog trigger={…} title="Edit profile" actions={[…]} />`, `<Tabs items={[…]} />`, `<Accordion items={[…]} />`, `<AlertDialog title="Delete?" destructive onConfirm={…} />`. Compose the parts only when you need full control.
- **Finished on day one.** The Patine design looks the same, considered and calm, on every platform, while sheets, insets, gestures and focus follow each platform. Want the native look? `design="native"` gives iOS, Material 3 and web styling per platform. One theme drives colours, radius, type and every component's shadow (`theme.shadows`).
- **Accessible by default.** Roles, labels and states on every component, 44pt touch targets, a focus ring on the web, and animations that respect reduced motion.
- **Typed.** Generic value types, and `mode="range"` gives you a typed `{ start, end }`.

## Install

```sh
npm install patine-ui
# or
yarn add patine-ui
# or
pnpm add patine-ui
# or, in an Expo app
npx expo install patine-ui
```

No `pod install`, no rebuild, no config plugin.

## Quick start

Wrap your app in `PatineProvider` once. It sets the theme, the color scheme and the design for every component below it.

```tsx
import { PatineProvider, Switch, VStack, Heading } from 'patine-ui';

export default function App() {
  return (
    <PatineProvider colorScheme="auto" design="brand">
      <VStack gap="md" padding="lg">
        <Heading level={1}>Settings</Heading>
        <Switch label="Notifications" defaultChecked />
      </VStack>
    </PatineProvider>
  );
}
```

`colorScheme="auto"` and `design="brand"` are the defaults, so `<PatineProvider>` alone works too.

## Components

| Category | Components |
|---|---|
| Layout & text | [Text, Heading](https://patine.dev/docs/components/text) · [Stack, HStack, VStack](https://patine.dev/docs/components/stack) · [Box, Grid, Container, Center, Spacer, AspectRatio](https://patine.dev/docs/components/layout) · [Separator](https://patine.dev/docs/components/separator) · [VisuallyHidden, Slot, Portal](https://patine.dev/docs/components/primitives) |
| Buttons | [Button](https://patine.dev/docs/components/button) · [ButtonGroup](https://patine.dev/docs/components/button-group) · [ToggleGroup, ToggleButton](https://patine.dev/docs/components/toggle-group) · [Link](https://patine.dev/docs/components/link) · [Fab](https://patine.dev/docs/components/fab) · [CopyButton](https://patine.dev/docs/components/copy-button) |
| Forms | [TextField](https://patine.dev/docs/components/text-field) · [TextArea](https://patine.dev/docs/components/text-area) · [SearchField](https://patine.dev/docs/components/search-field) · [NumberField, Stepper](https://patine.dev/docs/components/number-field) · [PhoneField](https://patine.dev/docs/components/phone-field) · [InputOTP](https://patine.dev/docs/components/input-otp) · [Checkbox](https://patine.dev/docs/components/checkbox) · [CheckboxGroup](https://patine.dev/docs/components/checkbox-group) · [RadioGroup](https://patine.dev/docs/components/radio-group) · [Switch](https://patine.dev/docs/components/switch) · [Slider](https://patine.dev/docs/components/slider) · [Rating](https://patine.dev/docs/components/rating) · [SignaturePad](https://patine.dev/docs/components/signature-pad) |
| Selection | [Select](https://patine.dev/docs/components/select) · [SelectList](https://patine.dev/docs/components/select-list) · [SegmentedControl](https://patine.dev/docs/components/segmented-control) · [ChipGroup](https://patine.dev/docs/components/chip-group) · [WheelPicker](https://patine.dev/docs/components/wheel-picker) · [MultiWheelPicker](https://patine.dev/docs/components/multi-wheel-picker) · [CountryPicker](https://patine.dev/docs/components/country-picker) · [LanguagePicker](https://patine.dev/docs/components/language-picker) · [TimeZonePicker](https://patine.dev/docs/components/time-zone-picker) · [EmojiPicker](https://patine.dev/docs/components/emoji-picker) · [ColorPicker](https://patine.dev/docs/components/color-picker) · [Picker sheets](https://patine.dev/docs/components/picker-sheets) · [Picker fields](https://patine.dev/docs/components/picker-fields) |
| Date & time | [DatePicker](https://patine.dev/docs/components/date-picker) and [date ranges](https://patine.dev/docs/components/date-range-picker) · [DateWheelPicker](https://patine.dev/docs/components/date-wheel-picker) · [DateTimePicker](https://patine.dev/docs/components/date-time-picker) · [TimePicker](https://patine.dev/docs/components/time-picker) and [time ranges](https://patine.dev/docs/components/time-range-picker) · [DurationPicker](https://patine.dev/docs/components/duration-picker) · [MonthPicker](https://patine.dev/docs/components/month-picker) · [WeekStrip](https://patine.dev/docs/components/week-strip) · [ExpandableCalendar](https://patine.dev/docs/components/expandable-calendar) |
| Overlays | [Dialog](https://patine.dev/docs/components/dialog) · [AlertDialog](https://patine.dev/docs/components/alert-dialog) · [BottomSheet](https://patine.dev/docs/components/bottom-sheet) · [Modal & Drawer](https://patine.dev/docs/components/modal) · [Popover](https://patine.dev/docs/components/popover) · [Tooltip](https://patine.dev/docs/components/tooltip) · [DropdownMenu](https://patine.dev/docs/components/dropdown-menu) · [ActionSheet](https://patine.dev/docs/components/action-sheet) · [ImageViewer](https://patine.dev/docs/components/image-viewer) |
| Navigation | [Header](https://patine.dev/docs/components/header) · [Tabs](https://patine.dev/docs/components/tabs) · [BottomTabBar, NavigationRail](https://patine.dev/docs/components/bottom-tab-bar) · [Steps](https://patine.dev/docs/components/steps) · [Breadcrumbs](https://patine.dev/docs/components/breadcrumbs) · [Pagination](https://patine.dev/docs/components/pagination) |
| Lists & gestures | [List](https://patine.dev/docs/components/list) · [SortableList](https://patine.dev/docs/components/sortable-list) · [SwipeableRow](https://patine.dev/docs/components/swipeable-row) · [Carousel & Pager](https://patine.dev/docs/components/carousel) |
| Data display | [Card](https://patine.dev/docs/components/card) · [Table](https://patine.dev/docs/components/table) · [DescriptionList](https://patine.dev/docs/components/description-list) · [Stat](https://patine.dev/docs/components/stat) · [Badge](https://patine.dev/docs/components/badge) · [Avatar](https://patine.dev/docs/components/avatar) · [AvatarGroup](https://patine.dev/docs/components/avatar-group) · [Image](https://patine.dev/docs/components/image) · [Kbd](https://patine.dev/docs/components/kbd) · [QRCode](https://patine.dev/docs/components/qr-code) · [Accordion](https://patine.dev/docs/components/accordion) · [Collapsible](https://patine.dev/docs/components/collapsible) |
| Feedback | [Alert](https://patine.dev/docs/components/alert) · [Toast](https://patine.dev/docs/components/toast) · [Progress, Spinner](https://patine.dev/docs/components/progress) · [Skeleton](https://patine.dev/docs/components/skeleton) · [EmptyState](https://patine.dev/docs/components/empty-state) |
| Chat | [MessageBubble, ChatComposer, TypingIndicator, SuggestionChips](https://patine.dev/docs/components/chat) |
| Charts (Pro) | [Line & Area](https://patine.dev/docs/components/line-chart) · [Bar](https://patine.dev/docs/components/bar-chart) · [Combo](https://patine.dev/docs/components/combo-chart) · [Pie & Donut](https://patine.dev/docs/components/pie-chart) · [Radial](https://patine.dev/docs/components/radial-chart) · [Gauge](https://patine.dev/docs/components/gauge-chart) · [Heatmap](https://patine.dev/docs/components/heatmap-chart) · [Scatter & Bubble](https://patine.dev/docs/components/scatter-chart) · [Funnel](https://patine.dev/docs/components/funnel-chart) · [Radar](https://patine.dev/docs/components/radar-chart) · [Sparkline](https://patine.dev/docs/components/sparkline) · [Status tracker](https://patine.dev/docs/components/status-tracker) |
| Icons (Pro) | [Patine Icons](https://patine.dev/docs/components/icons) · [Brand & social logos](https://patine.dev/docs/components/brand-icons) |
| Blocks (Pro) | [Event calendar](https://patine.dev/docs/blocks/event-calendar) · [Agenda](https://patine.dev/docs/blocks/agenda) · [Kanban board](https://patine.dev/docs/blocks/kanban) · [Timeline](https://patine.dev/docs/blocks/timeline) · [Wizard](https://patine.dev/docs/blocks/wizard) · [Gantt](https://patine.dev/docs/blocks/gantt) · [Stats row](https://patine.dev/docs/blocks/stats-row) · [Pricing table](https://patine.dev/docs/blocks/pricing-table) · [Review list](https://patine.dev/docs/blocks/review-list) · [Product card](https://patine.dev/docs/blocks/product-card) · [Order tracker](https://patine.dev/docs/blocks/order-tracker) · [Activity feed](https://patine.dev/docs/blocks/activity-feed) · [Agent activity](https://patine.dev/docs/blocks/agent-activity) · [AI usage meter](https://patine.dev/docs/blocks/ai-usage-meter) · [Data grid](https://patine.dev/docs/blocks/data-grid) · [Tree view](https://patine.dev/docs/blocks/tree-view) · [AI chat](https://patine.dev/docs/blocks/ai-chat) · [Messenger](https://patine.dev/docs/blocks/messenger) · [Notification center](https://patine.dev/docs/blocks/notification-center) · [Map](https://patine.dev/docs/blocks/map) |

## Pro apps

Patine Pro adds complete, responsive apps built only from these components: each is a tab bar on phones, a navigation rail on tablets and a sidebar on desktop and the web, with every screen exported to wire to your own router and API.

| App | What's in it |
| --- | --- |
| [SaaS admin](https://patine.dev/docs/pro/admin) | KPI dashboard with charts, customers, invoices you write and send, payments, billing, team roles, audit log, notifications, integrations, API keys, ⌘K |
| [Store](https://patine.dev/docs/pro/commerce) | Shop, product detail with variants, bag with undo, checkout, orders, order tracking, reviews |
| [Bookings](https://patine.dev/docs/pro/bookings) | Schedule on a calendar, booking into free times only, reschedule and cancel, services |
| [Messaging](https://patine.dev/docs/pro/messaging) | Inbox, threads, two panes on desktop, an AI assistant that reads your chats |
| [Money](https://patine.dev/docs/pro/finance) | Balance and spending, activity, send money with a review step, budgets, cards |
| [Productivity](https://patine.dev/docs/pro/productivity) | Tasks by due date, kanban board, task detail with subtasks, files |
| [Sign-in and account](https://patine.dev/docs/pro/account) | Welcome, sign in and up, email code, password reset, paywall, profile, 404, offline |

They share a [responsive layout](https://patine.dev/docs/pro/layout): `AppShell`, `Page`, `Panel`, `DataTable`, `StatCard`, `QueryState`, `CommandPalette`, `AuthShell` and `useLayout`. Try them all live on [the screens page](https://patine.dev/screens).

## Icons

[`@patine-ui/icons`](packages/icons) (MIT) has 227 outline icons drawn for Patine that follow your theme and flip in
right-to-left layouts: `<Icon name="bell" />`. It's a separate package because it needs `react-native-svg` (which runs in
Expo Go and on the web); `patine-ui` itself stays at zero dependencies. Patine Pro takes the same names and adds 440 more
icons, solid, duotone and color variants, and 147 brand logos.

```sh
npx expo install @patine-ui/icons react-native-svg
```

## Designs and theming

Every component takes a `design`. The default, `brand`, is the Patine design: the same finished look on every platform, with each platform's behaviour. `native` gives each platform its own: iOS on iPhone, Material 3 on Android and the browser's conventions on the web. You can also force one look everywhere with `ios`, `material` or `web`. A component's `design` prop wins over the provider's.

```tsx
<PatineProvider design="native">{/* app */}</PatineProvider>

<DatePicker design="material" value={date} onValueChange={setDate} />
```

Theme tokens cover colors, radius, spacing and typography. Light and dark themes follow the OS, and you can override any token for the whole app or for one component:

```tsx
<PatineProvider
  theme={{ colors: { primary: '#4F46E5' }, radius: { md: 12 } }}
  darkTheme={{ colors: { primary: '#818CF8' } }}
>
  {/* app */}
</PatineProvider>
```

A component's `design` and `theme` reach everything inside it, its parts and your children alike, the way the provider's do.

Fonts plug in through the theme by role (`body`, `heading`, `display`, `numeric`, `mono`), one family name per weight. Patine ships no font files: load them your way (Expo's `useFonts`, `@font-face`) and pass the names. `Heading` draws in `heading`; `Stat`, table numbers and `<Text font="numeric">` draw in `numeric` with tabular figures, so amounts line up. The scale runs `xs` to `3xl`, then `display` and `hero` for big numbers; `lineHeights` and `tracking` set each step:

```tsx
<PatineProvider
  theme={{
    typography: {
      fonts: {
        body: { regular: 'Manrope_400Regular', medium: 'Manrope_500Medium', semibold: 'Manrope_600SemiBold' },
        heading: { regular: 'Newsreader_500Medium' },
      },
      lineHeights: { md: 24, '3xl': 40 },
    },
  }}
>
  {/* app */}
</PatineProvider>
```

Each visual part of a component is styled through its `styles` prop (`style` is the root), and rows, days and triggers can be replaced with render props:

```tsx
<Button styles={{ label: { letterSpacing: 0.5 } }}>Save</Button>
<Checkbox label="Remember me" styles={{ box: { borderRadius: 4 }, label: { fontWeight: '600' } }} />
```

### Translation and right to left

Every word a component shows or says by default comes from one place. Translate them for the whole app with `labels`; a component's own label props still win. `dir` sets which way text runs, so arrows, swipes, sliders and chevrons follow it (on the web it defaults to the page's `dir`):

```tsx
<PatineProvider dir="rtl" labels={{ close: 'סגור', cancel: 'ביטול', pagination: { next: 'הבא', previous: 'הקודם' } }}>
  {/* app */}
</PatineProvider>
```

`DEFAULT_LABELS` lists every key, and `useLabels()` and `useDirection()` read them in your own components. See [Designs](https://patine.dev/docs/guides/designs), [Theming](https://patine.dev/docs/guides/theming) and [Styling](https://patine.dev/docs/guides/styling).

## Accessibility

- Roles, labels and states (`checked`, `selected`, `expanded`, `disabled`) for VoiceOver, TalkBack and web screen readers.
- Touch targets of at least 44pt, added to small controls automatically on phones.
- Full keyboard use and a visible focus ring on every pressable control on the web.
- Text scales with the OS font size, up to 1.6× so fixed-height controls keep their text.
- Real web semantics for search engines and assistive tech: `href` on Button, Card, ListItem, tab bar items and breadcrumbs renders an `<a href>` (and opens the URL on iOS and Android), the tab bars are `<nav>` landmarks, Header is a `<header>`, headings are `<h1>`–`<h4>`, and Image's `alt` reaches the `<img>`.
- Animations stop when the OS asks to reduce motion.
- Names, the 12/24-hour clock and the first day of the week come from `Intl`; layouts flip for RTL (`dir` on the provider), and every default word can be translated (`labels`).

Details per component are in the [accessibility guide](https://patine.dev/docs/guides/accessibility).

## For AI agents

The full documentation is available as Markdown for coding assistants:

- [`llms.txt`](https://patine.dev/llms.txt): an index of every page.
- [`llms-full.txt`](https://patine.dev/llms-full.txt): every component, prop table and example in one file.
- `node_modules/patine-ui/llms-full.txt`: the same file inside the package, matching the installed version.

- [`@patine-ui/mcp`](packages/mcp): an MCP server for Claude Code, Cursor and other agents: `claude mcp add patine -- npx -y @patine-ui/mcp`. See [MCP server and agent setup](https://patine.dev/docs/resources/mcp). Its `search_icons` tool finds icon names, so agents don't guess.

Because the API uses shadcn/ui names, agents that know shadcn tend to write correct Patine code on the first try. A short cheat sheet is on the [For AI assistants](https://patine.dev/docs/resources/ai) page.

## Subpath imports

Everything is a named export from `patine-ui`. In native apps, import from a subpath so Metro bundles only what you use (the emoji data alone is about 130 KB):

```tsx
import { Button } from 'patine-ui/button';
import { DatePicker, DatePickerField } from 'patine-ui/date';
import { PatineProvider } from 'patine-ui/core';
```

Subpaths: `action` `alert` `avatar` `badge` `button` `calendar` `card` `chat` `checkbox` `color` `core` `country` `date` `datetime` `duration` `emoji` `empty` `header` `image` `language` `list` `month` `otp` `progress` `radio` `rating` `segmented` `select` `separator` `sheet` `skeleton` `slider` `stack` `suggestions` `switch` `text` `time` `timezone` `typing` `wheel`.

### Building your own components (`patine-ui/core`)

`patine-ui/core` holds the provider and the hooks (`useTheme`, `useLabels`, `useDirection`, `usePlatform`), the animation hooks, and two building blocks the library itself is made of:

- `Touchable`: anything pressable. It needs a `role`, and brings the hover tint, the press dim or ripple, a keyboard focus ring (`focusRing`), the disabled state, a 44pt touch area on phones (`minTarget`), and `href` (+ `external`) for a real link on the web.
- `createStyles`: a style sheet built from the theme once per theme, so theme colours and spacing cost nothing per render.
- The primitives the components draw with, each with the library's defaults built in: `Scroll` and `VirtualList` (taps work while the keyboard is up, no scrollbar track on the web), `Input` (the theme's type and colours, a capped font scale), `Span` (a run of text that takes its look from the text around it, for rich text), `Pressable` for surfaces that aren't controls (a backdrop, a drag area), and `AnimatedView`, `AnimatedText`, `AnimatedImage`, `AnimatedScrollView` with `animatedAdd`, `animatedMultiply`, `animatedSubtract`, `animatedEvent`, `createAnimatedValue` and `createAnimatedComponent` (an SVG shape), so your own components never import `Animated` or a view from `react-native`.
- `ThemeScope` hands a component's `theme` or `design` down to everything inside it; `useFocusVisible` and `focusRing(color)` draw a ring on keyboard focus only; `IS_WEB` tells whether a DOM exists (use `usePlatform()` for behaviour). `Touchable`'s `hover={false}` drops the hover tint, for photos, cards that lift and selected rows.

```tsx
import { createStyles, Touchable, useTheme } from 'patine-ui/core';

const themed = createStyles((t) => ({ row: { padding: t.spacing.md, borderRadius: t.radius.md, backgroundColor: t.colors.surface } }));

const Row = ({ children }) => (
  <Touchable role="link" href="/orders" style={themed(useTheme()).row}>
    {children}
  </Touchable>
);
```

Charts get eight colour-blind-safe series colours in `theme.chart`, tuned for light and dark; `theme.colors.media`, `onMedia`, `onMediaMuted`, `scrim` and `mediaTrack` are for anything drawn over photos and video.

A few live alongside related components: `PhoneField` is in `country`, `TimeRangePicker` in `time`, `ChipGroup` in `segmented`, and `DropdownMenu` and `ActionSheet` in `action`. Subpaths need React Native 0.79 or later (Metro package exports).

## Requirements

| | Version |
|---|---|
| `react` | 19 or later |
| `react-native` | 0.78 or later (New Architecture) |
| Expo | SDK 53 or later, including Expo Go |
| `react-native-web` | Supported |

No other peer dependencies.

## Open core

The core library is MIT and free for any use. Everything an app needs to look finished and accessible stays in the free core. Patine Pro, a paid add-on with complete responsive apps (SaaS admin, store, bookings, messaging, money, productivity, sign-in and account) and the layout behind them, ready screens (onboarding, sign in, paywall, settings, profile, AI chat, checkout), a streaming AI chat suite with Markdown, reasoning and tool calls (in place of react-native-gifted-chat), charts, blocks and templates, is in preview: see [the screens](https://patine.dev/screens), [pricing](https://patine.dev/pricing) and [ROADMAP.md](ROADMAP.md).

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, the example app and the docs site.

Emoji data comes from [emojibase](https://emojibase.dev) (MIT).

## License

MIT © Eliyahu Kriel
