# Roadmap

Where Patine is going, what's free and what's Pro, and why. Per-component status lives in [COMPONENTS.md](COMPONENTS.md);
this file is the strategy behind it.

## Who it's for

Two readers, with equal weight:

1. **React Native and Expo developers** shipping a phone app that also runs on the web. They want screens that look
   finished on day one, finished in the Patine design, or each platform's native look, without native modules, Reanimated or a
   Tailwind setup.
2. **AI coding agents** writing that app for them. They need names they already know (shadcn/Radix), one file with the
   whole API, typed props that fail the build instead of the screen, and copy-in screens they can adapt.

What each needs from us (assumptions from issues, competitor docs and how agents use docs today, not from interviews yet;
validate with five developer interviews before the Pro launch):

| Need | Developers | Agents | Answered by |
|---|---|---|---|
| See it working before installing | Live examples on every page, a playground | — | Live code blocks, prop playgrounds, home page |
| Trust it on all three platforms | iOS / Material / web switch on every demo | — | `PlatformSwitch`, device frames |
| Finished screens, not just parts | Pro screens, recipes | Copy-in code built only on public exports | `@patine-ui/pro` screens, recipes |
| Exact API, offline, version-matched | API reference | `llms-full.txt` in the package, MCP server | `node_modules/patine-ui/llms-full.txt`, `@patine-ui/mcp` |
| Know what's coming | Roadmap, changelog | — | This file, `/roadmap`, changelog |

## Benchmark and gaps

The benchmark is the widest web block library's footer (blocks, data table features, charts, AI, app pages, templates,
e-commerce, marketing). It's web-first and desktop-first. Patine answers the same breadth **for phones first**, on three
platforms, with each platform's own look as an option, which no web kit offers.

| Benchmark area | Patine equivalent | Have | Gap |
|---|---|---|---|
| Blocks: card, dialog, sheet, form, list, settings, profile, onboarding, wizard | Free components + Pro screens | Card, Dialog, Sheet, form fields, List, Header, Progress, EmptyState; Pro: onboarding, sign in, settings, profile | Wizard, stepper, timeline, kanban, event calendar, schedule, gantt |
| Data table (columns, drag, edit, expand, filter, group, virtualize) | Pro data grid | — | All of it (phones: sortable list + detail sheet; web: grid) |
| Charts (area, bar, line, pie, radial, sankey, sparkline, status tracker) | Pro charts | Line, area, bar, combo, pie, donut, radial, gauge, heatmap, scatter, funnel, radar, sparkline, status tracker | Sankey, candlestick |
| AI & agents (chat, agent activity, usage) | Free chat primitives + Pro AI chat screen | MessageBubble, ChatComposer; Pro: AI chat screen | Streaming markdown, tool-call cards, agent activity, usage meter |
| App pages (CRM, analytics, billing, bookings, files, inventory, map, travel, users) | Pro screens | Booking and travel demos (showcase) | Analytics, billing, files, inventory, users |
| Templates (e-commerce, SaaS, dashboard, landing) | Pro app templates (Expo Router) | — | All four, plus social, fitness, fintech |
| E-commerce (product card/detail/grid, cart, coupon, receipt, review, wishlist) | Pro commerce screens | Checkout | Product detail, product grid, cart, receipt, wishlist |
| Marketing (hero, pricing, FAQ, CTA, blog) | Mobile equivalents: paywall, what's new, rating prompt | Paywall | What's new, rating prompt, referral |
| Resources: icons, MCP, roadmap, alternatives, affiliate | Docs resources | llms.txt, llms-full.txt, MCP server, comparison, roadmap | Icon set, affiliate |
| Legal | `/legal` | MIT licence, Pro licence draft | Privacy, terms, refunds and cookies with the Pro storefront |

## Free or Pro

**The rule:** anything an app needs to look finished, accessible and native is free, forever, under MIT. Pro is what
takes weeks to get right on three platforms (charts, scheduling, data grids, editors, media) and **complete screens and
templates**: work you'd otherwise pay a designer and a developer for.

Why this split:

- **Adoption comes from the free core.** Every input, picker, overlay and primitive is free, so Patine is the default
  answer to "which RN component library", and agents reach for it without a licence question.
- **Pro is time saved, not features withheld.** A free user can build every Pro screen from free components; Pro hands
  it over designed, accessible, tested on three platforms and in four designs.
- **No lock-in.** Pro screens use only `patine-ui`'s public exports, so they're plain code you own once copied.
- **One heavy peer at most.** Pro may use `react-native-svg` (charts), which runs in Expo Go and on the web. The free
  core stays at zero dependencies and zero native code.

| Free (`patine-ui`, MIT) | Pro (`@patine-ui/pro`, commercial) |
|---|---|
| Foundations: theme, Text, Stack, Separator | Screens: onboarding, sign in, paywall, settings, profile, AI chat, checkout, and the rest of the screen list below |
| Actions: Button, menus, action sheets | App templates: commerce, SaaS, social, fitness, fintech (Expo Router, ready to rename) |
| Inputs: text, checkbox, switch, radio, select, slider, OTP, phone, rating | Charts: line, area, bar, pie, donut, sparkline, radial, gauge, heatmap, sankey |
| Pickers: date, range, time, duration, wheel, country, language, time zone, emoji, color | Data: data grid, sortable list, tree view, CSV export |
| Overlays: dialog, modal, drawer, sheet, popover, tooltip, toast | Scheduling: event calendar (day/week/month), agenda, resource scheduler, gantt |
| Navigation: Tabs, Header | Boards: kanban, timeline, wizard |
| Display: Card, List, Avatar, Badge, Accordion, Collapsible | AI: streaming markdown, tool-call and reasoning cards, agent activity, usage meter |
| Feedback: Alert, Progress, Spinner, Skeleton, Toast, EmptyState | Editors and media: rich text, markdown editor, video and audio players, image cropper |
| Chat primitives: MessageBubble, ChatComposer | Design assets: Figma kit in all four designs, icon set |
| Docs, recipes, showcase, llms.txt, MCP server | Priority support, private Discord channel |

### Decided: the tree view is Pro, nested Collapsible is free

A tree view is all Pro, not split into a basic free tree and a Pro upgrade:

- **The rule puts it in Pro.** What a finished app needs (open and close a section, nest a few) is free:
  `Collapsible` and `Accordion` nest, take any icon, and cover settings groups, FAQs and short outlines. A real tree
  (checkbox cascades with mixed parents, children loaded on demand, a virtualized list for thousands of nodes, WAI-ARIA
  keyboard focus that follows scrolled-away rows, four designs) is weeks of work to get right on three platforms.
- **A split would be two components to keep in step.** A "basic" free tree is the Pro tree with props taken away, which
  is features withheld, not time saved. One `TreeView` with everything stays simpler for users and agents.
- **No lock-in either way.** `TreeView` uses only public exports (`DisclosureIcon`, `Checkbox`, `Spinner`, `useTheme`),
  and its disclosure icon takes the same `icon` / `renderIcon` / `iconPosition` / `rotation` props as the free
  Collapsible, so moving from nested Collapsibles to the tree keeps the look.

Pricing is set at launch: a licence per developer seat, unlimited projects, team licences (terms drafted in
the private Pro repo). No runtime fees, no telemetry, no licence check at runtime.

## Taxonomy

The full map. ✅ shipped, ◐ in Pro preview (private repo), ⬜ planned.

### Components (free)

- **Foundations** ✅ PatineProvider, Text, Heading, Stack, Separator · ⬜ Box, Grid, AspectRatio, SafeArea, KeyboardAware, Icon
- **Actions** ✅ Button, DropdownMenu, ActionSheet · ⬜ ToggleGroup, FAB, CopyButton, Link
- **Navigation** ✅ Tabs, Header, Steps · ⬜ BottomTabBar, Sidebar, Breadcrumbs, Pagination
- **Inputs** ✅ TextField, TextArea, Checkbox, Switch, RadioGroup, SegmentedControl, ChipGroup, Select, SelectList, Slider, Rating, InputOTP, PhoneField, SignaturePad · ⬜ SearchField, NumberField, Form
- **Date and time** ✅ DatePicker (single, range, multiple), DateWheelPicker, MonthPicker, WeekStrip, ExpandableCalendar, TimePicker, TimeRangePicker, DurationPicker, DateTimePicker
- **Pickers** ✅ WheelPicker, MultiWheelPicker, CountryPicker, LanguagePicker, TimeZonePicker, EmojiPicker, ColorPicker
- **Overlays** ✅ Dialog, AlertDialog, Modal (full screen on phones), Drawer, Popover, Tooltip, BottomSheet, picker sheets and fields, Toast, ImageViewer · ⬜ HoverCard
- **Display** ✅ Card (pressable, hover lift), List, SwipeableRow, SortableList, Carousel, Pager, QRCode, Accordion, Collapsible, Avatar, Badge · ⬜ AvatarGroup, Image, Stat, DescriptionList, Markdown
- **Feedback** ✅ Alert, Progress, Spinner, Skeleton, Toast, EmptyState · ⬜ PullToRefresh, Result
- **Chat** ✅ MessageBubble, ChatComposer · ⬜ TypingIndicator, SuggestionChips

### Screens (Pro)

- **Start** ◐ Onboarding, Sign in · ⬜ Sign up, OTP verify, Forgot password, Permission primer, Splash
- **Money** ◐ Paywall, Checkout · ⬜ Pricing, Order confirmation, Receipt, Billing
- **Account** ◐ Settings, Profile · ⬜ Edit profile, Notifications, Inbox, Referral
- **Social and content** ◐ AI chat · ⬜ Chat list, Feed, Post detail, Search results, Comments
- **Commerce** ⬜ Product grid, Product detail, Cart, Wishlist, Reviews, Filters
- **Productivity** ⬜ Dashboard, Calendar, Tasks, Files, What's new, Help
- **Status** ⬜ Empty, Offline, Maintenance, 404, Update required

### Blocks (Pro)

◐ Kanban (drag, Move to menu, keys), Event calendar (month, week, day), Agenda, Gantt (drag to move and stretch),
Timeline, Wizard, Stats row, Pricing table, Review list, Product card, Order tracker, Activity feed, Agent activity, AI
usage meter · ⬜ Rich text editor, Whiteboard (web): need a native editor or canvas beyond React Native core.

### Charts and data (Pro)

◐ Line, Area (stacked, 100%), Bar (grouped, stacked, 100%, horizontal, goals), Combo, Pie, Donut, Radial, Gauge, Heatmap,
Scatter/Bubble, Funnel, Radar, Sparkline, Status tracker · ⬜ Sankey, Slope, Candlestick · ◐ Tree view (selection, checkboxes, lazy children, virtualized, keyboard) · ⬜ Data grid: columns, sorting, filtering, grouping, inline edit, row expansion,
virtualization, CSV export.

### Templates (Pro)

⬜ Commerce, SaaS companion, Social, Fitness, Fintech, Booking. Each is an Expo Router app on `patine-ui` + `@patine-ui/pro`.

### AI and agents (free)

✅ llms.txt, llms-full.txt (in the npm package), per-page Markdown, AI cheat sheet, `@patine-ui/mcp` (stdio MCP server:
list, read and search the docs offline) · ⬜ `npx patine add <screen>` CLI and registry, Cursor/Claude rules file
generator.

## Phases

1. **Now: breadth of the free core.** Header, List, Progress, Spinner, EmptyState and chat primitives landed; next:
   BottomTabBar, SearchField, NumberField, AvatarGroup.
2. **Pro preview.** Seven screens and six charts in the private Pro repo, live in the docs. Fourteen blocks (kanban, event
   calendar, Gantt and more) landed. Next: commerce screens, the data grid.
3. **Distribution.** `npx patine add` (CLI + shadcn-compatible registry), licence through the storefront, Figma kit.
4. **Templates.** Full apps built from the screens.

## Packages

| Package | Licence | Contents |
|---|---|---|
| `packages/ui` → `patine-ui` | MIT | The free core |
| `@patine-ui/pro` (private repo) | Commercial | Screens, charts, and the Pro list above |
| `packages/mcp` → `@patine-ui/mcp` | MIT | MCP server that serves the docs to coding agents |
| `packages/cli` (planned) | MIT | `npx patine add` |
