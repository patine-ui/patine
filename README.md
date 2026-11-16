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
- **Familiar API.** shadcn/ui and Radix names: `variant`, `size`, `checked` + `onCheckedChange`, `value` + `onValueChange`, and composed parts such as `Card` + `CardHeader` or `RadioGroup` + `RadioGroupItem`.
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
| Foundations | [Text, Heading](https://patine.dev/docs/components/text) · [Stack, HStack, VStack](https://patine.dev/docs/components/stack) · [Separator](https://patine.dev/docs/components/separator) · [Box, Grid, Container, Center, Spacer, AspectRatio](https://patine.dev/docs/components/layout) · [VisuallyHidden, Slot, Portal](https://patine.dev/docs/components/primitives) |
| Navigation | [Header](https://patine.dev/docs/components/header) · [BottomTabBar, NavigationRail](https://patine.dev/docs/components/bottom-tab-bar) · [Breadcrumbs](https://patine.dev/docs/components/breadcrumbs) · [Pagination](https://patine.dev/docs/components/pagination) · [Tabs](https://patine.dev/docs/components/tabs) · [Steps](https://patine.dev/docs/components/steps) |
| Actions | [Button](https://patine.dev/docs/components/button) · [ButtonGroup](https://patine.dev/docs/components/button-group) · [Link](https://patine.dev/docs/components/link) · [Fab](https://patine.dev/docs/components/fab) · [CopyButton](https://patine.dev/docs/components/copy-button) · [ToggleGroup, ToggleButton](https://patine.dev/docs/components/toggle-group) · [DropdownMenu](https://patine.dev/docs/components/dropdown-menu) · [ActionSheet](https://patine.dev/docs/components/action-sheet) |
| Inputs | [TextField](https://patine.dev/docs/components/text-field) · [TextArea](https://patine.dev/docs/components/text-area) · [SearchField](https://patine.dev/docs/components/search-field) · [NumberField, Stepper](https://patine.dev/docs/components/number-field) · [Checkbox](https://patine.dev/docs/components/checkbox) · [CheckboxGroup](https://patine.dev/docs/components/checkbox-group) · [Switch](https://patine.dev/docs/components/switch) · [RadioGroup](https://patine.dev/docs/components/radio-group) · [SegmentedControl](https://patine.dev/docs/components/segmented-control) · [ChipGroup](https://patine.dev/docs/components/chip-group) · [Select](https://patine.dev/docs/components/select) · [SelectList](https://patine.dev/docs/components/select-list) · [Slider](https://patine.dev/docs/components/slider) · [Rating](https://patine.dev/docs/components/rating) · [InputOTP](https://patine.dev/docs/components/input-otp) · [PhoneField](https://patine.dev/docs/components/phone-field) · [SignaturePad](https://patine.dev/docs/components/signature-pad) |
| Date & time | [DatePicker](https://patine.dev/docs/components/date-picker) and [date ranges](https://patine.dev/docs/components/date-range-picker) · [DateWheelPicker](https://patine.dev/docs/components/date-wheel-picker) · [MonthPicker](https://patine.dev/docs/components/month-picker) · [WeekStrip](https://patine.dev/docs/components/week-strip) · [ExpandableCalendar](https://patine.dev/docs/components/expandable-calendar) · [TimePicker](https://patine.dev/docs/components/time-picker) and [time ranges](https://patine.dev/docs/components/time-range-picker) · [DurationPicker](https://patine.dev/docs/components/duration-picker) · [DateTimePicker](https://patine.dev/docs/components/date-time-picker) |
| Pickers | [WheelPicker](https://patine.dev/docs/components/wheel-picker) · [MultiWheelPicker](https://patine.dev/docs/components/multi-wheel-picker) · [CountryPicker](https://patine.dev/docs/components/country-picker) · [LanguagePicker](https://patine.dev/docs/components/language-picker) · [TimeZonePicker](https://patine.dev/docs/components/time-zone-picker) · [EmojiPicker](https://patine.dev/docs/components/emoji-picker) · [ColorPicker](https://patine.dev/docs/components/color-picker) |
| Overlays | [Dialog](https://patine.dev/docs/components/dialog) · [AlertDialog](https://patine.dev/docs/components/alert-dialog) · [Modal & Drawer](https://patine.dev/docs/components/modal) · [Popover](https://patine.dev/docs/components/popover) · [Tooltip](https://patine.dev/docs/components/tooltip) · [ImageViewer](https://patine.dev/docs/components/image-viewer) · [BottomSheet](https://patine.dev/docs/components/bottom-sheet) · [Picker sheets](https://patine.dev/docs/components/picker-sheets) · [Picker fields](https://patine.dev/docs/components/picker-fields) |
| Display | [Card](https://patine.dev/docs/components/card) · [List](https://patine.dev/docs/components/list) · [Table](https://patine.dev/docs/components/table) · [DescriptionList](https://patine.dev/docs/components/description-list) · [Stat](https://patine.dev/docs/components/stat) · [Kbd](https://patine.dev/docs/components/kbd) · [Accordion](https://patine.dev/docs/components/accordion) · [Collapsible](https://patine.dev/docs/components/collapsible) · [TreeView (Pro)](https://patine.dev/docs/components/tree-view) · [Avatar](https://patine.dev/docs/components/avatar) · [AvatarGroup](https://patine.dev/docs/components/avatar-group) · [Badge](https://patine.dev/docs/components/badge) · [Carousel & Pager](https://patine.dev/docs/components/carousel) · [QRCode](https://patine.dev/docs/components/qr-code) · [SortableList](https://patine.dev/docs/components/sortable-list) · [SwipeableRow](https://patine.dev/docs/components/swipeable-row) |
| Feedback | [Alert](https://patine.dev/docs/components/alert) · [Progress, Spinner](https://patine.dev/docs/components/progress) · [EmptyState](https://patine.dev/docs/components/empty-state) · [Skeleton](https://patine.dev/docs/components/skeleton) · [Toast](https://patine.dev/docs/components/toast) |
| Chat | [MessageBubble, ChatComposer](https://patine.dev/docs/components/chat) · [AI Chat (Pro)](https://patine.dev/docs/components/ai-chat) |
| Charts (Pro) | [Line & Area](https://patine.dev/docs/components/line-chart) · [Bar](https://patine.dev/docs/components/bar-chart) · [Combo](https://patine.dev/docs/components/combo-chart) · [Pie & Donut](https://patine.dev/docs/components/pie-chart) · [Radial](https://patine.dev/docs/components/radial-chart) · [Gauge](https://patine.dev/docs/components/gauge-chart) · [Heatmap](https://patine.dev/docs/components/heatmap-chart) · [Scatter & Bubble](https://patine.dev/docs/components/scatter-chart) · [Funnel](https://patine.dev/docs/components/funnel-chart) · [Radar](https://patine.dev/docs/components/radar-chart) · [Sparkline](https://patine.dev/docs/components/sparkline) · [Status tracker](https://patine.dev/docs/components/status-tracker) |
| Icons (Pro) | [Patine Icons](https://patine.dev/docs/components/icons) · [Brand & social logos](https://patine.dev/docs/components/brand-icons) |
| Blocks (Pro) | [Event calendar](https://patine.dev/docs/blocks/event-calendar) · [Agenda](https://patine.dev/docs/blocks/agenda) · [Kanban board](https://patine.dev/docs/blocks/kanban) · [Timeline](https://patine.dev/docs/blocks/timeline) · [Wizard](https://patine.dev/docs/blocks/wizard) · [Gantt](https://patine.dev/docs/blocks/gantt) · [Stats row](https://patine.dev/docs/blocks/stats-row) · [Pricing table](https://patine.dev/docs/blocks/pricing-table) · [Review list](https://patine.dev/docs/blocks/review-list) · [Product card](https://patine.dev/docs/blocks/product-card) · [Order tracker](https://patine.dev/docs/blocks/order-tracker) · [Activity feed](https://patine.dev/docs/blocks/activity-feed) · [Agent activity](https://patine.dev/docs/blocks/agent-activity) · [AI usage meter](https://patine.dev/docs/blocks/ai-usage-meter) |

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

Each visual part of a component can be styled through the `styles` prop, and rows, days and triggers can be replaced with render props. See [Designs](https://patine.dev/docs/guides/designs), [Theming](https://patine.dev/docs/guides/theming) and [Styling](https://patine.dev/docs/guides/styling).

## Accessibility

- Roles, labels and states (`checked`, `selected`, `expanded`, `disabled`) for VoiceOver, TalkBack and web screen readers.
- Touch targets of at least 44pt.
- Full keyboard use and a visible focus ring on the web.
- Animations stop when the OS asks to reduce motion.
- Names, the 12/24-hour clock and the first day of the week come from `Intl`, and layouts flip for RTL.

Details per component are in the [accessibility guide](https://patine.dev/docs/guides/accessibility).

## For AI agents

The full documentation is available as Markdown for coding assistants:

- [`llms.txt`](https://patine.dev/llms.txt): an index of every page.
- [`llms-full.txt`](https://patine.dev/llms-full.txt): every component, prop table and example in one file.
- `node_modules/patine-ui/llms-full.txt`: the same file inside the package, matching the installed version.

- [`@patine-ui/mcp`](packages/mcp): an MCP server for Claude Code, Cursor and other agents: `claude mcp add patine -- npx -y @patine-ui/mcp`. See [MCP server and agent setup](https://patine.dev/docs/resources/mcp).

Because the API uses shadcn/ui names, agents that know shadcn tend to write correct Patine code on the first try. A short cheat sheet is on the [For AI assistants](https://patine.dev/docs/resources/ai) page.

## Subpath imports

Everything is a named export from `patine-ui`. In native apps, import from a subpath so Metro bundles only what you use (the emoji data alone is about 130 KB):

```tsx
import { Button } from 'patine-ui/button';
import { DatePicker, DatePickerField } from 'patine-ui/date';
import { PatineProvider } from 'patine-ui/core';
```

Subpaths: `action` `alert` `avatar` `badge` `button` `calendar` `card` `chat` `checkbox` `color` `core` `country` `date` `datetime` `duration` `emoji` `empty` `header` `language` `list` `month` `otp` `progress` `radio` `rating` `segmented` `select` `separator` `sheet` `skeleton` `slider` `stack` `switch` `text` `time` `timezone` `wheel`.

A few live alongside related components: `PhoneField` is in `country`, `TimeRangePicker` in `time`, `ChipGroup` in `segmented`, and `DropdownMenu` and `ActionSheet` in `action`. Subpaths need React Native 0.79 or later (Metro package exports).

## Requirements

| | Version |
|---|---|
| `react` | 18 or later |
| `react-native` | 0.72 or later |
| Expo | Any SDK, including Expo Go |
| `react-native-web` | Supported |

No other peer dependencies.

## Open core

The core library is MIT and free for any use. Everything an app needs to look finished and accessible stays in the free core. Patine Pro, a paid add-on with complete responsive apps (SaaS admin, store, bookings, messaging, money, productivity, sign-in and account) and the layout behind them, ready screens (onboarding, sign in, paywall, settings, profile, AI chat, checkout), a streaming AI chat suite with Markdown, reasoning and tool calls (in place of react-native-gifted-chat), charts, blocks and templates, is in preview: see [the screens](https://patine.dev/screens), [pricing](https://patine.dev/pricing) and [ROADMAP.md](ROADMAP.md).

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, the example app and the docs site.

Emoji data comes from [emojibase](https://emojibase.dev) (MIT).

## License

MIT © Eliyahu Kriel
