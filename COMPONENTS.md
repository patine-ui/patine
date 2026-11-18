# Component catalog

Everything Patine plans to ship, by category. **Free** is MIT in `patine-ui`; **Pro** is the paid tier.
Status: ✅ shipped · 🚧 in progress · ⬜ planned. Folder is the public subpath (`patine-ui/<folder>`).

Rule of thumb for the tier: anything an app needs to look finished and accessible is Free. Pro is what takes weeks to get
right on three platforms (charts, scheduler, data grid, editors, media) and complete screens.

## Foundations and layout (Free)

| Component | Status | Folder |
|---|---|---|
| PatineProvider (theme, color scheme, design) | ✅ | core |
| Touchable (press, hover, focus, ripple) | ✅ | core |
| Text, Heading | ✅ | text |
| Stack, HStack, VStack | ✅ | stack |
| Box, Spacer | ✅ | layout |
| Separator | ✅ | separator |
| Grid, Container, Center, AspectRatio | ✅ | layout |
| ScrollArea, SafeArea, KeyboardAware | ⬜ | layout |
| Portal | ✅ | core |
| VisuallyHidden, Slot | ✅ | core |
| Icon, Glyph (227 starter icons; the full 669 in four variants is Pro) | ✅ | `@patine-ui/icons` package |

## Actions

| Component | Tier | Status | Folder |
|---|---|---|---|
| Button (variants, sizes, loading, icons) | Free | ✅ | button |
| Icon button (`size="icon"`) | Free | ✅ | button |
| ButtonGroup, ToggleButton, ToggleGroup | Free | ✅ | button |
| Link | Free | ✅ | button |
| FAB, CopyButton | Free | ✅ | button |
| SplitButton | Free | ⬜ | button (ButtonGroup covers it today) |
| SpeedDial | Pro | ⬜ | — |

## Inputs

| Component | Tier | Status | Folder |
|---|---|---|---|
| TextField, TextArea (password toggle built in) | Free | ✅ | textfield |
| SearchField | Free | ✅ | textfield |
| Form, FormField, Label, HelperText, ErrorText | Free | ⬜ | field |
| NumberField / Stepper | Free | ✅ | field |
| Checkbox (with mixed state) | Free | ✅ | checkbox |
| CheckboxGroup | Free | ✅ | checkbox |
| RadioGroup, RadioGroupItem | Free | ✅ | radio |
| Switch | Free | ✅ | switch |
| SegmentedControl, ChipGroup | Free | ✅ | segmented |
| Select, SelectList (multi, search, server search, create) | Free | ✅ | select |
| Combobox / Autocomplete, TagInput | Free | ✅ | select |
| Slider, RangeSlider | Free | ✅ | slider |
| Rating | Free | ✅ | rating |
| InputOTP | Free | ✅ | otp |
| PhoneField | Free | ✅ | country |
| AmountField | Free | ⬜ | field |
| MaskedInput, MentionInput | Pro | ⬜ | — |
| SignaturePad (strokes, SVG export) | Free | ✅ | signature |
| FileDropzone / Upload | Pro | ⬜ | — |

## Pickers (Free)

| Component | Status | Folder |
|---|---|---|
| WheelPicker, MultiWheelPicker | ✅ | wheel |
| TimePicker, TimeRangePicker | ✅ | time |
| DurationPicker | ✅ | duration |
| DatePicker, DateRangePicker, DateWheelPicker | ✅ | date |
| DateTimePicker | ✅ | datetime |
| MonthPicker | ✅ | month |
| Calendar, WeekStrip, ExpandableCalendar | ✅ | calendar |
| ColorPicker | ✅ | color |
| EmojiPicker | ✅ | emoji |
| CountryPicker | ✅ | country |
| LanguagePicker | ✅ | language |
| TimeZonePicker | ✅ | timezone |

## Date and time (Pro)

🚧 Event calendar (day / week / month views), Agenda, Gantt, in Pro preview · ⬜ Resource scheduler, YearPicker.

## Navigation

| Component | Tier | Status | Folder |
|---|---|---|---|
| Tabs | Free | ✅ | tabs |
| Header (top app bar, large title) | Free | ✅ | header |
| BottomTabBar, NavigationRail | Free | ✅ | tabbar |
| Drawer (side panel) | Free | ✅ | modal |
| Sidebar (persistent navigation) | Free | ⬜ | navigation |
| Steps (stepper: across, down, progress bar) | Free | ✅ | steps |
| Breadcrumbs, Pagination | Free | ✅ | breadcrumbs, pagination |
| DropdownMenu | Free | ✅ | action |
| Wizard (steps, validation, sidebar) | Pro | 🚧 | — (Pro preview) |
| ContextMenu (long press, right click) | Free | ⬜ | action |
| Menubar, CommandPalette | Pro | ⬜ | — |

## Overlays

| Component | Tier | Status | Folder |
|---|---|---|---|
| BottomSheet, Dropdown, PickerSheet | Free | ✅ | sheet |
| ActionSheet | Free | ✅ | action |
| Dialog, AlertDialog | Free | ✅ | dialog |
| Modal (sizes, full screen on phones, nested) | Free | ✅ | modal |
| Popover | Free | ✅ | popover |
| Tooltip | Free | ✅ | tooltip |
| HoverCard | Free | ⬜ | popover |
| Toast / Snackbar (Toaster, toast) | Free | ✅ | toast |
| ImageViewer / Lightbox (zoom, swipe, swipe to close) | Free | ✅ | lightbox |

## Feedback (Free)

| Component | Status | Folder |
|---|---|---|
| Alert (Title, Description; announced on native and web) | ✅ | alert |
| Skeleton | ✅ | skeleton |
| Progress, Spinner | ✅ | progress |
| EmptyState | ✅ | empty |
| CircularProgress · ErrorState · PullToRefresh · Result | ⬜ | — |

## Data display

| Component | Tier | Status | Folder |
|---|---|---|---|
| Card (Header, Title, Description, Content, Footer) | Free | ✅ | card |
| List, ListItem | Free | ✅ | list |
| Avatar | Free | ✅ | avatar |
| AvatarGroup | Free | ✅ | avatar |
| Badge (incl. success, warning) | Free | ✅ | badge |
| Accordion | Free | ✅ | accordion |
| Collapsible (custom icon, position, rotation, asChild) | Free | ✅ | collapsible |
| TreeView (selection, checkboxes, lazy, virtualized, keyboard) | Pro | 🚧 | — (Pro preview) |
| Image (placeholder, fade in, fallback, alt) | Free | ✅ | image |
| Kbd, Stat / KPI tile, DescriptionList | Free | ✅ | kbd, stat, descriptions |
| Simple Table (sortable) | Free | ✅ | table |
| SwipeableRow (leading/trailing, full swipe) | Free | ✅ | swipeable |
| Sparkline | Free | ⬜ | display |
| Markdown renderer (static; streaming is Pro) | Free | ⬜ | markdown |
| Carousel, Pager, PageIndicator (peek, loop, autoplay) | Free | ✅ | carousel |
| SortableList, SortableHandle (drag to reorder) | Free | ✅ | sortable |
| QRCode (pure-TS encoder, versions 1–40, logo) | Free | ✅ | qrcode |
| Timeline, Activity feed | Pro | 🚧 | — (Pro preview) |
| CodeBlock, Marquee | Pro | ⬜ | — |

## AI and chat

| Component | Tier | Status |
|---|---|---|
| MessageBubble, ChatComposer | Free | ✅ |
| TypingIndicator, SuggestionChips | Free | ✅ |
| ChatThread | Free | ⬜ |
| Streaming markdown, tool-call and reasoning panels, citations, attachments tray, voice input | Pro | ⬜ |

## Pro only

- **Charts** (15): 🚧 in Pro preview with docs: line, area, bar (grouped, stacked, horizontal), pie / donut, radial, sparkline, status tracker, interactive crosshair and tooltip. ⬜ scatter, radar, heatmap, candlestick, gauge, funnel, treemap, sankey, combo.
- **Data grid** (7): virtualized grid, sort and filter, column resize / pin / reorder, row selection and inline edit, grouping and tree data, CSV export, pivot.
- **Media** (6): video player, audio player, gallery, image cropper, barcode / camera overlay. (Zoomable image is free: ImageViewer.)
- **Editors** (3): rich text, markdown editor, code editor (web).

## Screens and blocks

All screens are Pro (see ROADMAP.md for why); free users get recipes and the components to build them. In preview: onboarding, sign in, paywall, settings, profile, AI chat, checkout.

Blocks, in Pro preview (🚧): Kanban, Event calendar, Agenda, Gantt, Timeline, Wizard, Stats row, Pricing table,
Review list, Product card, Order tracker, Activity feed, Agent activity, AI usage meter. ⬜ Rich text editor, Whiteboard.

Pro (copy-in through the registry):

- **Auth**: sign up, OTP verify, forgot / reset password, passkey and social login, onboarding carousel, permission primer.
- **Account and app**: profile, edit profile, notifications center, inbox, chat list, feed.
- **Commerce**: paywall (3 variants), pricing, cart, checkout (Apple / Google Pay), order confirmation, product list, product detail, search results.
- **Admin**: analytics dashboard, admin CRUD table, calendar screen, what's new, help / FAQ, referral, splash, maintenance.
