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
| Data table (columns, drag, edit, expand, filter, group, virtualize) | Pro data grid | DataGrid: search, filter row, sort, resize, pin, hide, bulk actions, expand, edit, pages, CSV, cards on phones | Grouping, virtualized rows past a page, column reorder |
| Charts (area, bar, line, pie, radial, sankey, sparkline, status tracker) | Pro charts | Line, area, bar, combo, pie, donut, radial, gauge, heatmap, scatter, funnel, radar, sparkline, status tracker | Sankey, candlestick |
| AI & agents (chat, agent activity, usage) | Free chat primitives + Pro AI chat screen | MessageBubble, ChatComposer; Pro: Chat with streaming Markdown, plan, tool calls, sources, follow-ups, actions; AIChatScreen with history and models; Messenger; agent activity, usage meter | Voice mode, artifacts panel, branching versions |
| App pages (CRM, analytics, billing, bookings, files, inventory, map, travel, users) | Pro screens | Booking and travel demos, MapView and Dispatch | Billing, files, inventory, users |
| Templates (e-commerce, SaaS, dashboard, landing) | Pro app templates (Expo Router) | — | All four, plus social, fitness, fintech |
| E-commerce (product card/detail/grid, cart, coupon, receipt, review, wishlist) | Pro commerce screens | Checkout | Product detail, product grid, cart, receipt, wishlist |
| Marketing (hero, pricing, FAQ, CTA, blog) | Mobile equivalents: paywall, what's new, rating prompt | Paywall | What's new, rating prompt, referral |
| Resources: icons, MCP, roadmap, alternatives, affiliate | Docs resources | llms.txt, llms-full.txt, MCP server, comparison, roadmap | Icon set, affiliate |
| Legal | `/legal` | MIT licence, Pro licence draft | Privacy, terms, refunds and cookies with the Pro storefront |

### The market in 2026

Who else answers "which React Native UI library", and what they have that Patine doesn't yet (checked November 2026):

| Library | Model | What they have that we lack |
|---|---|---|
| shadcn/ui + registries | Free copy-in, any registry can publish | `npx shadcn add` from any registry, an MCP that installs, Sidebar, Command, ContextMenu, Menubar, Resizable, ScrollArea, HoverCard, InputGroup, Field |
| React Native Reusables | Free shadcn port on NativeWind, CLI copy-in | The shadcn names one to one: ContextMenu, HoverCard, Menubar, Label, Lucide icons wired in |
| HeroUI Native + HeroUI Pro | Free core, paid Pro (charts, more components) | Chip, Surface; Pro sells components, not screens |
| gluestack-ui + gluestack Pro | Free core, ~$199 one-time for 50+ screens and templates | Image, FormControl, an icon set in the free core; paid Expo Router templates |
| Tamagui + Bento | Free core and compiler, paid Bento (components and screens) | A theme builder, compiler-level speed |
| React Native Paper | Free, Material only | Banner, FAB group (speed dial), Material completeness |
| NativeBase successors | gluestack (above) | — |
| Unistyles | A styling engine, not components | Theme and breakpoint engine; Patine works next to it, nothing to copy |
| Magic UI, Aceternity | Free animated web components, paid templates | Motion eye candy that spreads on social: marquee, number ticker, shimmer, confetti |
| Tailwind Plus | Paid one-time, blocks and full templates | Templates as the anchor of the price, a design-system kit (Catalyst) |
| MUI + MUI X | Free core, paid data grid, advanced pickers, charts | The data grid as the reason to pay |

**What it says.** Patine's free core is already wider than any React Native rival's, so the gaps that cost adoption are
small and named: Image, a form Field, ContextMenu, Sidebar, HoverCard, an icon set, a theme builder and a copy-in CLI.
The paid side is where it's thin: every paid rival sells **templates and screens** (gluestack, Bento, Tailwind Plus) or
**a data grid** (MUI X). Pro has the screens already; it lacks the templates, the grid, the storefront and the CLI.

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
| Pickers: date, range, time, duration, wheel, country, language, time zone, emoji, color | Data: data grid, tree view, CSV export |
| Overlays: dialog, modal, drawer, sheet, popover, tooltip, toast, context menu | Scheduling: event calendar (day/week/month), agenda, resource scheduler, gantt |
| Navigation: Tabs, Header, BottomTabBar, Steps, Breadcrumbs, Pagination, Sidebar | Boards: kanban, timeline, wizard |
| Display: Card, List, Table, Image, Avatar, Badge, Accordion, Collapsible, static Markdown | AI: streaming markdown, tool-call and reasoning cards, agent activity, usage meter |
| Feedback: Alert, Progress, Spinner, Skeleton, Toast, EmptyState | Editors and media: rich text, markdown editor, video and audio players, image cropper |
| Chat primitives: MessageBubble, ChatComposer, TypingIndicator, SuggestionChips; starter icons (`@patine-ui/icons`, 227 outline) | Design assets: Figma kit in all four designs, the full icon set (669 in four variants) and 147 brand logos |
| Docs, recipes, showcase, llms.txt, MCP server | Priority support, private Discord channel |

### Decided: the free tier is right, Pro is under-packaged

The free tier isn't giving away too much. Every rival's free core has its inputs, pickers and overlays, so withholding them
would only send developers and agents elsewhere; free SignaturePad, QRCode and range pickers are cheap long-tail SEO
("react native signature pad"). Pro already holds 14 blocks, 13 charts, seven app suites (admin, commerce, finance,
bookings, productivity, messaging, account), 669 icons and 147 brand logos. What's missing is the packaging: templates,
a storefront, a copy-in CLI and a Figma kit. Small moves only:

- **To free:** ContextMenu (long-press menus are how phones work, so a finished app needs them), TypingIndicator and
  SuggestionChips, a static Markdown renderer, and a starter icon set (below).
- **Stays Pro:** streaming Markdown, tool-call, reasoning and citation cards; charts; the data grid; the tree view;
  scheduling; boards; every screen and template; the full icon set with its variants and the brand logos.

### Decided: icons are free as a starter set, the full set is Pro

A free `@patine-ui/icons` package (MIT) with 227 outline icons; `@patine-ui/pro` keeps all 669, their solid, duotone
and color variants, the 27 categories and the 147 brand logos. Not all free, not all Pro:

- **An icon set alone doesn't sell.** Lucide (~1,700), Tabler (~6,000), Phosphor (six weights) and Heroicons are free under
  MIT/ISC. Nobody pays for outline icons in 2026; Pro-only icons would just push examples to `lucide-react-native`.
- **A free subset is how icon businesses work.** Untitled UI gives ~1,100 line icons away and sells 4,600 in four
  styles; Streamline gives a free core and sells the rest. The variants and the breadth are what's worth paying for.
- **Agents need an icon to write.** Every recipe, docs example and MCP answer that shows an icon should be a Patine one,
  so the code an agent writes stays on Patine and upgrades to Pro by changing an import, not by rewriting.
- **SEO.** A free, indexable page per icon (`/icons/bell`) is the cheapest traffic a UI library gets; Lucide and Tabler
  live on it.
- **The free core stays at zero dependencies.** Icons need `react-native-svg`, so they ship as their own package with it
  as a peer (it runs in Expo Go and on the web). `Icon` has the same props and names in both packages, so moving to Pro is
  a one-line import change. Which 200: everything the free components, recipes and docs draw, plus the most-used names
  across Lucide and SF Symbols (arrows, chevrons, close, check, plus, search, settings, user, bell, heart, star, share,
  trash, edit, camera, image, calendar, clock, map pin, home, mail, phone, lock, eye, filter, sort, more).

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

- **Foundations** ✅ PatineProvider, Text, Heading, Stack, Separator, Box, Grid, Container, Center, AspectRatio · ⬜ ScrollArea, SafeArea, KeyboardAware · ✅ Icon (`@patine-ui/icons`)
- **Actions** ✅ Button, ButtonGroup, ToggleGroup, FAB, CopyButton, Link, DropdownMenu, ActionSheet · ⬜ ContextMenu
- **Navigation** ✅ Tabs, Header, Steps, BottomTabBar, NavigationRail, Breadcrumbs, Pagination · ⬜ Sidebar
- **Inputs** ✅ TextField, TextArea, Checkbox, Switch, RadioGroup, SegmentedControl, ChipGroup, Select, SelectList, Slider, Rating, InputOTP, PhoneField, SignaturePad, SearchField, NumberField · ⬜ Field (Label, HelperText, ErrorText)
- **Date and time** ✅ DatePicker (single, range, multiple), DateWheelPicker, MonthPicker, WeekStrip, ExpandableCalendar, TimePicker, TimeRangePicker, DurationPicker, DateTimePicker
- **Pickers** ✅ WheelPicker, MultiWheelPicker, CountryPicker, LanguagePicker, TimeZonePicker, EmojiPicker, ColorPicker
- **Overlays** ✅ Dialog, AlertDialog, Modal (full screen on phones), Drawer, Popover, Tooltip, BottomSheet, picker sheets and fields, Toast, ImageViewer · ⬜ HoverCard
- **Display** ✅ Card (pressable, hover lift), List, SwipeableRow, SortableList, Carousel, Pager, QRCode, Accordion, Collapsible, Avatar, AvatarGroup, Badge, Image, Stat, DescriptionList, Table, Kbd · ⬜ Markdown (static)
- **Feedback** ✅ Alert, Progress, Spinner, Skeleton, Toast, EmptyState · ⬜ ErrorState (React Native's `RefreshControl` already covers pull to refresh)
- **Chat** ✅ MessageBubble, ChatComposer, TypingIndicator, SuggestionChips

### Screens (Pro)

◐ Seven app suites in preview, each a set of linked screens: Admin (dashboard, customers, invoices, billing, payments,
team, API keys, audit log, integrations, notifications), Commerce (shop, product, cart, orders, tracking, reviews), Finance
(wallet, cards, transactions, budgets, send money), Bookings, Productivity (tasks, board, files), Messaging (inbox,
thread, assistant), Account (sign up, verify, forgot password, offline, 404). Plus the single screens below.

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

Effort is one developer's working days. Tier: F free (`patine-ui`), I free icons package, P Pro, D distribution.

### Next two weeks

| Item | Tier | Scope | Effort | Done when |
|---|---|---|---|---|
| Image ✅ | F | `patine-ui/image`: a frame that holds its size, breathing placeholder, fade in, fallback, `alt`, four designs | 1 | Shipped with tests, playground and docs |
| Starter icons ✅ | I | `@patine-ui/icons`: 227 outline icons copied from the Pro set, per-icon imports, `Icon` with Pro's props | 4 | Shipped with MCP `search_icons`. Left: the `/icons` gallery with a page per icon, and a Pro test that every free name stays a Pro name |
| Field | F | `Label`, `FormField`, `HelperText`, `ErrorText` in `field`, wired to every input's `aria-*` | 3 | Errors announced on native and web; shadcn `Field` names; one form recipe uses it |
| TypingIndicator, SuggestionChips ✅ | F | `patine-ui/typing`, `patine-ui/suggestions`; Pro's `ChatSuggestions` can build on them | 2 | Shipped: reduce motion respected, chips are labelled buttons |
| Pro storefront and licence | D | Checkout, licence key, private npm for `@patine-ui/pro`, refund and terms pages | 5 | A stranger can pay, install and import a screen in under five minutes |

### One to two months

| Item | Tier | Scope | Effort | Done when |
|---|---|---|---|---|
| Templates: SaaS admin, Commerce | P | Expo Router apps from the Admin and Commerce suites, `npx create-patine-app --template` | 10 | Runs in Expo Go and the browser, a typed data layer stub, renamed in one command |
| `npx patine add` + registry | D | MIT CLI, shadcn-compatible registry JSON; Pro items need the licence key | 8 | `npx shadcn add` also works against it; MCP tool `add_component` |
| Data grid | P | Phones: list plus detail sheet; web and tablets: virtualized grid with sort, filter, pin, resize, select, inline edit, CSV | 20 | 10,000 rows scroll smoothly on a mid-range Android; keyboard grid navigation on the web |
| ContextMenu | F | Long-press menu on phones, right-click on the web, DropdownMenu's item API | 4 | Same items as DropdownMenu, no native code |
| Sidebar | F | Persistent on tablets and the web, a Drawer on phones, collapses to a rail | 5 | Pro's `AppShell` uses it |
| Theme builder | D | Docs page: pick primary, radius, font; exports a `PatineProvider` theme | 4 | Shareable URL; agents can read the exported JSON |
| AI blocks | P | Citations, attachments tray, voice input bar, agent run timeline | 6 | Streams token by token without layout jumps |
| Figma kit | P | All components and Pro screens in brand plus the three native designs | 15 (designer) | Variables match the theme tokens one to one |

### This quarter

| Item | Tier | Scope | Effort | Done when |
|---|---|---|---|---|
| Templates: Fintech, Booking, Social, Fitness | P | From the Finance and Bookings suites; Social and Fitness new | 25 | Same bar as the first two |
| Static Markdown, HoverCard, ScrollArea, ErrorState | F | `markdown`, `popover`, `layout`, `empty` | 8 | Markdown: headings, lists, code, links, no HTML |
| Motion pack | F/P | Free: Marquee, NumberTicker. Pro: shimmer text, confetti, animated border | 6 | All in `core/animation`, reduce motion respected |
| Charts: sankey, candlestick, treemap | P | On the existing chart core | 10 | Crosshair and tooltip like the rest |
| Resource scheduler | P | Rows of people or rooms over the event calendar's week view | 10 | Drag to move and stretch, keyboard on the web |
| Interviews and pricing | D | Five developer interviews, then a price: per seat, one-time, a year of updates | 3 | Price set before the templates launch |

## Packages

| Package | Licence | Contents |
|---|---|---|
| `packages/ui` → `patine-ui` | MIT | The free core |
| `@patine-ui/pro` (private repo) | Commercial | Screens, charts, and the Pro list above |
| `packages/mcp` → `@patine-ui/mcp` | MIT | MCP server that serves the docs to coding agents |
| `packages/icons` → `@patine-ui/icons` | MIT | The 227 starter icons, `react-native-svg` and `patine-ui` as peers |
| `packages/cli` (planned) | MIT | `npx patine add` |
